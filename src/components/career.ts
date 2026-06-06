import { career, skills } from '../data';
import { state } from '../state';
import { screenClass } from '../utils';

export const CareerScreen = () => `
  <section id="carrera" data-section="carrera" class="${screenClass('carrera', state.activeSection, 'career-screen')}">
    <div class="career-layout">
      <div class="career-main">
        <div class="career-header">
          <p class="eyebrow">Carrera</p>
          <h2>Mi Camino a Unreal</h2>
          <p>Ruta preparada para explicar estudios, decisiones tecnicas y el objetivo de crecer hacia experiencias interactivas, videojuegos y narrativa jugable.</p>
        </div>

        <div class="season-track">
          <div class="meter"><i style="width: 75%"></i></div>
          <span>Progreso de temporada</span>
          <strong>75% completado</strong>
        </div>

        <div class="career-track">
          ${career.map((item, index) => `<article class="career-card ${index === 0 ? 'featured' : ''}"><span>${item.year}</span><h3>${item.title}</h3><p>${item.text}</p></article>`).join('')}
        </div>

        <div class="skill-board">
          <h3>Skill Proficiency</h3>
          ${skills
            .map(
              ([name, value]) =>
                `<div class="skill-row"><span>${name}</span><div class="meter"><i style="width: ${value}%"></i></div><strong>LVL ${value}</strong></div>`
            )
            .join('')}
        </div>
      </div>

      <aside class="career-summary">
        <div class="rank-badge" aria-hidden="true">UR</div>
        <p class="eyebrow">N. 1 personal</p>
        <h3>Unreal</h3>
        <strong>Developer Journey</strong>
        <div class="career-stats">
          <span><small>Win Rate</small><b>98.5%</b></span>
          <span><small>K/D Ratio</small><b>12.4</b></span>
          <span><small>XP</small><b>15.2K</b></span>
        </div>
      </aside>
    </div>
  </section>
`;
