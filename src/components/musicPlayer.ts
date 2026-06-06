import { icon } from '../icons';

export const MusicPlayer = (): string => `
  <aside class="music-player" aria-label="Reproductor de música">

    <!--
      The YouTube IFrame API NEEDS a real DOM element to replace.
      We keep it invisible (1×1, opacity-0) so it never shows the video.
    -->
    <div class="yt-host" data-youtube-player aria-hidden="true"></div>

    <!-- Lisa token / album art placeholder -->
    <div class="lisa-token" aria-hidden="true">
      <span>♪</span>
    </div>

    <!-- Track info -->
    <div class="track-copy">
      <p class="eyebrow">Reproduciendo</p>
      <strong data-track-title>—</strong>
      <span data-track-artist></span>
    </div>

    <!-- Play / skip controls -->
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

    <!-- Time row -->
    <div class="time-row">
      <span data-time-current>0:00</span>
      <span data-time-duration>0:00</span>
    </div>

    <!-- Seek bar -->
    <input
      class="range"
      data-audio-progress
      type="range"
      min="0"
      max="100"
      step="0.1"
      value="0"
      style="--fill: 0%"
      aria-label="Progreso de canción"
    >

  </aside>
`;