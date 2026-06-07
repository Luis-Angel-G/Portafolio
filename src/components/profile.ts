import { avatars } from '../data';
import { state } from '../state';
import { screenClass, tagRow } from '../utils';

// ─── Profile screen ───────────────────────────────────────────────────────────

export const ProfileScreen = () => {
  const avatar = avatars[state.selectedAvatar];
  const current = state.profilePanels?.[state.selectedAvatar] ?? 'none';

  return `
    <section id="who-i-am" data-section="who-i-am" class="${screenClass('who-i-am', state.activeSection, 'profile-screen section-grid')}">
      <div class="panel-title">
        <p class="eyebrow">Taquilla del portafolio</p>
        <h2>Who I Am</h2>
      </div>

      <div class="avatar-slots" aria-label="Selector de personajes">
        ${avatars
          .map(
            (item, index) => `
              <button type="button" data-avatar="${index}" class="avatar-slot ${index === state.selectedAvatar ? 'active' : ''}" aria-pressed="${index === state.selectedAvatar}">
                <img src="${item.face}" alt="${item.name}" loading="lazy">
                <span>${item.name}</span>
                <small>${item.role}</small>
              </button>`
          )
          .join('')}
      </div>

      <div class="profile-character">
        <canvas class="energy-canvas" aria-hidden="true"></canvas>
        <div class="pedestal-rings compact" aria-hidden="true"><span></span><span></span></div>
        <img data-character="profile" src="${avatar.full}" alt="Avatar de ${avatar.name}">
      </div>

      <article class="bio-panel">
        <p class="eyebrow">Biografia del jugador</p>
        <h3 data-profile-bio-title>${avatar.bioTitle}</h3>
        <p data-profile-bio-text>${avatar.bioText}</p>
        <div class="stat-grid">
          ${avatar.stats.map((stat, index) => `<span><strong data-profile-stat-value="${index}">${stat.value}</strong><em data-profile-stat-label="${index}">${stat.label}</em></span>`).join('')}
        </div>
      </article>
    </section>
  `;
};