import './src/global.css';

type SectionId = 'proyectos' | 'who-i-am' | 'misiones' | 'carrera';

type Project = {
  title: string;
  mode: string;
  summary: string;
  stack: string[];
  reward: string;
  url: string;
};

type Track = {
  title: string;
  artist: string;
  src: string;
  duration: number;
};

type MissionProgress = {
  key: string;
  title: string;
  phase: string;
  actionLabel: string;
  target: SectionId;
  value: number;
  label: string;
};

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing #root mount element');
}

const navItems: { id: SectionId; label: string }[] = [
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'who-i-am', label: 'Who I Am' },
  { id: 'misiones', label: 'Misiones' },
  { id: 'carrera', label: 'Carrera' },
];

const projects: Project[] = [
  {
    title: 'Victory Grid Portfolio',
    mode: 'Lobby WebGL Interactivo',
    summary:
      'Portafolio con narrativa de juego, Qwik como ruta de migracion y Three.js para energia visual controlada.',
    stack: ['TypeScript', 'Three.js', 'Bun', 'CSS'],
    reward: '15K PE',
    url: 'https://github.com/Luis-Angel-G',
  },
  {
    title: 'Dragon Quest Lab',
    mode: 'Prototipo de Gameplay',
    summary:
      'Espacio para un proyecto personal de mecanicas, narrativa y sistemas inspirados en juegos de aventura.',
    stack: ['TypeScript', 'Canvas', 'Game Loop'],
    reward: '12K PE',
    url: 'https://github.com/Luis-Angel-G',
  },
  {
    title: 'ML Match Scout',
    mode: 'Machine Learning + Futbol',
    summary:
      'Idea para unir analisis de datos, scouting futbolistico y visualizaciones que expliquen decisiones.',
    stack: ['Python', 'Data Viz', 'API'],
    reward: '10K PE',
    url: 'https://github.com/Luis-Angel-G',
  },
  {
    title: 'Web Systems Labs',
    mode: 'Misiones del Curso',
    summary:
      'Seleccion de laboratorios web donde se demuestra estructura, accesibilidad, deploy y decisiones tecnicas.',
    stack: ['React', 'Node', 'Deploy'],
    reward: '8K PE',
    url: 'https://github.com/Luis-Angel-G',
  },
];

const fallbackTracks: Track[] = [
  {
    title: 'Glownes',
    artist: 'Skygaze',
    src: './assets/audio/glowness-skygaze-main-version.mp3',
    duration: 139,
  },
  {
    title: 'The Flow',
    artist: 'Night Drift',
    src: './assets/audio/the-flow-night-drift-main-version-35011-02-00.mp3',
    duration: 120,
  },
  {
    title: 'The Waves',
    artist: 'otto.mp3',
    src: './assets/audio/the-waves-otto-mp3-main-version-33266-03-45.mp3',
    duration: 225,
  },
];

let tracks: Track[] = [...fallbackTracks];

const avatars = [
  {
    name: 'Boltrex',
    role: 'Skin inicial',
    face: './assets/avatars/boltrex-face.png',
    full: './assets/avatars/boltrex.png',
  },
  {
    name: 'Luis Angel',
    role: 'Desarrollador',
    face: './assets/avatars/luis-face.png',
    full: './assets/avatars/luis.png',
  },
];

const career = [
  {
    year: '2024-2026',
    title: 'Sistemas y Tecnologias Web',
    text: 'Labs, componentes, publicacion, accesibilidad y criterio tecnico para defender decisiones.',
  },
  {
    year: 'Ahora',
    title: 'Three.js + Qwik Ready',
    text: 'Riesgo medido: Three.js en el cliente y estructura lista para migrar a Qwik City si el alcance crece.',
  },
  {
    year: 'Siguiente nivel',
    title: 'Unreal y narrativa jugable',
    text: 'Convertir la estetica del portafolio en prototipos con mecanicas, historia y direccion visual propia.',
  },
];

const skills = [
  ['TypeScript', 82],
  ['CSS / UI', 86],
  ['Bun', 78],
  ['Three.js', 64],
  ['Unreal Mindset', 72],
] as const;

const abilities = [
  ['UI Interactiva', 'Lobby, paneles y microinteracciones con CSS y TypeScript.'],
  ['Game Feel Web', 'Three.js, energia visual y estructura pensada para experiencias jugables.'],
  ['Deploy Mindset', 'Bun, Vite y rutas listas para publicar sin sobrecargar el proyecto.'],
];

const techStack = ['TypeScript', 'Three.js', 'Bun', 'Vite', 'CSS', 'Qwik Ready', 'APIs', 'GitHub'];

const state = {
  activeSection: 'proyectos' as SectionId,
  selectedProject: 0,
  selectedAvatar: 0,
  visitorCount: 0,
  visitorStatus: 'Conectando',
  visitedSections: new Set<SectionId>(['proyectos']),
  currentTrack: 0,
  isPlaying: false,
  isMuted: false,
  volume: 72,
  playlistStatus: 'Playlist local',
  projectPanelOpen: false,
};

const iconPaths: Record<string, string> = {
  arrow: 'M4 12h14M12 5l7 7-7 7',
  pause: 'M8 5v14M16 5v14',
  play: 'M8 5l11 7-11 7V5z',
  skipBack: 'M19 5v14L9 12l10-7zM5 5v14',
  skipForward: 'M5 5v14l10-7L5 5zM19 5v14',
  users:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  volume: 'M5 9v6h4l5 4V5L9 9H5zM18 9a4 4 0 0 1 0 6',
  volumeOff: 'M5 9v6h4l5 4V5L9 9H5zM18 9l4 6M22 9l-4 6',
  wifi: 'M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M12 20h.01',
};

const formatCount = (value: number) => value.toLocaleString('es-GT');

const formatVisitorCount = (value: number) => (value > 0 ? formatCount(value) : '--');

const formatTime = (value: number) => {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = Math.floor(safe % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const icon = (name: string) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${iconPaths[name] ?? iconPaths.arrow}"></path></svg>`;

const tagRow = (items: string[]) => items.map((item) => `<span>${item}</span>`).join('');

const screenClass = (id: SectionId, extra = '') =>
  `screen ${extra} ${state.activeSection === id ? 'active-screen' : ''}`.trim();

const readString = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : '');

const readNumber = (value: unknown) => {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const asRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

const normalizeTrack = (value: unknown): Track | null => {
  const item = asRecord(value);
  if (!item) return null;

  const src = readString(item.src) || readString(item.url) || readString(item.audioUrl) || readString(item.preview_url);
  const title = readString(item.title) || readString(item.name);
  if (!src || !title) return null;

  return {
    title,
    artist: readString(item.artist) || readString(item.author) || readString(item.creator) || 'Playlist API',
    src,
    duration: readNumber(item.duration) || readNumber(item.durationSeconds) || readNumber(item.length) || 180,
  };
};

const readPlaylist = (payload: unknown) => {
  if (Array.isArray(payload)) return payload;
  const record = asRecord(payload);
  const tracksPayload = record?.tracks ?? record?.playlist ?? record?.data;
  return Array.isArray(tracksPayload) ? tracksPayload : [];
};

const getPlaylistUrl = () => import.meta.env.VITE_PLAYLIST_API_URL || './assets/audio/playlist.json';

const getVisitorApiUrl = () => import.meta.env.VITE_VISITOR_API_URL || '';

const getMissionProgress = (): MissionProgress[] => {
  const projectValue = state.projectPanelOpen || state.selectedProject > 0 ? 100 : 55;
  const profileValue = state.visitedSections.has('who-i-am') ? 100 : 35;
  const avatarValue = state.selectedAvatar > 0 ? 100 : 50;
  const careerValue = state.visitedSections.has('carrera') ? 100 : 25;

  return [
    {
      key: 'projects',
      title: 'Abrir panel de proyectos',
      phase: 'Fase 1 de 4',
      actionLabel: 'Ver proyectos',
      target: 'proyectos',
      value: projectValue,
      label: state.projectPanelOpen ? 'Panel abierto' : 'Pendiente',
    },
    {
      key: 'who',
      title: 'Leer Who I Am',
      phase: 'Fase 2 de 4',
      actionLabel: 'Ver perfil',
      target: 'who-i-am',
      value: profileValue,
      label: profileValue === 100 ? 'Completa' : 'Sin revisar',
    },
    {
      key: 'avatar',
      title: 'Cambiar avatar',
      phase: 'Fase 3 de 4',
      actionLabel: 'Ir a skins',
      target: 'who-i-am',
      value: avatarValue,
      label: avatarValue === 100 ? 'Skin alterna lista' : 'Boltrex activo',
    },
    {
      key: 'career',
      title: 'Revisar Mi Camino a Unreal',
      phase: 'Mision final',
      actionLabel: 'Ver carrera',
      target: 'carrera',
      value: careerValue,
      label: careerValue === 100 ? 'Ruta vista' : 'Bloqueada',
    },
  ];
};

const getMissionAverage = () => {
  const missions = getMissionProgress();
  return Math.round(missions.reduce((total, mission) => total + mission.value, 0) / missions.length);
};

const renderShell = () => {
  const project = projects[state.selectedProject];
  const avatar = avatars[state.selectedAvatar];
  const track = tracks[state.currentTrack];
  const missions = getMissionProgress();
  const missionAverage = getMissionAverage();

  root.innerHTML = `
    <main class="app-shell" data-active-section="${state.activeSection}">
      <header class="top-nav">
        <nav aria-label="Navegacion principal">
          ${navItems
            .map(
              (item) =>
                `<button type="button" data-nav="${item.id}" class="${item.id === state.activeSection ? 'active' : ''}">${item.label}</button>`
            )
            .join('')}
        </nav>
      </header>

      <aside class="status-panel" aria-label="Estado del portafolio">
        <p>Estado: Online</p>
        <span>60 FPS | 24ms</span>
        <div>${icon('users')}<strong data-visitor-status>${formatVisitorCount(state.visitorCount)}</strong><small data-visitor-label>${state.visitorStatus}</small></div>
        <div>${icon('wifi')}<strong>Vite</strong><small>Conexion</small></div>
      </aside>

      <div class="background-layer" aria-hidden="true">
        <img src="./assets/backgrounds/lobby-energy-stadium.png" alt="">
        <span class="background-vignette"></span>
      </div>

      <section id="proyectos" data-section="proyectos" class="${screenClass('proyectos', 'lobby-screen')}">
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

        <aside class="music-player" aria-label="Reproductor de musica">
          <audio data-audio src="${track.src}"></audio>
          <div class="lisa-token" aria-hidden="true"><span>Lisa</span></div>
          <div class="track-copy">
            <p class="eyebrow">Reproduciendo</p>
            <strong data-track-title>${track.title}</strong>
            <span data-track-artist>${track.artist}</span>
            <small data-playlist-status>${state.playlistStatus}</small>
          </div>
          <div class="music-controls">
            <button type="button" data-audio-prev aria-label="Cancion anterior">${icon('skipBack')}</button>
            <button class="play" type="button" data-audio-play aria-label="Reproducir musica">${icon('play')}</button>
            <button type="button" data-audio-next aria-label="Siguiente cancion">${icon('skipForward')}</button>
            <button type="button" data-playlist-refresh aria-label="Recargar playlist">${icon('wifi')}</button>
          </div>
          <div class="time-row"><span data-time-current>0:00</span><span data-time-duration>${formatTime(track.duration)}</span></div>
          <input class="range" data-audio-progress type="range" min="0" max="100" step="0.1" value="0" style="--fill: 0%" aria-label="Progreso de cancion">
          <div class="volume-row">
            <button type="button" data-audio-mute aria-label="Silenciar">${icon('volume')}</button>
            <input class="range" data-audio-volume type="range" min="0" max="100" value="${state.volume}" style="--fill: ${state.volume}%" aria-label="Volumen">
          </div>
        </aside>

        <button class="scroll-cue ${state.projectPanelOpen ? 'active' : ''}" type="button" data-open-projects>
          <span>Scroll para ver proyectos</span><i></i>
        </button>

        <section id="project-panel" class="project-drawer ${state.projectPanelOpen ? 'open' : ''}" data-project-panel aria-label="Panel de proyectos">
          <div class="preview-header">
            <p class="eyebrow">Selecciona una isla</p>
            <h2>Proyectos</h2>
          </div>
          <button class="drawer-close" type="button" data-close-projects aria-label="Cerrar panel">Cerrar</button>
          <div class="preview-grid">
            ${projects
              .map(
                (item, index) => `
                  <button type="button" data-project="${index}" class="project-card ${index === state.selectedProject ? 'active' : ''}">
                    <span class="reward">${item.reward}</span>
                    <strong>${item.title}</strong>
                    <small>${item.mode}</small>
                    <p>${item.summary}</p>
                    <i>Seleccionar</i>
                  </button>`
              )
              .join('')}
          </div>
        </section>
      </section>

      <section id="who-i-am" data-section="who-i-am" class="${screenClass('who-i-am', 'profile-screen section-grid')}">
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
          <h3>Luis Angel Giron Arevalo</h3>
          <p>Desarrollador web en formacion con interes fuerte en videojuegos, experiencias interactivas y sistemas donde la historia, la tecnologia y el rendimiento trabajan juntos.</p>
          <div class="stat-grid">
            <span><strong>GT</strong>Region</span>
            <span><strong>Game Web</strong>Audiencia</span>
          </div>
          <div class="ability-grid">
            ${abilities.map(([title, text]) => `<div><strong>${title}</strong><span>${text}</span></div>`).join('')}
          </div>
          <div class="tech-stack">
            <p class="eyebrow">Tech stack</p>
            <div>${tagRow(techStack)}</div>
          </div>
          <div class="profile-links">
            <a href="https://github.com/Luis-Angel-G" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/luis-angel-gir%C3%B3n-ar%C3%A9valo-0b185a321/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </article>
      </section>

      <section id="misiones" data-section="misiones" class="${screenClass('misiones', 'missions-screen')}">
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

      <section id="carrera" data-section="carrera" class="${screenClass('carrera', 'career-screen')}">
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

      <footer class="footer-bar">
        <a href="https://github.com/Luis-Angel-G" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/luis-angel-gir%C3%B3n-ar%C3%A9valo-0b185a321/" target="_blank" rel="noreferrer">LinkedIn</a>
      </footer>
    </main>
  `;
};

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

const scrollToTarget = (target: string) => {
  if (!navItems.some((item) => item.id === target)) {
    return;
  }

  state.activeSection = target as SectionId;
  state.visitedSections.add(state.activeSection);
  if (state.activeSection !== 'proyectos') {
    state.projectPanelOpen = false;
  }
  updateNav();
  updateVisibleScreens();
  updateProjectPanel();
  updateSeasonProgress();
};

const updateVisibleScreens = () => {
  document.querySelector<HTMLElement>('.app-shell')?.setAttribute('data-active-section', state.activeSection);

  document.querySelectorAll<HTMLElement>('[data-section]').forEach((section) => {
    section.classList.toggle('active-screen', section.id === state.activeSection);
  });
};

const updateProjectPanel = () => {
  document.querySelector<HTMLElement>('[data-project-panel]')?.classList.toggle('open', state.projectPanelOpen);
  document.querySelector<HTMLElement>('[data-open-projects]')?.classList.toggle('active', state.projectPanelOpen);
};

const updateNav = () => {
  document.querySelectorAll<HTMLElement>('[data-nav]').forEach((button) => {
    button.classList.toggle('active', button.dataset.nav === state.activeSection);
  });
};

const updateVisitorText = () => {
  document.querySelectorAll<HTMLElement>('[data-visitor-main], [data-visitor-status]').forEach((node) => {
    node.textContent = formatVisitorCount(state.visitorCount);
  });
  document.querySelectorAll<HTMLElement>('[data-visitor-label]').forEach((node) => {
    node.textContent = state.visitorStatus;
  });
};

const updateSeasonProgress = () => {
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

const updateProject = (index: number) => {
  state.selectedProject = Math.max(0, Math.min(projects.length - 1, index));
  const project = projects[state.selectedProject];
  document.querySelector<HTMLElement>('[data-project-mode]')!.textContent = project.mode;
  document.querySelector<HTMLElement>('[data-project-title]')!.textContent = project.title;
  document.querySelector<HTMLElement>('[data-project-summary]')!.textContent = project.summary;
  document.querySelector<HTMLElement>('[data-project-tags]')!.innerHTML = tagRow(project.stack);
  document.querySelector<HTMLAnchorElement>('[data-project-link]')!.href = project.url;
  document.querySelectorAll<HTMLElement>('[data-project]').forEach((button) => {
    button.classList.toggle('active', Number(button.dataset.project) === state.selectedProject);
  });
  state.projectPanelOpen = false;
  updateProjectPanel();
  updateSeasonProgress();
  scrollToTarget('proyectos');
};

const updateAvatar = (index: number) => {
  state.selectedAvatar = Math.max(0, Math.min(avatars.length - 1, index));
  const avatar = avatars[state.selectedAvatar];
  document.querySelectorAll<HTMLImageElement>('[data-character]').forEach((image) => {
    image.src = avatar.full;
    image.alt = image.dataset.character === 'lobby' ? `Skin actual: ${avatar.name}` : `Avatar de ${avatar.name}`;
  });
  document.querySelectorAll<HTMLElement>('[data-avatar]').forEach((button) => {
    button.classList.toggle('active', Number(button.dataset.avatar) === state.selectedAvatar);
  });
  updateSeasonProgress();
};

const setPlaylistStatus = (status: string) => {
  state.playlistStatus = status;
  const statusNode = document.querySelector<HTMLElement>('[data-playlist-status]');
  if (statusNode) statusNode.textContent = status;
};

const loadPlaylist = async (onLoaded?: () => void) => {
  const url = getPlaylistUrl();
  try {
    setPlaylistStatus('Conectando playlist');
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Playlist ${response.status}`);

    const payload = await response.json();
    const loaded = readPlaylist(payload).map(normalizeTrack).filter((track): track is Track => Boolean(track));
    if (!loaded.length) throw new Error('Playlist vacia');

    tracks = loaded;
    state.currentTrack = Math.min(state.currentTrack, tracks.length - 1);
    setPlaylistStatus(import.meta.env.VITE_PLAYLIST_API_URL ? 'Playlist API' : 'Playlist JSON');
    onLoaded?.();
  } catch {
    tracks = [...fallbackTracks];
    state.currentTrack = Math.min(state.currentTrack, tracks.length - 1);
    setPlaylistStatus('Playlist local pendiente');
    onLoaded?.();
  }
};

const initAudio = () => {
  const audio = document.querySelector<HTMLAudioElement>('[data-audio]');
  const playButton = document.querySelector<HTMLButtonElement>('[data-audio-play]');
  const muteButton = document.querySelector<HTMLButtonElement>('[data-audio-mute]');
  const refreshButton = document.querySelector<HTMLButtonElement>('[data-playlist-refresh]');
  const progress = document.querySelector<HTMLInputElement>('[data-audio-progress]');
  const volume = document.querySelector<HTMLInputElement>('[data-audio-volume]');
  const current = document.querySelector<HTMLElement>('[data-time-current]');
  const duration = document.querySelector<HTMLElement>('[data-time-duration]');
  const title = document.querySelector<HTMLElement>('[data-track-title]');
  const artist = document.querySelector<HTMLElement>('[data-track-artist]');
  if (!audio || !playButton || !muteButton || !progress || !volume || !current || !duration || !title || !artist) return;

  const applyTrack = () => {
    const track = tracks[state.currentTrack];
    audio.src = track.src;
    title.textContent = track.title;
    artist.textContent = track.artist;
    duration.textContent = formatTime(track.duration);
    current.textContent = '0:00';
    progress.value = '0';
    progress.style.setProperty('--fill', '0%');
    if (state.isPlaying) {
      void audio.play().catch(() => {
        state.isPlaying = false;
        updatePlayIcon();
        setPlaylistStatus('Agrega archivos o API');
      });
    }
  };

  const updatePlayIcon = () => {
    playButton.innerHTML = icon(state.isPlaying ? 'pause' : 'play');
    playButton.setAttribute('aria-label', state.isPlaying ? 'Pausar musica' : 'Reproducir musica');
  };

  playButton.addEventListener('click', async () => {
    if (state.isPlaying) {
      audio.pause();
      state.isPlaying = false;
    } else {
      audio.volume = state.volume / 100;
      audio.muted = state.isMuted;
      try {
        await audio.play();
        state.isPlaying = true;
      } catch {
        state.isPlaying = false;
        setPlaylistStatus('Agrega archivos o API');
      }
    }
    updatePlayIcon();
  });

  document.querySelector('[data-audio-prev]')?.addEventListener('click', () => {
    state.currentTrack = (state.currentTrack + tracks.length - 1) % tracks.length;
    applyTrack();
  });

  document.querySelector('[data-audio-next]')?.addEventListener('click', () => {
    state.currentTrack = (state.currentTrack + 1) % tracks.length;
    applyTrack();
  });

  refreshButton?.addEventListener('click', () => {
    void loadPlaylist(applyTrack);
  });

  muteButton.addEventListener('click', () => {
    state.isMuted = !state.isMuted;
    audio.muted = state.isMuted;
    muteButton.innerHTML = icon(state.isMuted ? 'volumeOff' : 'volume');
  });

  volume.addEventListener('input', () => {
    state.volume = Number(volume.value);
    state.isMuted = state.volume === 0;
    audio.volume = state.volume / 100;
    audio.muted = state.isMuted;
    volume.style.setProperty('--fill', `${state.volume}%`);
    muteButton.innerHTML = icon(state.isMuted ? 'volumeOff' : 'volume');
  });

  progress.addEventListener('input', () => {
    const next = Number(progress.value);
    const safeDuration = audio.duration || tracks[state.currentTrack].duration;
    audio.currentTime = (next / 100) * safeDuration;
    progress.style.setProperty('--fill', `${next}%`);
  });

  audio.addEventListener('timeupdate', () => {
    const safeDuration = audio.duration || tracks[state.currentTrack].duration;
    const percent = safeDuration > 0 ? (audio.currentTime / safeDuration) * 100 : 0;
    current.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(safeDuration);
    progress.value = String(percent);
    progress.style.setProperty('--fill', `${percent}%`);
  });

  audio.addEventListener('ended', () => {
    state.currentTrack = (state.currentTrack + 1) % tracks.length;
    applyTrack();
  });

  void loadPlaylist(applyTrack);
};

const initThree = async () => {
  const canvases = Array.from(document.querySelectorAll<HTMLCanvasElement>('.energy-canvas'));
  const THREE = await import('three');

  canvases.forEach((canvas) => {
    canvas.dataset.engine = `three.js r${THREE.REVISION}`;

    let renderer: InstanceType<typeof THREE.WebGLRenderer>;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas });
    } catch {
      canvas.classList.add('energy-canvas-fallback');
      canvas.dataset.engine = `three.js r${THREE.REVISION} unavailable`;
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 1.2, 6);

    const group = new THREE.Group();
    scene.add(group);

    const gold = new THREE.MeshBasicMaterial({ color: 0xffc857, transparent: true, opacity: 0.78 });
    const teal = new THREE.MeshBasicMaterial({ color: 0x42d8ff, transparent: true, opacity: 0.52 });
    const outer = new THREE.Mesh(new THREE.TorusGeometry(1.74, 0.035, 16, 128), gold);
    const inner = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.025, 16, 128), teal);
    outer.rotation.x = Math.PI * 0.5;
    inner.rotation.x = Math.PI * 0.5;
    group.add(outer, inner);

    const particles = new Float32Array(150 * 3);
    for (let i = 0; i < particles.length; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 1.25;
      particles[i] = Math.cos(angle) * radius;
      particles[i + 1] = -0.2 + Math.random() * 1.4;
      particles[i + 2] = Math.sin(angle) * radius;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.035, transparent: true, opacity: 0.75 });
    const field = new THREE.Points(geometry, material);
    group.add(field);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      camera.aspect = Math.max(width / Math.max(height, 1), 0.1);
      camera.updateProjectionMatrix();
    };

    let frame = 0;
    const animate = () => {
      frame += 0.01;
      outer.rotation.z += 0.008;
      inner.rotation.z -= 0.012;
      field.rotation.y += 0.003;
      group.position.y = Math.sin(frame * 2) * 0.08;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    animate();
  });
};

const bindInteractions = () => {
  document.querySelectorAll<HTMLElement>('[data-nav], [data-scroll]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.nav ?? button.dataset.scroll;
      if (target) scrollToTarget(target);
      if (button.dataset.scroll === 'proyectos') {
        state.projectPanelOpen = true;
        updateProjectPanel();
        updateSeasonProgress();
      }
    });
  });

  document.querySelector<HTMLElement>('[data-open-projects]')?.addEventListener('click', () => {
    state.activeSection = 'proyectos';
    state.visitedSections.add('proyectos');
    state.projectPanelOpen = true;
    updateVisibleScreens();
    updateNav();
    updateProjectPanel();
    updateSeasonProgress();
  });

  document.querySelector<HTMLElement>('[data-close-projects]')?.addEventListener('click', () => {
    state.projectPanelOpen = false;
    updateProjectPanel();
    updateSeasonProgress();
  });

  document.getElementById('proyectos')?.addEventListener(
    'wheel',
    (event) => {
      if (event.deltaY <= 20 || state.activeSection !== 'proyectos' || state.projectPanelOpen) return;
      event.preventDefault();
      state.projectPanelOpen = true;
      updateProjectPanel();
      updateSeasonProgress();
    },
    { passive: false }
  );

  document.querySelectorAll<HTMLElement>('[data-project]').forEach((button) => {
    button.addEventListener('click', () => updateProject(Number(button.dataset.project)));
  });

  document.querySelectorAll<HTMLElement>('[data-avatar]').forEach((button) => {
    button.addEventListener('click', () => updateAvatar(Number(button.dataset.avatar)));
  });
};

const setVisitorCount = (count: number, status: string) => {
  state.visitorCount = Math.max(0, Math.round(count));
  state.visitorStatus = status;
  updateVisitorText();
};

const initVisitorApi = (apiUrl: string) => {
  const baseUrl = apiUrl.replace(/\/$/, '');
  const visitorId = window.sessionStorage.getItem('victory-grid-visitor-id') || crypto.randomUUID();
  window.sessionStorage.setItem('victory-grid-visitor-id', visitorId);

  const readCount = async () => {
    const response = await fetch(`${baseUrl}/live`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Visitor API ${response.status}`);
    const payload = asRecord(await response.json());
    const count = readNumber(payload?.count) || readNumber(payload?.active) || readNumber(payload?.visitors);
    if (!count) throw new Error('Visitor API payload missing count');
    setVisitorCount(count, 'EN VIVO API');
  };

  const join = () =>
    fetch(`${baseUrl}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: visitorId, page: window.location.pathname }),
    }).catch(() => undefined);

  const leave = () => {
    const payload = JSON.stringify({ id: visitorId, page: window.location.pathname });
    navigator.sendBeacon?.(`${baseUrl}/leave`, new Blob([payload], { type: 'application/json' }));
  };

  void join().then(readCount).catch(() => setVisitorCount(0, 'API sin respuesta'));
  const timer = window.setInterval(() => {
    void join().then(readCount).catch(() => setVisitorCount(state.visitorCount, 'Reconectando'));
  }, 8000);

  window.addEventListener('pagehide', () => {
    window.clearInterval(timer);
    leave();
  });
};

const initLocalVisitors = () => {
  const key = 'victory-grid-live-visitors';
  const ttl = 18000;
  const visitorId = window.sessionStorage.getItem('victory-grid-visitor-id') || crypto.randomUUID();
  window.sessionStorage.setItem('victory-grid-visitor-id', visitorId);

  const readRoster = () => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(key) || '{}') as Record<string, number>;
      const now = Date.now();
      return Object.fromEntries(Object.entries(parsed).filter(([, expires]) => expires > now));
    } catch {
      return {};
    }
  };

  const touch = () => {
    const roster = readRoster();
    roster[visitorId] = Date.now() + ttl;
    window.localStorage.setItem(key, JSON.stringify(roster));
    setVisitorCount(Object.keys(roster).length, 'EN VIVO LOCAL');
  };

  touch();
  const timer = window.setInterval(touch, 5000);
  window.addEventListener('storage', (event) => {
    if (event.key === key) {
      setVisitorCount(Object.keys(readRoster()).length, 'EN VIVO LOCAL');
    }
  });
  window.addEventListener('pagehide', () => {
    const roster = readRoster();
    delete roster[visitorId];
    window.localStorage.setItem(key, JSON.stringify(roster));
    window.clearInterval(timer);
  });
};

const initVisitors = () => {
  const visitorApiUrl = getVisitorApiUrl();
  if (visitorApiUrl) {
    initVisitorApi(visitorApiUrl);
  } else {
    initLocalVisitors();
  }
};

renderShell();
bindInteractions();
initAudio();
initVisitors();
void initThree();
