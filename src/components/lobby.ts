import { avatars, projects } from '../data';
import { icon } from '../icons';
import { state } from '../state';
import { screenClass, formatVisitorCount, tagRow } from '../utils';
import { MusicPlayer } from './musicPlayer';

export const ProjectFloatingList = () => `
  <div class="project-float-list ${state.projectListOpen ? 'open' : ''}" data-project-list aria-label="Lista flotante de proyectos">
    ${projects
      .map(
        (item, index) => `
          <button type="button" data-project="${index}" class="project-float-card ${index === state.selectedProject ? 'active' : ''}">
            <span class="project-float-preview"><img src="${item.preview}" alt=""></span>
            <strong>${item.title}</strong>
          </button>`
      )
      .join('')}
  </div>
`;

export const LobbyScreen = () => {
  const project = projects[state.selectedProject];
  const avatar = avatars[state.selectedAvatar];

  return `
    <section id="proyectos" data-section="proyectos" class="${screenClass('proyectos', state.activeSection, 'lobby-screen')}">
      <div id="lobby" class="lobby-anchor"></div>

      <div class="visitor-counter" aria-label="Contador de visitantes">
        ${icon('users')}
        <span data-visitor-main>${formatVisitorCount(state.visitorCount)}</span>
        <strong data-visitor-label>${state.visitorStatus}</strong>
      </div>

      <div class="stage">
        <canvas class="energy-canvas" aria-hidden="true"></canvas>
        <div class="pedestal-rings" aria-hidden="true"><span></span><span></span><span></span></div>
        <img class="lobby-character" data-character="lobby" src="${avatar.full}" alt="Skin actual: ${avatar.name}">
      </div>

      <section class="project-cta" aria-label="Proyecto seleccionado">
        <p class="eyebrow">Modo seleccionado</p>
        <h1 data-project-mode>${project.mode}</h1>
        <h2 data-project-title>${project.title}</h2>
        <p data-project-summary>${project.summary}</p>
        <div class="tag-row" data-project-tags>${tagRow(project.stack)}</div>
        <a class="primary-action" data-project-link href="${project.url}" target="_blank" rel="noreferrer">
          <span>Ver Proyecto</span>${icon('arrow')}
        </a>
      </section>

      ${MusicPlayer()}

      <button class="scroll-cue ${state.projectListOpen ? 'active' : ''}" type="button" data-open-projects>
        <span>Scroll para ver proyectos</span><i></i>
      </button>
    </section>
  `;
};
