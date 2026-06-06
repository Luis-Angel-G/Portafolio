import { getMissionAverage, getMissionProgress } from '../progress';
import { state } from '../state';
import type { MissionProgress } from '../types';
import { screenClass } from '../utils';

const missionCard = (mission: MissionProgress) => `
  <article class="mission-card ${mission.value >= 100 ? 'complete' : ''}" data-mission-card="${mission.key}">
    <div class="mission-copy">
      <span>${mission.phase}</span>
      <h3>${mission.title}</h3>
      <div class="meter"><i data-mission-meter="${mission.key}" style="width: ${mission.value}%"></i><b data-mission-label="${mission.key}">${mission.label}</b></div>
    </div>
    <strong data-mission-percent="${mission.key}">${mission.value}%</strong>
    <button type="button" data-scroll="${mission.target}">${mission.actionLabel}</button>
  </article>
`;

export const MissionsScreen = () => {
  const missions = getMissionProgress();
  const missionAverage = getMissionAverage();

  return `
    <section id="misiones" data-section="misiones" class="${screenClass('misiones', state.activeSection, 'missions-screen')}">
      <div class="mission-layout">
        <aside class="mission-tabs" aria-label="Categorias de misiones">
          <button class="active" type="button" aria-label="Misiones principales">XP</button>
        </aside>

        <div class="mission-board">
          <div class="panel-title wide">
            <p class="eyebrow">Islas de creadores</p>
            <h2>Semanales</h2>
            <p>Explora las facetas del portafolio como una lista de objetivos: proyectos, perfil, seleccion de avatar y ruta profesional.</p>
          </div>

          <div class="mission-category">
            <span>Misiones de desarrollo</span>
          </div>

          <div class="mission-list">
            ${missions.map((mission) => missionCard(mission)).join('')}
          </div>
        </div>

        <aside class="mission-summary">
          <div>
            <p class="eyebrow">Progreso de temporada</p>
            <strong data-season-progress>${missionAverage}%</strong>
            <span>Misiones completadas</span>
          </div>
          <div class="meter"><i data-season-meter style="width: ${missionAverage}%"></i></div>
          <div class="level-ring" aria-label="Nivel del portafolio">
            <span>Nivel</span>
            <strong>220</strong>
          </div>
        </aside>
      </div>
    </section>
  `;
};
