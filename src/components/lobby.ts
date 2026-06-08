import { avatars, projects } from '../data';
import { icon } from '../icons';
import { state } from '../state';
import { screenClass, tagRow } from '../utils';
import { MusicPlayer } from './musicPlayer';

const repoIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
</svg>`;

const demoIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"></circle>
  <polygon points="10 8 16 12 10 16 10 8"></polygon>
</svg>`;

const externalIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
  <polyline points="15 3 21 3 21 9"></polyline>
  <line x1="10" y1="14" x2="21" y2="3"></line>
</svg>`;

export const ProjectFloatingList = (): HTMLElement => {
  const wrapper = document.createElement('div');
  wrapper.className = `project-float-list ${state.projectListOpen ? 'open' : ''}`;
  wrapper.setAttribute('data-project-list', '');
  wrapper.setAttribute('aria-label', 'Lista flotante de proyectos');

  projects.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.project = String(index);
    button.className = `project-float-card ${index === state.selectedProject ? 'active' : ''}`;

    const preview = document.createElement('span');
    preview.className = 'project-float-preview';
    const img = document.createElement('img');
    img.src = item.preview;
    img.alt = '';
    preview.appendChild(img);
    button.appendChild(preview);

    const strong = document.createElement('strong');
    strong.textContent = item.title;
    button.appendChild(strong);

    wrapper.appendChild(button);
  });

  return wrapper;
};

export const LobbyScreen = (): HTMLElement => {
  const project = projects[state.selectedProject];
  const avatar  = avatars[state.selectedAvatar];
  const hasRepo = Boolean(project.url);
  const hasDemo = Boolean(project.demo);
  const activeTab: 'repo' | 'demo' =
    state.projectTab === 'repo' && hasRepo ? 'repo' :
    state.projectTab === 'demo' && hasDemo ? 'demo' :
    hasRepo ? 'repo' : 'demo';
  const activeUrl = activeTab === 'demo' ? project.demo! : project.url!;

  const section = document.createElement('section');
  section.id = 'proyectos';
  section.setAttribute('data-section', 'proyectos');
  section.className = screenClass('proyectos', state.activeSection, 'lobby-screen');

  const anchor = document.createElement('div');
  anchor.id = 'lobby';
  anchor.className = 'lobby-anchor';
  section.appendChild(anchor);

  // ── Contador de visitantes ───────────────────────────────────────────────
  const visitorCounter = document.createElement('div');
  visitorCounter.className = 'visitor-counter';
  visitorCounter.setAttribute('aria-label', 'Contador de visitantes');
  const svgWrap = document.createElement('span');
  svgWrap.innerHTML = icon('users');
  visitorCounter.appendChild(svgWrap);
  const mainSpan = document.createElement('span');
  visitorCounter.appendChild(mainSpan);
  section.appendChild(visitorCounter);

  // ── Escenario ────────────────────────────────────────────────────────────
  const stage = document.createElement('div');
  stage.className = 'stage';
  const canvas = document.createElement('canvas');
  canvas.className = 'energy-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  stage.appendChild(canvas);
  const rings = document.createElement('div');
  rings.className = 'pedestal-rings';
  rings.setAttribute('aria-hidden', 'true');
  rings.innerHTML = '<span></span><span></span><span></span>';
  stage.appendChild(rings);
  const charImg = document.createElement('img');
  charImg.className = 'lobby-character';
  charImg.setAttribute('data-character', 'lobby');
  charImg.src = avatar.full;
  charImg.alt = `Skin actual: ${avatar.name}`;
  stage.appendChild(charImg);
  section.appendChild(stage);

  // ── CTA del proyecto ─────────────────────────────────────────────────────
  const projectCta = document.createElement('section');
  projectCta.className = 'project-cta';
  projectCta.setAttribute('aria-label', 'Proyecto seleccionado');

  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = 'Modo seleccionado';
  projectCta.appendChild(eyebrow);

  const h1 = document.createElement('h1');
  h1.setAttribute('data-project-mode', '');
  h1.textContent = project.mode;
  projectCta.appendChild(h1);

  const h2 = document.createElement('h2');
  h2.setAttribute('data-project-title', '');
  h2.textContent = project.title;
  projectCta.appendChild(h2);

  const summary = document.createElement('p');
  summary.setAttribute('data-project-summary', '');
  summary.textContent = project.summary;
  projectCta.appendChild(summary);

  const tags = document.createElement('div');
  tags.className = 'tag-row';
  tags.setAttribute('data-project-tags', '');
  tags.innerHTML = tagRow(project.stack);
  projectCta.appendChild(tags);

  // ── Barra de pestañas  ──────────────────────────────────
  const tabBar = document.createElement('div');
  tabBar.className = 'project-tab-bar';
  tabBar.setAttribute('role', 'tablist');
  tabBar.setAttribute('aria-label', 'Acción del proyecto');
  tabBar.setAttribute('data-project-tab-bar', '');

  // Pestaña Repo
  const repoTab = document.createElement('button');
  repoTab.type = 'button';
  repoTab.setAttribute('role', 'tab');
  repoTab.className = `project-tab ${activeTab === 'repo' ? 'active' : ''} ${!hasRepo ? 'disabled' : ''}`;
  repoTab.setAttribute('data-tab', 'repo');
  repoTab.setAttribute('aria-selected', String(activeTab === 'repo'));
  if (!hasRepo) {
    repoTab.setAttribute('aria-disabled', 'true');
    repoTab.setAttribute('title', 'Sin repositorio disponible');
  }
  repoTab.innerHTML = `<span class="tab-icon">${repoIcon}</span><span class="tab-label">Repo</span>${!hasRepo ? '<span class="tab-na"></span>' : ''}`;
  tabBar.appendChild(repoTab);

  // Pestaña Demo
  const demoTab = document.createElement('button');
  demoTab.type = 'button';
  demoTab.setAttribute('role', 'tab');
  demoTab.className = `project-tab ${activeTab === 'demo' ? 'active' : ''} ${!hasDemo ? 'disabled' : ''}`;
  demoTab.setAttribute('data-tab', 'demo');
  demoTab.setAttribute('aria-selected', String(activeTab === 'demo'));
  if (!hasDemo) {
    demoTab.setAttribute('aria-disabled', 'true');
    demoTab.setAttribute('title', 'Sin demo disponible');
  }
  demoTab.innerHTML = `<span class="tab-icon">${demoIcon}</span><span class="tab-label">Demo</span>${!hasDemo ? '<span class="tab-na"></span>' : ''}`;
  tabBar.appendChild(demoTab);

  projectCta.appendChild(tabBar);

  // ── Botón de acción principal ─────────────────────────────────────────────
  const link = document.createElement('a');
  link.className = 'primary-action';
  link.setAttribute('data-project-link', '');
  link.href = activeUrl;
  link.target = '_blank';
  link.rel = 'noreferrer';

  const spanLabel = document.createElement('span');
  spanLabel.setAttribute('data-action-label', '');
  spanLabel.textContent = activeTab === 'demo' ? 'Ver Demo' : 'Ver Proyecto';
  link.appendChild(spanLabel);

  const arrowWrap = document.createElement('span');
  arrowWrap.innerHTML = externalIcon;
  link.appendChild(arrowWrap);

  projectCta.appendChild(link);
  section.appendChild(projectCta);

  // ── Reproductor de música ─────────────────────────────────────────────────
  const musicHolder = document.createElement('div');
  musicHolder.innerHTML = MusicPlayer();
  Array.from(musicHolder.childNodes).forEach((n) => section.appendChild(n));

  // ── Indicador de scroll ───────────────────────────────────────────────────
  const scrollBtn = document.createElement('button');
  scrollBtn.className = `scroll-cue ${state.projectListOpen ? 'active' : ''}`;
  scrollBtn.type = 'button';
  scrollBtn.setAttribute('data-open-projects', '');
  const spanScroll = document.createElement('span');
  spanScroll.textContent = 'Scroll para ver proyectos';
  scrollBtn.appendChild(spanScroll);
  scrollBtn.appendChild(document.createElement('i'));
  section.appendChild(scrollBtn);

  return section;
};