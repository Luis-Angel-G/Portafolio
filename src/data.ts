import type { Avatar, CareerEntry, Project, SectionId } from './types';

export const navItems: { id: SectionId; label: string }[] = [
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'who-i-am', label: 'Who I Am' },
  { id: 'misiones', label: 'Misiones' },
  { id: 'carrera', label: 'Carrera' },
];

const preview = './assets/backgrounds/lobby-energy-stadium.png';

export const projects: Project[] = [
  {
    title: 'Victory Grid Portfolio',
    mode: 'Lobby WebGL Interactivo',
    summary:
      'Portafolio con narrativa de juego, Qwik como ruta de migracion y Three.js para energia visual controlada.',
    stack: ['TypeScript', 'Three.js', 'Bun', 'CSS'],
    reward: '15K PE',
    url: 'https://github.com/Luis-Angel-G',
    preview,
  },
  {
    title: 'Dragon Quest Lab',
    mode: 'Prototipo de Gameplay',
    summary:
      'Espacio para un proyecto personal de mecanicas, narrativa y sistemas inspirados en juegos de aventura.',
    stack: ['TypeScript', 'Canvas', 'Game Loop'],
    reward: '12K PE',
    url: 'https://github.com/Luis-Angel-G',
    preview,
  },
  {
    title: 'ML Match Scout',
    mode: 'Machine Learning + Futbol',
    summary:
      'Idea para unir analisis de datos, scouting futbolistico y visualizaciones que expliquen decisiones.',
    stack: ['Python', 'Data Viz', 'API'],
    reward: '10K PE',
    url: 'https://github.com/Luis-Angel-G',
    preview,
  },
  {
    title: 'Web Systems Labs',
    mode: 'Misiones del Curso',
    summary:
      'Seleccion de laboratorios web donde se demuestra estructura, accesibilidad, deploy y decisiones tecnicas.',
    stack: ['React', 'Node', 'Deploy'],
    reward: '8K PE',
    url: 'https://github.com/Luis-Angel-G',
    preview,
  },
];

export const musicPlaylist = {
  id: 'PLRpXyUQM3FyxbC8MtCoYVdo3qCQtfh-3w',
};

export const avatars: Avatar[] = [
  {
    name: 'Boltrex',
    role: 'Skin inicial',
    face: './assets/avatars/boltrex-face.png',
    full: './assets/avatars/boltrex.png',
    bioTitle: 'Boltrex',
    bioText:
      'Skin principal del lobby: representa la energia del portafolio, la parte mas gamer y el enfoque visual inspirado en mundos de batalla, anime y experiencias interactivas.',
    stats: [
      { value: 'Main', label: 'Skin' },
      { value: 'Dragon Core', label: 'Estilo' },
    ],
  },
  {
    name: 'Luis Angel',
    role: 'Desarrollador',
    face: './assets/avatars/luis-face.png',
    full: './assets/avatars/luis.png',
    bioTitle: 'Luis Angel Giron Arevalo',
    bioText:
      'Desarrollador web en formacion con interes fuerte en videojuegos, experiencias interactivas y sistemas donde la historia, la tecnologia y el rendimiento trabajan juntos.',
    stats: [
      { value: 'GT', label: 'Region' },
      { value: 'Game Web', label: 'Audiencia' },
    ],
  },
];

export const career: CareerEntry[] = [
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

export const skills = [
  ['TypeScript', 82],
  ['CSS / UI', 86],
  ['Bun', 78],
  ['Three.js', 64],
  ['Unreal Mindset', 72],
] as const;

export const abilities = [
  ['UI Interactiva', 'Lobby, paneles y microinteracciones con CSS y TypeScript.'],
  ['Game Feel Web', 'Three.js, energia visual y estructura pensada para experiencias jugables.'],
  ['Deploy Mindset', 'Bun, Vite y rutas listas para publicar sin sobrecargar el proyecto.'],
] as const;

export const techStack = ['TypeScript', 'Three.js', 'Bun', 'Vite', 'CSS', 'Qwik Ready', 'APIs', 'GitHub'];
