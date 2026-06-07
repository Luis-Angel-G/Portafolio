import { avatars, projects } from '../data';
import { renderProfileExtraPanel } from '../components/profile';
import { getMissionAverage, getMissionProgress } from '../progress';
import { state } from '../state';
import { formatVisitorCount, tagRow } from '../utils';

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

export const updateVisitorText = () => {
  document.querySelectorAll<HTMLElement>('[data-visitor-main], [data-visitor-status]').forEach((node) => {
    node.textContent = formatVisitorCount(state.visitorCount);
  });
  document.querySelectorAll<HTMLElement>('[data-visitor-label]').forEach((node) => {
    node.textContent = state.visitorStatus;
  });
};

export const updateProjectList = () => {
  document.querySelector<HTMLElement>('[data-project-list]')?.classList.toggle('open', state.projectListOpen);
  document.querySelector<HTMLElement>('[data-open-projects]')?.classList.toggle('active', state.projectListOpen);
};

export const updateSeasonProgress = () => {
  const missions = getMissionProgress();
  const percent = getMissionAverage();
  const label = document.querySelector<HTMLElement>('[data-season-progress]');
  const meter = document.querySelector<HTMLElement>('[data-season-meter]');
  if (label) label.textContent = `${percent}%`;
  if (meter) meter.style.width = `${percent}%`;

  missions.forEach((mission) => {
    document.querySelector<HTMLElement>(`[data-mission-meter="${mission.key}"]`)?.style.setProperty('width', `${mission.value}%`);
    const labelNode = document.querySelector<HTMLElement>(`[data-mission-label="${mission.key}"]`);
    const percentNode = document.querySelector<HTMLElement>(`[data-mission-percent="${mission.key}"]`);
    const card = document.querySelector<HTMLElement>(`[data-mission-card="${mission.key}"]`);
    if (labelNode) labelNode.textContent = mission.label;
    if (percentNode) percentNode.textContent = `${mission.value}%`;
    card?.classList.toggle('complete', mission.value >= 100);
  });
};

export const updateProjectDetails = () => {
  const project = projects[state.selectedProject];
  const mode = document.querySelector<HTMLElement>('[data-project-mode]');
  const title = document.querySelector<HTMLElement>('[data-project-title]');
  const summary = document.querySelector<HTMLElement>('[data-project-summary]');
  const tags = document.querySelector<HTMLElement>('[data-project-tags]');
  const link = document.querySelector<HTMLAnchorElement>('[data-project-link]');

  if (mode) mode.textContent = project.mode;
  if (title) title.textContent = project.title;
  if (summary) summary.textContent = project.summary;
  if (tags) tags.innerHTML = tagRow(project.stack);
  if (link) link.href = project.url;

  document.querySelectorAll<HTMLElement>('[data-project]').forEach((button) => {
    button.classList.toggle('active', Number(button.dataset.project) === state.selectedProject);
  });
};

export const updateAvatar = () => {
  const avatar = avatars[state.selectedAvatar];
  document.querySelectorAll<HTMLImageElement>('[data-character]').forEach((image) => {
    image.src = avatar.full;
    image.alt = image.dataset.character === 'lobby' ? `Skin actual: ${avatar.name}` : `Avatar de ${avatar.name}`;
  });
  document.querySelectorAll<HTMLElement>('[data-avatar]').forEach((button) => {
    button.classList.toggle('active', Number(button.dataset.avatar) === state.selectedAvatar);
  });

  const bioTitle = document.querySelector<HTMLElement>('[data-profile-bio-title]');
  const bioText = document.querySelector<HTMLElement>('[data-profile-bio-text]');
  if (bioTitle) bioTitle.textContent = avatar.bioTitle;
  if (bioText) bioText.textContent = avatar.bioText;

  avatar.stats.forEach((stat, index) => {
    const value = document.querySelector<HTMLElement>(`[data-profile-stat-value="${index}"]`);
    const label = document.querySelector<HTMLElement>(`[data-profile-stat-label="${index}"]`);
    if (value) value.textContent = stat.value;
    if (label) label.textContent = stat.label;
  });
  // ensure profile panel UI reflects the selected avatar's panel state
  updateProfilePanel();
};

export const updateProfilePanel = () => {
  const current = state.profilePanels?.[state.selectedAvatar] ?? 'none';
  document.querySelectorAll<HTMLElement>('[data-profile-panel]').forEach((button) => {
    button.classList.toggle('active', button.dataset.profilePanel === current);
  });

  const currentNode = document.querySelector<HTMLElement>('[data-profile-extra]');
  if (currentNode) currentNode.outerHTML = renderProfileExtraPanel();
};

export const updatePlayingState = (): void => {
  document.querySelector<HTMLElement>('.app-shell')
    ?.setAttribute('data-playing', String(state.isPlaying));
};