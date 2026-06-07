import type { Avatar, CareerEntry, Project, SectionId } from './types';
import boltrexBio from './data/avatars/boltrex.md?raw';
import luisBio from './data/avatars/luis.md?raw';

export const navItems: { id: SectionId; label: string }[] = [
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'who-i-am', label: 'Who I Am' },
  { id: 'misiones', label: 'Misiones' },
  { id: 'carrera', label: 'Carrera' },
];

const preview = './assets/backgrounds/lobby-energy-stadium.png';

export const projects: Project[] = [
  {
    title: 'Conneto Frontend',
    mode: 'Plataforma de Colaboración — Next.js',
    summary:
      'Frontend de Conneto, una plataforma para fomentar colaboración entre equipos con impacto social. Construido con Next.js, TypeScript y Tailwind CSS. Deployado en Vercel.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    reward: '15K PE',
    url: 'https://github.com/24750Montenegro/Conneto-front',
    preview,
  },
  {
    title: 'Conneto Backend',
    mode: 'API REST — Spring Boot + MySQL',
    summary:
      'Backend de Conneto en Java con Spring Boot. Gestiona la lógica de negocio completa y se conecta a MySQL. 129 commits, arquitectura REST robusta con Java 17.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'REST API'],
    reward: '14K PE',
    url: 'https://github.com/24750Montenegro/Conneto-back',
    preview,
  },
  {
    title: 'Recomendador de Videojuegos',
    mode: 'Grafos + IA — Neo4j + Flask',
    summary:
      'Sistema de recomendación personalizada con base de datos en grafo Neo4j y API REST en Flask. Algoritmo que analiza preferencias, amistades y similitudes entre juegos para sugerir top 3.',
    stack: ['Python', 'Flask', 'Neo4j', 'Graph DB', 'REST API'],
    reward: '13K PE',
    url: 'https://github.com/MagicBag-tab/Proyecto_2_Algoritmos_y_Estructuras_de_Datos',
    preview,
  },
  {
    title: 'Interprete Lisp → Java',
    mode: 'Lenguajes — Compiladores',
    summary:
      'Intérprete del lenguaje Lisp implementado en Java. Parseo de expresiones, evaluación de árboles sintácticos y aritmética funcional. Proyecto de compiladores con 93 commits.',
    stack: ['Java', 'Intérprete', 'Lisp', 'Compiladores'],
    reward: '12K PE',
    url: 'https://github.com/MagicBag-tab/Proyecto_1_Algoritmos_y_Estructuras_de_Datos',
    preview,
  },
  {
    title: 'Full Stack Web App',
    mode: 'Backend Go + Frontend JS',
    summary:
      'Proyecto full stack con backend en Go (servidor, rutas, API) y frontend en JavaScript. Demuestra criterio técnico en decisiones de arquitectura y deploy.',
    stack: ['Go', 'JavaScript', 'REST API', 'Deploy'],
    reward: '11K PE',
    url: 'https://github.com/Sistemas-y-Tecnologias-Web-1-2026/Proyecto-1-Full-Stack---Backend',
    preview,
  },
  {
    title: 'MoodNutri',
    mode: 'App Android — Nutrición + Mood',
    summary:
      'Aplicación móvil en Kotlin que conecta el estado de ánimo del usuario con recomendaciones nutricionales. UI nativa con Jetpack Compose.',
    stack: ['Kotlin', 'Android', 'Jetpack Compose', 'Mobile'],
    reward: '10K PE',
    url: 'https://github.com/Programacion-de-Plataformas-Mobiles/MoodNutri',
    preview,
  },
  {
    title: 'GenAI Mobile',
    mode: 'IA Generativa en Android',
    summary:
      'Integración de modelos de IA generativa en una aplicación Android nativa. Kotlin con llamadas a APIs de IA para generar contenido en tiempo real.',
    stack: ['Kotlin', 'GenAI', 'Android', 'APIs'],
    reward: '9K PE',
    url: 'https://github.com/Programacion-de-Plataformas-Mobiles/GenAI',
    preview,
  },
  {
    title: 'Proyecto Base de Datos',
    mode: 'Sistema de BD + TypeScript',
    summary:
      'Proyecto final de Base de Datos 1: modelado relacional, queries avanzadas y frontend en TypeScript para visualizar y operar la base de datos.',
    stack: ['TypeScript', 'SQL', 'Database', 'ORM'],
    reward: '8K PE',
    url: 'https://github.com/Base-de-Datos-1-2026/Proyecto-2',
    preview,
  },
  {
    title: 'Snake JS',
    mode: 'Videojuego en Canvas',
    summary:
      'Juego Snake implementado con HTML Canvas y JavaScript vanilla. Game loop, detección de colisiones y control de estado sin frameworks.',
    stack: ['HTML', 'Canvas', 'JavaScript', 'Game Loop'],
    reward: '7K PE',
    url: 'https://github.com/Sistemas-y-Tecnologias-Web-1-2026/Snake',
    preview,
  },
  {
    title: 'Calculadora Web',
    mode: 'Lab TypeScript — UI Interactiva',
    summary:
      'Calculadora construida en TypeScript puro con lógica de estado propia, manejo de eventos y diseño accesible. Sin librerías externas.',
    stack: ['TypeScript', 'CSS', 'Vite', 'Accesibilidad'],
    reward: '6K PE',
    url: 'https://github.com/Sistemas-y-Tecnologias-Web-1-2026/Lab-8-Calculadora',
    preview,
  },
  {
    title: 'Password Meter',
    mode: 'Seguridad + UX TypeScript',
    summary:
      'Medidor de seguridad de contraseñas en tiempo real con feedback visual, análisis de entropía y criterios de fortaleza. TypeScript sin dependencias.',
    stack: ['TypeScript', 'CSS', 'Seguridad', 'UX'],
    reward: '5K PE',
    url: 'https://github.com/Sistemas-y-Tecnologias-Web-1-2026/Lab-8v2-Password-Meter',
    preview,
  },
];

export const musicPlaylist = {
  id: 'PLRpXyUQM3FyxbC8MtCoYVdo3qCQtfh-3w',
};

export const avatars: Avatar[] = [
  {
    name: 'Boltrex',
    role: 'Personaje Principal',
    face: './assets/avatars/boltrex-face.png',
    full: './assets/avatars/boltrex.png',
    bioTitle: 'Boltrex',
    bioText: boltrexBio,
    stats: [
      { value: '2017', label: 'Origen' },
      { value: 'Bolt + Willyrex', label: 'Fusión' },
    ],
    facts: [
      { icon: '🐕', label: 'Inspirado en', value: 'Bolt — mi perro que falleció en 2015. El mejor compañero.' },
      { icon: '📺', label: 'Youtuber favorito', value: 'Willyrex — de ahí viene la "X" de Boltrex.' },
      { icon: '🦖', label: 'Skin favorita', value: 'Rex de Fortnite — traje de dinosaurio, igual que Boltrex.' },
      { icon: '🎮', label: 'Juegos', value: 'Fortnite · Dragon Ball Legends · Dragon Ball FighterZ' },
      { icon: '⚡', label: 'Nick activo desde', value: '2017, Season 1 de Fortnite. Nunca lo cambié.' },
    ],
  },
  {
    name: 'Luis Angel',
    role: 'Desarrollador',
    face: './assets/avatars/luis-face.png',
    full: './assets/avatars/luis.png',
    bioTitle: 'Luis Angel Giron Arevalo',
    bioText: luisBio,
    stats: [
      { value: '3er Año', label: 'Temporada Actual' },
      { value: 'Epic Games', label: 'Misión Principal' },
    ],
    facts: [
      { icon: '🎓', label: 'Cómo llegó a compu', value: 'En 3ro básico era "solo una clase más" — y terminó siendo su carrera.' },
      { icon: '⚽', label: 'Equipo favorito', value: 'Real Madrid — siempre.' },
      { icon: '🎵', label: 'K-pop que escucha', value: 'BLACKPINK · BABYMONSTER · ILLIT · ITZY · NewJeans · MEOVV · Hearts2Hearts · Kep1er · NMIXX' },
      { icon: '🌍', label: 'Quiere vivir en', value: 'Andorra o Corea del Sur.' },
      { icon: '🚀', label: 'Superpoder', value: 'Aprende rápido — de cero a funcional en tiempo récord.' },
      { icon: '🎯', label: 'Meta profesional', value: 'Epic Games — crear productos que lleguen a millones.' },
    ],
  },
];

// ─── Career ───────────────────────────────────────────────────────────────────
export const career: CareerEntry[] = [
  {
    year: '2024–2026',
    title: 'Sistemas y Tecnologías Web',
    text: 'Curso completo: labs de TypeScript, componentes, APIs REST, bases de datos, apps móviles y deploy. Más de 10 proyectos entregados en equipo e individual.',
  },
  {
    year: 'Ahora',
    title: 'Three.js + Portafolio Interactivo',
    text: 'Riesgo medido: Three.js como capa visual sobre un stack sólido de Vite + TypeScript. El portafolio ES el proyecto más ambicioso del curso.',
  },
  {
    year: 'Siguiente nivel',
    title: 'Unreal Engine y Narrativa Jugable',
    text: 'Convertir la estética del portafolio en prototipos con mecánicas, historia y dirección visual propia. Largo plazo: videojuegos con identidad.',
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skills = [
  ['TypeScript', 84],
  ['CSS / UI', 86],
  ['Java / Spring', 75],
  ['Three.js', 64],
  ['Python / Flask', 68],
  ['Kotlin / Android', 62],
] as const;

// Mantenido para compatibilidad (ya no se usa en el panel de habilidades)
export const abilities = [
  ['UI Interactiva', 'Lobby, paneles y microinteracciones con CSS y TypeScript puro.'],
  ['Full Stack', 'Next.js en frontend, Spring Boot y Go en backend, SQL y Neo4j en datos.'],
  ['Game Feel Web', 'Three.js, energía visual y estructura pensada para experiencias jugables.'],
] as const;

export const techStack = [
  'TypeScript', 'Next.js', 'Java', 'Spring Boot',
  'Go', 'Python', 'Neo4j', 'Kotlin', 'Three.js',
  'Bun', 'SQL', 'GitHub',
];