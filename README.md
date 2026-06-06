# Victory Grid Portfolio

Portafolio interactivo de Luis Angel Giron Arevalo con una interfaz inspirada en lobby gamer: proyectos, Who I Am, misiones y carrera.

## URL publicado

Pendiente de publicar. Recomendado: Vercel, Netlify o GitHub Pages.

## Stack

- Vite + TypeScript para una interfaz interactiva y estable.
- Three.js cargado solo en cliente para el pedestal/energia del lobby.
- Bun para instalar, desarrollar y compilar.
- CSS propio para mantener control visual sin depender de Tailwind CDN.

## Comandos

```bash
bun install
bun run dev
bun run build
```

## Reflexion base

Este portafolio esta dirigido principalmente a estudios o equipos que desarrollan experiencias interactivas, videojuegos o productos web creativos. La audiencia no es una empresa que solo quiere una pagina corporativa tradicional; es una audiencia que puede valorar una interfaz con narrativa, interaccion y direccion visual. Por eso el portafolio se presenta como un lobby de juego: los proyectos son islas/modos, la seccion personal funciona como taquilla, las misiones guian el recorrido y la carrera se cuenta como progreso hacia Unreal.

Elegir Vite + TypeScript para este primer corte tiene sentido porque el portafolio necesita funcionar bien antes de crecer en framework. Three.js se usa de forma limitada e intencional: no controla toda la pagina, solo aporta energia visual en el pedestal. Esa separacion mantiene el riesgo bajo, porque el portafolio sigue siendo usable aunque el canvas tarde en cargar.

La tecnologia del curso que decidi no usar como base principal fue React. No es porque React sea mala opcion; al contrario, seria la jugada segura por familiaridad y ecosistema. La razon es que el proyecto final tambien evalua intencionalidad y crecimiento, asi que Three.js representa una apuesta controlada para aprender algo nuevo y defender una decision tecnica distinta sin poner en riesgo todo el sitio.

Donde me arriesgue fue en la combinacion de Three.js, narrativa gamer, arte generado y un reproductor integrado. Donde la jugue seguro fue en mantener el contenido como HTML/CSS accesible, con enlaces reales a GitHub y LinkedIn, y con un build simple de Vite.
