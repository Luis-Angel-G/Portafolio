import { abilities, avatars, techStack } from '../data';
import { state } from '../state';
import { screenClass, tagRow } from '../utils';

export const renderProfileExtraPanel = () => {
  const current = state.profilePanels?.[state.selectedAvatar] ?? 'none';

  if (current === 'skills') {
    return `
      <div class="profile-extra-panel open" data-profile-extra>
        <p class="eyebrow">Habilidades</p>
        <div class="profile-extra-grid">
          ${abilities.map(([title, text]) => `<div><strong>${title}</strong><span>${text}</span></div>`).join('')}
        </div>
      </div>
    `;
  }

  if (current === 'tech') {
    return `
      <div class="profile-extra-panel open" data-profile-extra>
        <p class="eyebrow">Tech stack</p>
        <div class="profile-tech-tags">${tagRow(techStack)}</div>
      </div>
    `;
  }

  return '<div class="profile-extra-panel" data-profile-extra></div>';
};

export const ProfileScreen = () => {
  const avatar = avatars[state.selectedAvatar];

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
              <button type="button" data-avatar="${index}" class="avatar-slot ${index === state.selectedAvatar ? 'active' : ''}">
                <img src="${item.face}" alt="${item.name}">
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
        <div class="profile-actions" aria-label="Paneles del perfil">
          <button type="button" data-profile-panel="skills" class="${(state.profilePanels?.[state.selectedAvatar] ?? 'none') === 'skills' ? 'active' : ''}">Habilidades</button>
          <button type="button" data-profile-panel="tech" class="${(state.profilePanels?.[state.selectedAvatar] ?? 'none') === 'tech' ? 'active' : ''}">Tech Stack</button>
        </div>
        ${renderProfileExtraPanel()}
        <div class="profile-links">
          <a href="https://github.com/Luis-Angel-G" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/luis-angel-gir%C3%B3n-ar%C3%A9valo-0b185a321/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </article>
    </section>
  `;
};
