import { avatars, projects } from '../data';
import { getMissionAverage, getMissionProgress } from '../progress';
import { state, setState } from '../state';
import { tagRow } from '../utils';

export const updateVisibleScreens = () => {
  document.querySelector<HTMLElement>('.app-shell')
    ?.setAttribute('data-active-section', state.activeSection);
  document.querySelectorAll<HTMLElement>('[data-section]').forEach((section) => {
    section.classList.toggle('active-screen', section.id === state.activeSection);
  });
};

export const updateNav = () => {
  document.querySelectorAll<HTMLElement>('[data-nav]').forEach((button) => {
    const isActive = button.dataset.nav === state.activeSection;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
};

export const updateProjectList = () => {
  document.querySelector<HTMLElement>('[data-project-list]')
    ?.classList.toggle('open', state.projectListOpen);
  document.querySelector<HTMLElement>('[data-open-projects]')
    ?.classList.toggle('active', state.projectListOpen);

  // Sincronizar aria-pressed en las tarjetas de proyecto
  document.querySelectorAll<HTMLElement>('[data-project]').forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      String(Number(button.dataset.project) === state.selectedProject)
    );
  });
};

function showMissionToast(mission: { title: string; xpReward: string }) {
  const container = document.querySelector<HTMLElement>(
    '.app-shell > .mission-toast-container'
  );
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'mission-toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <div class="toast-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
           stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <div class="toast-body">
      <strong>¡Misión completada!</strong>
      <span>${mission.title}</span>
    </div>
    <div class="toast-xp">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
      ${mission.xpReward}
    </div>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
  });

  const DURATION = 3800;
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 500);
  }, DURATION);
}

function completeMissionCard(
  card: HTMLElement,
  mission: { title: string; xpReward: string }
) {
  card.classList.add('complete');
  card.setAttribute('data-mission-completed', 'true');
  card.classList.add('completing');
  setTimeout(() => showMissionToast(mission), 200);

  setTimeout(() => {
    card.classList.add('mission-disappear');
    setTimeout(() => {
      card.style.height = `${card.offsetHeight}px`;
      card.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        card.style.transition =
          'height 350ms ease, margin 350ms ease, padding 350ms ease, opacity 200ms ease';
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

export const updateSeasonProgress = () => {
  const missions = getMissionProgress();
  const percent  = getMissionAverage();

  const label = document.querySelector<HTMLElement>('[data-season-progress]');
  const meter = document.querySelector<HTMLElement>('[data-season-meter]');
  if (label) label.textContent = `${percent}%`;
  if (meter) meter.style.width = `${percent}%`;

  const completedMissions = missions.filter((m) => m.completed);
  const completedEl = document.querySelector<HTMLElement>('[data-completed-count]');
  const pendingEl   = document.querySelector<HTMLElement>('[data-pending-count]');
  if (completedEl) completedEl.textContent = String(completedMissions.length);
  if (pendingEl)   pendingEl.textContent   = String(missions.length - completedMissions.length);

  missions.forEach((mission) => {
    const card = document.querySelector<HTMLElement>(
      `[data-mission-card="${mission.key}"]`
    );
    if (!card) return;

    const meterEl   = card.querySelector<HTMLElement>(`[data-mission-meter="${mission.key}"]`);
    const labelEl   = card.querySelector<HTMLElement>(`[data-mission-label="${mission.key}"]`);
    const percentEl = card.querySelector<HTMLElement>(`[data-mission-percent="${mission.key}"]`);
    if (meterEl)   meterEl.style.width   = `${mission.value}%`;
    if (labelEl)   labelEl.textContent   = mission.label;
    if (percentEl) percentEl.textContent = `${mission.value}%`;

    if (mission.justCompleted && !card.classList.contains('completing')) {
      const next = new Set(state.completedMissions);
      next.add(mission.key);
      setState({ completedMissions: next });
      completeMissionCard(card, { title: mission.title, xpReward: mission.xpReward });
    } else if (mission.completed && !mission.justCompleted) {
      card.classList.add('complete');
    }
  });
};

// ─── Detalles del proyecto + sincronización de pestañas ───────────────────────

export const updateProjectDetails = () => {
  const project   = projects[state.selectedProject];
  const hasRepo   = Boolean(project.url);
  const hasDemo   = Boolean(project.demo);
  const activeTab: 'repo' | 'demo' =
    state.projectTab === 'repo' && hasRepo ? 'repo' :
    state.projectTab === 'demo' && hasDemo ? 'demo' :
    hasRepo ? 'repo' : 'demo';
  const activeUrl = activeTab === 'demo' ? project.demo! : project.url!;

  const modeEl    = document.querySelector<HTMLElement>('[data-project-mode]');
  const titleEl   = document.querySelector<HTMLElement>('[data-project-title]');
  const summaryEl = document.querySelector<HTMLElement>('[data-project-summary]');
  const tagsEl    = document.querySelector<HTMLElement>('[data-project-tags]');
  const linkEl    = document.querySelector<HTMLAnchorElement>('[data-project-link]');
  const labelEl   = document.querySelector<HTMLElement>('[data-action-label]');

  if (modeEl)    modeEl.textContent    = project.mode;
  if (titleEl)   titleEl.textContent   = project.title;
  if (summaryEl) summaryEl.textContent = project.summary;
  if (tagsEl)    tagsEl.innerHTML      = tagRow(project.stack);
  if (linkEl)    linkEl.href           = activeUrl;
  if (labelEl)   labelEl.textContent   = activeTab === 'demo' ? 'Ver Demo' : 'Ver Proyecto';

  document.querySelectorAll<HTMLElement>('[data-project]').forEach((button) => {
    const isActive = Number(button.dataset.project) === state.selectedProject;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  // ── Sincronizar tabpanel (aria-controls) ──────────────────────────────────
  const tabPanel = document.querySelector<HTMLElement>('[data-project-tabpanel]');
  if (tabPanel) {
    const repoPanelId = 'project-panel-repo';
    const demoPanelId = 'project-panel-demo';
    tabPanel.id = activeTab === 'repo' ? repoPanelId : demoPanelId;
    tabPanel.setAttribute(
      'aria-labelledby',
      activeTab === 'repo' ? 'project-tab-repo' : 'project-tab-demo'
    );
  }

  // ── Sincronizar estado visual de las pestañas ─────────────────────────────
  const tabBar = document.querySelector<HTMLElement>('[data-project-tab-bar]');
  if (tabBar) {
    tabBar.querySelectorAll<HTMLElement>('[data-tab]').forEach((tab) => {
      const tabKey       = tab.dataset.tab as 'repo' | 'demo';
      const tabAvailable = tabKey === 'repo' ? hasRepo : hasDemo;

      if (!tabAvailable) {
        tab.classList.add('disabled');
        tab.setAttribute('aria-disabled', 'true');
        if (!tab.querySelector('.tab-na')) {
          const badge = document.createElement('span');
          badge.className = 'tab-na';
          badge.textContent = 'N/A';
          tab.appendChild(badge);
        }
      } else {
        tab.classList.remove('disabled');
        tab.removeAttribute('aria-disabled');
        tab.querySelector('.tab-na')?.remove();
      }

      const isActive = tabKey === activeTab;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
  }
};

// ─── Registrar clicks en repo/demo ───────────────────────────────────────────

export const bindProjectLinkTracking = () => {
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
      '[data-project-link]'
    );
    if (!link) return;

    const hasRepo   = Boolean(projects[state.selectedProject]?.url);
    const hasDemo   = Boolean(projects[state.selectedProject]?.demo);
    const activeTab: 'repo' | 'demo' =
      state.projectTab === 'repo' && hasRepo ? 'repo' :
      state.projectTab === 'demo' && hasDemo ? 'demo' :
      hasRepo ? 'repo' : 'demo';

    if (activeTab === 'demo' && !state.demoClicked) {
      setState({ demoClicked: true });
      updateSeasonProgress();
    } else if (activeTab === 'repo' && !state.repoClicked) {
      setState({ repoClicked: true });
      updateSeasonProgress();
    }
  });
};

// ─── Bind de pestañas ────────────────────────────────────────────────────────

export const bindProjectTabs = () => {
  document.addEventListener('click', (e) => {
    const tab = (e.target as HTMLElement).closest<HTMLElement>('[data-tab]');
    if (!tab) return;
    if (tab.classList.contains('disabled')) return;

    const tabKey = tab.dataset.tab as 'repo' | 'demo';
    if (tabKey === state.projectTab) return;

    setState({ projectTab: tabKey });
    updateProjectDetails();
  });
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

export const updateAvatar = () => {
  const avatar = avatars[state.selectedAvatar];
  document.querySelectorAll<HTMLImageElement>('[data-character]').forEach((image) => {
    image.src = image.dataset.character === 'lobby'
      ? (image.alt = `Skin actual: ${avatar.name}`, avatar.full)
      : (image.alt = `Avatar de ${avatar.name}`, avatar.full);
  });
  document.querySelectorAll<HTMLElement>('[data-avatar]').forEach((button) => {
    const isActive = Number(button.dataset.avatar) === state.selectedAvatar;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
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