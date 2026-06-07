import { getMissionAverage, getMissionProgress } from '../progress';
import { state } from '../state';
import type { MissionProgress } from '../types';
import { screenClass } from '../utils';

const xpIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;

const checkIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

const missionCard = (mission: MissionProgress): string => `
  <article
    class="mission-card ${mission.completed ? 'complete' : ''}"
    data-mission-card="${mission.key}"
    data-mission-completed="${mission.completed}"
  >
    <div class="mission-card-inner">

      <div class="mission-phase-tag">${mission.phase}</div>

      <div class="mission-body">
        <div class="mission-title-row">
          <div class="mission-check-icon" aria-hidden="true">${checkIcon}</div>
          <h3 class="mission-title">${mission.title}</h3>
        </div>
        <p class="mission-desc">${mission.description}</p>

        <div class="mission-progress-row">
          <div class="mission-meter-wrap">
            <div class="meter">
              <i data-mission-meter="${mission.key}" style="width: ${mission.value}%"></i>
              <b data-mission-label="${mission.key}">${mission.label}</b>
            </div>
          </div>
          <strong class="mission-pct" data-mission-percent="${mission.key}">${mission.value}%</strong>
        </div>
      </div>

      <div class="mission-footer">
        <span class="mission-xp-badge">
          ${xpIcon}
          <span data-mission-xp="${mission.key}">${mission.xpReward}</span>
        </span>
        <button type="button" class="mission-action-btn" data-scroll="${mission.target}">
          ${mission.completed ? '✓ Completada' : mission.actionLabel}
        </button>
      </div>

    </div>

    <!-- Completion glow overlay -->
    <div class="mission-complete-overlay" aria-hidden="true">
      <div class="mission-complete-burst">
        <span>${checkIcon}</span>
        <p>+${mission.xpReward}</p>
      </div>
    </div>
  </article>
`;

export const MissionsScreen = () => {
  const missions = getMissionProgress();
  const missionAverage = getMissionAverage();
  const completedCount = missions.filter(m => m.completed).length;
  const totalCount = missions.length;

  // Group by phase category (first word before ·)
  const phases: Record<string, MissionProgress[]> = {};
  missions.forEach(m => {
    const cat = m.phase.split('·')[0].trim();
    if (!phases[cat]) phases[cat] = [];
    phases[cat].push(m);
  });

  return `
    <section id="misiones" data-section="misiones" class="${screenClass('misiones', state.activeSection, 'missions-screen')}">

      <div class="mission-layout">

        <!-- Left: Tab rail -->
        <aside class="mission-tabs" aria-label="Categorias de misiones">
          <button class="active" type="button" aria-label="Misiones principales">XP</button>
        </aside>

        <!-- Center: Board -->
        <div class="mission-board">

          <div class="panel-title wide">
            <p class="eyebrow">Islas de creadores</p>
            <h2>Misiones</h2>
            <p>Completa objetivos explorando el portafolio. Cada misión completada desaparece con una recompensa de XP.</p>
          </div>

          ${Object.entries(phases).map(([cat, catMissions]) => `
            <div class="mission-group">
              <div class="mission-category">
                <span>${cat}</span>
              </div>
              <div class="mission-list" data-mission-group="${cat}">
                ${catMissions.map(m => missionCard(m)).join('')}
              </div>
            </div>
          `).join('')}

        </div>

        <!-- Right: Season summary -->
        <aside class="mission-summary">
          <div class="season-header">
            <p class="eyebrow">Temporada actual</p>
            <strong data-season-progress class="season-pct">${missionAverage}%</strong>
            <span class="season-label">Progreso global</span>
          </div>

          <div class="meter season-meter">
            <i data-season-meter style="width: ${missionAverage}%"></i>
          </div>

          <div class="mission-counter-grid">
            <div class="mission-counter-cell">
              <strong data-completed-count>${completedCount}</strong>
              <small>Completadas</small>
            </div>
            <div class="mission-counter-cell">
              <strong data-pending-count>${totalCount - completedCount}</strong>
              <small>Pendientes</small>
            </div>
            <div class="mission-counter-cell">
              <strong>${totalCount}</strong>
              <small>Total</small>
            </div>
          </div>
        </aside>

      </div>
    </section>
  `;
};