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

const tracks: Track[] = [
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

const state = {
  activeSection: 'proyectos' as SectionId,
  selectedProject: 0,
  selectedAvatar: 0,
  visitorCount: 1337,
  visitedSections: new Set<SectionId>(['proyectos']),
  currentTrack: 0,
  isPlaying: false,
  isMuted: false,
  volume: 72,
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

const formatTime = (value: number) => {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = Math.floor(safe % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const icon = (name: string) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${iconPaths[name] ?? iconPaths.arrow}"></path></svg>`;

const tagRow = (items: string[]) => items.map((item) => `<span>${item}</span>`).join('');

const renderShell = () => {
  const project = projects[state.selectedProject];
  const avatar = avatars[state.selectedAvatar];
  const track = tracks[state.currentTrack];

  root.innerHTML = `
    <main class="app-shell">
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
        <div>${icon('users')}<strong data-visitor-status>${formatCount(state.visitorCount)}</strong><small>Visitantes</small></div>
        <div>${icon('wifi')}<strong>Vite</strong><small>Conexion</small></div>
      </aside>

      <section id="proyectos" class="screen lobby-screen">
        <div id="lobby" class="lobby-anchor"></div>
        <div class="background-layer" aria-hidden="true">
          <img src="./assets/backgrounds/lobby-energy-stadium.png" alt="">
          <span class="background-vignette"></span>
        </div>

        <div class="visitor-counter" aria-label="Contador de visitantes">
          ${icon('users')}
          <span data-visitor-main>${formatCount(state.visitorCount)}</span>
          <strong>VISITANTES</strong>
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
          </div>
          <div class="music-controls">
            <button type="button" data-audio-prev aria-label="Cancion anterior">${icon('skipBack')}</button>
            <button class="play" type="button" data-audio-play aria-label="Reproducir musica">${icon('play')}</button>
            <button type="button" data-audio-next aria-label="Siguiente cancion">${icon('skipForward')}</button>
          </div>
          <div class="time-row"><span data-time-current>0:00</span><span data-time-duration>${formatTime(track.duration)}</span></div>
          <input class="range" data-audio-progress type="range" min="0" max="100" step="0.1" value="0" style="--fill: 0%" aria-label="Progreso de cancion">
          <div class="volume-row">
            <button type="button" data-audio-mute aria-label="Silenciar">${icon('volume')}</button>
            <input class="range" data-audio-volume type="range" min="0" max="100" value="${state.volume}" style="--fill: ${state.volume}%" aria-label="Volumen">
          </div>
        </aside>

        <button class="scroll-cue" type="button" data-scroll="who-i-am"><span>Scroll para explorar</span><i></i></button>
      </section>

      <section id="who-i-am" class="screen profile-screen section-grid">
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
          <div class="profile-links">
            <a href="https://github.com/Luis-Angel-G" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/luis-angel-gir%C3%B3n-ar%C3%A9valo-0b185a321/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </article>
      </section>

      <section id="misiones" class="screen missions-screen section-grid">
        <div class="panel-title wide">
          <p class="eyebrow">Misiones de recorrido</p>
          <h2>Misiones</h2>
          <p>Completa el tour del portafolio: revisa el lobby, conoce al desarrollador, selecciona un proyecto y termina en el camino profesional.</p>
        </div>
        <div class="mission-list">
          ${missionCard('Aterriza en Proyectos', 'Fase 1 de 4', '5K PE', 'Ir al lobby', 'proyectos', 100)}
          ${missionCard('Desbloquea Who I Am', 'Fase 2 de 4', '7K PE', 'Ver perfil', 'who-i-am', 40)}
          ${missionCard('Elige un proyecto', 'Fase 3 de 4', '10K PE', 'Ver previews', 'project-previews', 65)}
          ${missionCard('Revisa Mi Camino a Unreal', 'Mision final', 'Badge Unreal', 'Ir a carrera', 'carrera', 30)}
        </div>
        <aside class="mission-summary">
          <p class="eyebrow">Progreso de temporada</p>
          <strong data-season-progress>25%</strong>
          <span>Secciones descubiertas</span>
          <div class="meter"><i data-season-meter style="width: 25%"></i></div>
        </aside>
      </section>

      <section id="carrera" class="screen career-screen">
        <div class="career-header">
          <p class="eyebrow">Carrera</p>
          <h2>Mi Camino a Unreal</h2>
          <p>Ruta preparada para explicar estudios, decisiones tecnicas y el objetivo de entrar al mundo de experiencias interactivas y videojuegos.</p>
        </div>
        <div class="career-track">
          ${career.map((item) => `<article class="career-card"><span>${item.year}</span><h3>${item.title}</h3><p>${item.text}</p></article>`).join('')}
        </div>
        <div class="skill-board">
          ${skills
            .map(
              ([name, value]) =>
                `<div class="skill-row"><span>${name}</span><div class="meter"><i style="width: ${value}%"></i></div><strong>LVL ${value}</strong></div>`
            )
            .join('')}
        </div>
      </section>

      <section id="project-previews" class="project-previews" aria-label="Previews de proyectos">
        <div class="preview-header">
          <p class="eyebrow">Selecciona una isla</p>
          <h2>Previews de proyectos</h2>
        </div>
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

      <footer class="footer-bar">
        <a href="https://github.com/Luis-Angel-G" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/luis-angel-gir%C3%B3n-ar%C3%A9valo-0b185a321/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="./assets/audio/license.txt" target="_blank" rel="noreferrer">Musica</a>
      </footer>
    </main>
  `;
};

const missionCard = (
  title: string,
  phase: string,
  reward: string,
  actionLabel: string,
  target: string,
  progress: number
) => `
  <article class="mission-card">
    <div><span>${phase}</span><h3>${title}</h3><div class="meter"><i data-mission-meter="${target}" style="width: ${progress}%"></i></div></div>
    <strong>${reward}</strong>
    <button type="button" data-scroll="${target}">${actionLabel}</button>
  </article>
`;

const scrollToTarget = (target: string) => {
  const section = document.getElementById(target);
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const updateNav = () => {
  document.querySelectorAll<HTMLElement>('[data-nav]').forEach((button) => {
    button.classList.toggle('active', button.dataset.nav === state.activeSection);
  });
};

const updateVisitorText = () => {
  document.querySelectorAll<HTMLElement>('[data-visitor-main], [data-visitor-status]').forEach((node) => {
    node.textContent = formatCount(state.visitorCount);
  });
};

const updateSeasonProgress = () => {
  const percent = Math.round((state.visitedSections.size / navItems.length) * 100);
  const label = document.querySelector<HTMLElement>('[data-season-progress]');
  const meter = document.querySelector<HTMLElement>('[data-season-meter]');
  if (label) label.textContent = `${percent}%`;
  if (meter) meter.style.width = `${percent}%`;

  document.querySelector<HTMLElement>('[data-mission-meter="who-i-am"]')?.style.setProperty(
    'width',
    state.visitedSections.has('who-i-am') ? '100%' : '40%'
  );
  document.querySelector<HTMLElement>('[data-mission-meter="carrera"]')?.style.setProperty(
    'width',
    state.visitedSections.has('carrera') ? '100%' : '30%'
  );
  document.querySelector<HTMLElement>('[data-mission-meter="project-previews"]')?.style.setProperty(
    'width',
    state.selectedProject > 0 ? '100%' : '65%'
  );
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
  updateSeasonProgress();
  document.getElementById('lobby')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
};

const initAudio = () => {
  const audio = document.querySelector<HTMLAudioElement>('[data-audio]');
  const playButton = document.querySelector<HTMLButtonElement>('[data-audio-play]');
  const muteButton = document.querySelector<HTMLButtonElement>('[data-audio-mute]');
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
    if (state.isPlaying) void audio.play();
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
      await audio.play();
      state.isPlaying = true;
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
    });
  });

  document.querySelectorAll<HTMLElement>('[data-project]').forEach((button) => {
    button.addEventListener('click', () => updateProject(Number(button.dataset.project)));
  });

  document.querySelectorAll<HTMLElement>('[data-avatar]').forEach((button) => {
    button.addEventListener('click', () => updateAvatar(Number(button.dataset.avatar)));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id as SectionId;
      if (!navItems.some((item) => item.id === id)) return;
      state.activeSection = id;
      state.visitedSections.add(id);
      updateNav();
      updateSeasonProgress();
    },
    { rootMargin: '-25% 0px -50% 0px', threshold: [0.2, 0.35, 0.5] }
  );

  navItems.forEach((item) => {
    const section = document.getElementById(item.id);
    if (section) observer.observe(section);
  });
};

const initVisitors = () => {
  const stored = window.localStorage.getItem('victory-grid-visited');
  const baseline = 1337 + (Math.floor(Date.now() / 86400000) % 900);
  state.visitorCount = baseline + (stored ? 7 : 1);
  window.localStorage.setItem('victory-grid-visited', 'true');
  updateVisitorText();

  window.setInterval(() => {
    if (Math.random() > 0.55) {
      state.visitorCount += 1;
      updateVisitorText();
    }
  }, 4200);
};

renderShell();
bindInteractions();
initAudio();
initVisitors();
void initThree();
