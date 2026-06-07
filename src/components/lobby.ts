import { avatars, projects } from '../data';
import { icon } from '../icons';
import { state } from '../state';
import { screenClass, formatVisitorCount, tagRow } from '../utils';
import { MusicPlayer } from './musicPlayer';

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
  const avatar = avatars[state.selectedAvatar];

  const section = document.createElement('section');
  section.id = 'proyectos';
  section.setAttribute('data-section', 'proyectos');
  section.className = screenClass('proyectos', state.activeSection, 'lobby-screen');

  const anchor = document.createElement('div');
  anchor.id = 'lobby';
  anchor.className = 'lobby-anchor';
  section.appendChild(anchor);

  const visitorCounter = document.createElement('div');
  visitorCounter.className = 'visitor-counter';
  visitorCounter.setAttribute('aria-label', 'Contador de visitantes');
  const svgWrap = document.createElement('span');
  svgWrap.innerHTML = icon('users');
  visitorCounter.appendChild(svgWrap);
  const mainSpan = document.createElement('span');
  mainSpan.setAttribute('data-visitor-main', '');
  mainSpan.textContent = formatVisitorCount(state.visitorCount);
  visitorCounter.appendChild(mainSpan);
  const status = document.createElement('strong');
  status.setAttribute('data-visitor-label', '');
  status.textContent = state.visitorStatus;
  visitorCounter.appendChild(status);
  section.appendChild(visitorCounter);

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
  const link = document.createElement('a');
  link.className = 'primary-action';
  link.setAttribute('data-project-link', '');
  link.href = project.url;
  link.target = '_blank';
  link.rel = 'noreferrer';
  const spanLabel = document.createElement('span');
  spanLabel.textContent = 'Ver Proyecto';
  link.appendChild(spanLabel);
  const arrowWrap = document.createElement('span');
  arrowWrap.innerHTML = icon('arrow');
  link.appendChild(arrowWrap);
  projectCta.appendChild(link);
  section.appendChild(projectCta);

  // MusicPlayer returns HTML string — append as nodes
  const musicHolder = document.createElement('div');
  musicHolder.innerHTML = MusicPlayer();
  Array.from(musicHolder.childNodes).forEach((n) => section.appendChild(n));

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
