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
    bioText: `
Nacido de la unión entre dos grandes influencias de mi historia: **Bolt**, mi perro y compañero de aventuras, y **Willyrex**, uno de los creadores de contenido que más marcaron mi infancia gamer. Así nació **Boltrex**, un alter ego digital que me ha acompañado desde 2017, cuando descubrí Fortnite y adopté este nombre como mi identidad en línea.
Su apariencia combina la lealtad y energía de Bolt con el icónico traje de dinosaurio inspirado en **Rex**, una de mis skins favoritas de Fortnite. Con el paso de los años, Boltrex se convirtió en mucho más que un simple nombre de usuario: pasó a representar mi identidad dentro de videojuegos, comunidades y proyectos personales.
Cuando no está explorando nuevos mundos digitales, puede encontrarse compitiendo en Fortnite, perfeccionando estrategias en Dragon Ball Legends. Más que un personaje, Boltrex representa curiosidad, perseverancia y la pasión por aprender, valores que también guían mi camino como estudiante de Computer Science y desarrollador en formación.
`,
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
   bioText: `
Desde pequeño, los videojuegos despertaron mi interés por la tecnología y la creatividad digital. Mi camino en la computación comenzó en el bachillerato, cuando elegí la orientación en computación y descubrí que disfrutaba construir cosas con tecnología. Esa experiencia me llevó a estudiar Ingeniería en Ciencias de la Computación y Tecnologías de la Información.
Actualmente curso mi tercer año universitario y disfruto crear proyectos web y experiencias interactivas que combinan diseño, funcionalidad y creatividad. Me gusta aprender nuevas tecnologías, resolver problemas y convertir ideas en productos reales. Una de mis fortalezas es aprender y adaptarme rápidamente a nuevas herramientas y conceptos.
Fuera del código, me apasionan los videojuegos competitivos como Fortnite, Dragon Ball Legends y Dragon Ball FighterZ, además del fútbol y la cultura pop coreana. Soy aficionado del Real Madrid y sigo grupos y artistas como BLACKPINK, BABYMONSTER, ITZY, ILLIT, Hearts2Hearts, MEOVV y NewJeans.
Mi objetivo es desarrollar experiencias digitales que inspiren a otros de la misma forma en que los videojuegos me inspiraron a mí. Aspiro a vivir en Europa o Corea del Sur y, algún día, formar parte de equipos como Epic Games para crear productos que lleguen a millones de personas.
`,
    stats: [
    { value: '3er Año', label: 'Temporada Actual' },
    { value: 'Epic Games', label: 'Misión Principal' },
  ],
  },
];

// ─── Career — sin menciones a Qwik ───────────────────────────────────────────
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

// ─── Skills — refleja lo que realmente usas ───────────────────────────────────
export const skills = [
  ['TypeScript', 84],
  ['CSS / UI', 86],
  ['Java / Spring', 75],
  ['Three.js', 64],
  ['Python / Flask', 68],
  ['Kotlin / Android', 62],
] as const;

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