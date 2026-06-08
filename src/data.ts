import type { Avatar, CareerEntry, Project, SectionId } from './types';
import boltrexBio from './data/avatars/boltrex.md?raw';
import luisBio from './data/avatars/luis.md?raw';

export const navItems: { id: SectionId; label: string }[] = [
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'who-i-am', label: 'Who I Am' },
  { id: 'misiones', label: 'Misiones' },
  { id: 'carrera', label: 'Carrera' },
];

export const projects: Project[] = [
  {
    title: 'Bodegas E-Commerce Platform',
    mode: 'Inventario + Pedidos — Vue 3 + Express',
    summary:
      'Full-stack enterprise e-commerce platform with inventory management, order processing, and promotions engine.',
    stack: ['Vue 3', 'TypeScript', 'Express', 'PostgreSQL', 'Docker', 'Prisma', 'Clerk', 'Cloudflare R2'],
    reward: '20K PE',
    demo: 'public/assets/Projects/demos/bodegasdelicores.webm',
    preview: './assets/Projects/licores.png',

  },
  {
    title: 'Conneto Frontend',
    mode: 'Plataforma de Colaboración — Next.js',
    summary:
      'Frontend de Conneto, una plataforma para fomentar colaboración entre equipos con impacto social. Construido con Next.js, TypeScript y Tailwind CSS. Deployado en Vercel.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    reward: '15K PE',
    url: 'https://github.com/24750Montenegro/Conneto-front',
    preview: './assets/Projects/conneto.png',
  },
  {
    title: 'Conneto Backend',
    mode: 'API REST — Spring Boot + MySQL',
    summary:
      'Backend de Conneto en Java con Spring Boot. Gestiona la lógica de negocio completa y se conecta a MySQL. 129 commits, arquitectura REST robusta con Java 17.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'REST API'],
    reward: '14K PE',
    url: 'https://github.com/24750Montenegro/Conneto-back',
    preview: './assets/Projects/conneto.png',
  },
  {
    title: 'Recomendador de Videojuegos',
    mode: 'Grafos + IA — Neo4j + Flask',
    summary:
      'Sistema de recomendación personalizada con base de datos en grafo Neo4j y API REST en Flask. Algoritmo que analiza preferencias, amistades y similitudes entre juegos para sugerir top 3.',
    stack: ['Python', 'Flask', 'Neo4j', 'Graph DB', 'REST API'],
    reward: '13K PE',
    url: 'https://github.com/MagicBag-tab/Proyecto_2_Algoritmos_y_Estructuras_de_Datos',
    preview: './assets/Projects/github.png',
  },
  {
    title: 'Interprete Lisp → Java',
    mode: 'Lenguajes — Compiladores',
    summary:
      'Intérprete del lenguaje Lisp implementado en Java. Parseo de expresiones, evaluación de árboles sintácticos y aritmética funcional. Proyecto de compiladores con 93 commits.',
    stack: ['Java', 'Intérprete', 'Lisp', 'Compiladores'],
    reward: '12K PE',
    url: 'https://github.com/MagicBag-tab/Proyecto_1_Algoritmos_y_Estructuras_de_Datos',
    preview: './assets/Projects/github.png',
  },
  {
    title: 'Full Stack Web App',
    mode: 'Backend Go + Frontend JS',
    summary:
      'Proyecto full stack con backend en Go (servidor, rutas, API) y frontend en JavaScript. Demuestra criterio técnico en decisiones de arquitectura y deploy.',
    stack: ['Go', 'JavaScript', 'REST API', 'Deploy'],
    reward: '11K PE',
    url: 'https://github.com/Sistemas-y-Tecnologias-Web-1-2026/Proyecto-1-Full-Stack---Backend',
    preview: './assets/Projects/fullstack-web.png',
  },
  {
    title: 'MoodNutri',
    mode: 'App Android — Nutrición + Mood',
    summary:
      'Aplicación móvil en Kotlin que conecta el estado de ánimo del usuario con recomendaciones nutricionales. UI nativa con Jetpack Compose.',
    stack: ['Kotlin', 'Android', 'Jetpack Compose', 'Mobile'],
    reward: '10K PE',
    url: 'https://github.com/Programacion-de-Plataformas-Mobiles/MoodNutri',
    preview: './assets/Projects/moodnutri.png',
  },
  {
    title: 'GenAI Mobile',
    mode: 'IA Generativa en Android',
    summary:
      'Integración de modelos de IA generativa en una aplicación Android nativa. Kotlin con llamadas a APIs de IA para generar contenido en tiempo real.',
    stack: ['Kotlin', 'GenAI', 'Android', 'APIs'],
    reward: '9K PE',
    url: 'https://github.com/Programacion-de-Plataformas-Mobiles/GenAI',
    preview: './assets/Projects/github.png',
  },
  {
    title: 'KStore Galaxy',
    mode: 'Sistema de BD + TypeScript',
    summary:
      'Proyecto final de Base de Datos 1: modelado relacional, queries avanzadas y frontend en TypeScript para visualizar y operar la base de datos.',
    stack: ['TypeScript', 'SQL', 'Database', 'ORM'],
    reward: '8K PE',
    url: 'https://github.com/Base-de-Datos-1-2026/Proyecto-2',
    preview: './assets/Projects/kstore-galaxy.png',
  },
  {
    title: 'Snake JS',
    mode: 'Videojuego en Canvas',
    summary:
      'Juego Snake implementado con HTML Canvas y JavaScript vanilla. Game loop, detección de colisiones y control de estado sin frameworks.',
    stack: ['HTML', 'Canvas', 'JavaScript', 'Game Loop'],
    reward: '7K PE',
    url: 'https://github.com/Sistemas-y-Tecnologias-Web-1-2026/Snake',
    preview: './assets/Projects/snake.png',
  },
  {
    title: 'Calculadora Web',
    mode: 'Lab TypeScript — UI Interactiva',
    summary:
      'Calculadora construida en TypeScript puro con lógica de estado propia, manejo de eventos y diseño accesible. Sin librerías externas.',
    stack: ['TypeScript', 'CSS', 'Vite', 'Accesibilidad'],
    reward: '6K PE',
    url: 'https://github.com/Sistemas-y-Tecnologias-Web-1-2026/Lab-8-Calculadora',
    preview: './assets/Projects/calculadora.png',
  },
  {
    title: 'Password Meter',
    mode: 'Seguridad + UX TypeScript',
    summary:
      'Medidor de seguridad de contraseñas en tiempo real con feedback visual, análisis de entropía y criterios de fortaleza. TypeScript sin dependencias.',
    stack: ['TypeScript', 'CSS', 'Seguridad', 'UX'],
    reward: '5K PE',
    url: 'https://github.com/Sistemas-y-Tecnologias-Web-1-2026/Lab-8v2-Password-Meter',
    preview: './assets/Projects/password.png',
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