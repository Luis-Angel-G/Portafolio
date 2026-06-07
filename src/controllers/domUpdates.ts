import { avatars, projects } from '../data';
import { getMissionAverage, getMissionProgress } from '../progress';
import { state, setState } from '../state';
import { tagRow } from '../utils';

export const updateVisibleScreens = () => {
  document.querySelector<HTMLElement>('.app-shell')?.setAttribute('data-active-section', state.activeSection);

  document.querySelectorAll<HTMLElement>('[data-section]').forEach((section) => {
    section.classList.toggle('active-screen', section.id === state.activeSection);
  });
};

export const updateNav = () => {
  document.querySelectorAll<HTMLElement>('[data-nav]').forEach((button) => {
    button.classList.toggle('active', button.dataset.nav === state.activeSection);
  });
};

export const updateProjectList = () => {
  document.querySelector<HTMLElement>('[data-project-list]')?.classList.toggle('open', state.projectListOpen);
  document.querySelector<HTMLElement>('[data-open-projects]')?.classList.toggle('active', state.projectListOpen);
};

// ─── Toast notification ────────────────────────────────────────────────────────
// The container lives directly inside .app-shell (added in app.ts),
// so it is always present in the DOM regardless of the active screen.

function showMissionToast(mission: { title: string; xpReward: string }) {
  // Search at the app-shell level so it works from any section
  const container = document.querySelector<HTMLElement>('.app-shell > .mission-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'mission-toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <div class="toast-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <div class="toast-body">
      <strong>¡Misión completada!</strong>
      <span>${mission.title}</span>
    </div>
    <div class="toast-xp">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
      ${mission.xpReward}
    </div>
  `;

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
  });

  // Animate out and remove
  const DURATION = 3800;
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 500);
  }, DURATION);
}

// ─── Mission card completion: burst → fade out → remove ───────────────────────

function completeMissionCard(card: HTMLElement, mission: { title: string; xpReward: string }) {
  // 1. mark as complete immediately for styling
  card.classList.add('complete');
  card.setAttribute('data-mission-completed', 'true');

  // 2. trigger burst overlay
  card.classList.add('completing');

  // 3. show toast — always visible regardless of active section
  setTimeout(() => showMissionToast(mission), 200);

  // 4. after burst, fade the card out and remove it
  setTimeout(() => {
    card.classList.add('mission-disappear');
    setTimeout(() => {
      card.style.height = `${card.offsetHeight}px`;
      card.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        card.style.transition = 'height 350ms ease, margin 350ms ease, padding 350ms ease, opacity 200ms ease';
        card.style.height = '0';
        card.style.marginBottom = '0';
        card.style.paddingTop = '0';
        card.style.paddingBottom = '0';
        card.style.opacity = '0';
      });
      setTimeout(() => card.remove(), 400);
    }, 100);
  }, 1400);
}

// ─── Season / missions update ──────────────────────────────────────────────────

export const updateSeasonProgress = () => {
  const missions = getMissionProgress();
  const percent  = getMissionAverage();

  // Season bar
  const label = document.querySelector<HTMLElement>('[data-season-progress]');
  const meter = document.querySelector<HTMLElement>('[data-season-meter]');
  if (label) label.textContent = `${percent}%`;
  if (meter) meter.style.width = `${percent}%`;

  // Completed / pending counts
  const completedMissions = missions.filter(m => m.completed);
  const completedEl = document.querySelector<HTMLElement>('[data-completed-count]');
  const pendingEl   = document.querySelector<HTMLElement>('[data-pending-count]');
  if (completedEl) completedEl.textContent = String(completedMissions.length);
  if (pendingEl)   pendingEl.textContent   = String(missions.length - completedMissions.length);

  missions.forEach((mission) => {
    const card = document.querySelector<HTMLElement>(`[data-mission-card="${mission.key}"]`);

    // If already removed from DOM (previously completed + disappeared), skip
    if (!card) return;

    // Update meter bar
    const meterEl = card.querySelector<HTMLElement>(`[data-mission-meter="${mission.key}"]`);
    if (meterEl) meterEl.style.width = `${mission.value}%`;

    // Update label and percent
    const labelEl   = card.querySelector<HTMLElement>(`[data-mission-label="${mission.key}"]`);
    const percentEl = card.querySelector<HTMLElement>(`[data-mission-percent="${mission.key}"]`);
    if (labelEl)   labelEl.textContent   = mission.label;
    if (percentEl) percentEl.textContent = `${mission.value}%`;

    // Handle newly completed missions
    if (mission.justCompleted && !card.classList.contains('completing')) {
      // Register in state so it won't fire again
      const next = new Set(state.completedMissions);
      next.add(mission.key);
      setState({ completedMissions: next });

      completeMissionCard(card, { title: mission.title, xpReward: mission.xpReward });
    } else if (mission.completed && !mission.justCompleted) {
      // Already completed on a previous visit — mark visually but don't animate
      card.classList.add('complete');
    }
  });
};

export const updateProjectDetails = () => {
  const project = projects[state.selectedProject];
  const mode    = document.querySelector<HTMLElement>('[data-project-mode]');
  const title   = document.querySelector<HTMLElement>('[data-project-title]');
  const summary = document.querySelector<HTMLElement>('[data-project-summary]');
  const tags    = document.querySelector<HTMLElement>('[data-project-tags]');
  const link    = document.querySelector<HTMLAnchorElement>('[data-project-link]');

  if (mode)    mode.textContent    = project.mode;
  if (title)   title.textContent   = project.title;
  if (summary) summary.textContent = project.summary;
  if (tags)    tags.innerHTML      = tagRow(project.stack);
  if (link)    link.href           = project.url;

  document.querySelectorAll<HTMLElement>('[data-project]').forEach((button) => {
    button.classList.toggle('active', Number(button.dataset.project) === state.selectedProject);
  });
};

export const updateAvatar = () => {
  const avatar = avatars[state.selectedAvatar];
  document.querySelectorAll<HTMLImageElement>('[data-character]').forEach((image) => {
    image.src = image.dataset.character === 'lobby'
      ? (image.alt = `Skin actual: ${avatar.name}`, avatar.full)
      : (image.alt = `Avatar de ${avatar.name}`, avatar.full);
  });
  document.querySelectorAll<HTMLElement>('[data-avatar]').forEach((button) => {
    button.classList.toggle('active', Number(button.dataset.avatar) === state.selectedAvatar);
  });

  const bioTitle = document.querySelector<HTMLElement>('[data-profile-bio-title]');
  const bioText  = document.querySelector<HTMLElement>('[data-profile-bio-text]');
  if (bioTitle) bioTitle.textContent = avatar.bioTitle;
  if (bioText)  bioText.textContent  = avatar.bioText;

  avatar.stats.forEach((stat, index) => {
    const value = document.querySelector<HTMLElement>(`[data-profile-stat-value="${index}"]`);
    const label = document.querySelector<HTMLElement>(`[data-profile-stat-label="${index}"]`);
    if (value) value.textContent = stat.value;
    if (label) label.textContent = stat.label;
  });

  updateProfilePanel();
};

export const updateProfilePanel = () => {
  const current = state.profilePanels?.[state.selectedAvatar] ?? 'none';
  document.querySelectorAll<HTMLElement>('[data-profile-panel]').forEach((button) => {
    button.classList.toggle('active', button.dataset.profilePanel === current);
  });
};

export const updatePlayingState = (): void => {
  document.querySelector<HTMLElement>('.app-shell')
    ?.setAttribute('data-playing', String(state.isPlaying));
};