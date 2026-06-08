import { icon } from '../icons';

export const MusicPlayer = (): string => `
  <aside class="music-player" aria-label="Reproductor de música">

    <!--
      La API IFrame de YouTube NECESITA un elemento DOM real para reemplazar.
      Se mantiene invisible (1×1, opacity-0) para que nunca muestre el video.
    -->
    <div class="yt-host" data-youtube-player aria-hidden="true"></div>

    <!-- Marcador de álbum -->
    <div class="lisa-token" aria-hidden="true">
      <span>♪</span>
    </div>

    <!-- Información de la pista -->
    <div class="track-copy">
      <p class="eyebrow">Reproduciendo</p>
      <strong data-track-title>—</strong>
      <span data-track-artist></span>
    </div>

    <!-- Controles: reproducir / saltar -->
    <div class="music-controls">
      <button type="button" data-audio-prev aria-label="Canción anterior">
        ${icon('skipBack')}
      </button>
      <button class="play" type="button" data-audio-play aria-label="Reproducir música">
        ${icon('play')}
      </button>
      <button type="button" data-audio-next aria-label="Siguiente canción">
        ${icon('skipForward')}
      </button>
    </div>

    <!-- Fila de tiempo -->
    <div class="time-row">
      <span data-time-current>0:00</span>
      <span data-time-duration>0:00</span>
    </div>

    <!-- Barra de progreso -->
    <input
      class="range"
      data-audio-progress
      type="range"
      min="0"
      max="100"
      step="0.1"
      value="0"
      style="--fill: 0%"
      aria-label="Progreso de la canción"
    >

  </aside>
`;