import { icon } from '../icons';
import { state } from '../state';

export const MusicPlayer = () => {
  return `
    <aside class="music-player" aria-label="Reproductor de musica">
      <div class="youtube-player-host" data-youtube-player aria-hidden="true"></div>
      <div class="lisa-token" aria-hidden="true"><span>Lisa</span></div>
      <div class="track-copy">
        <p class="eyebrow">Reproduciendo</p>
        <strong data-track-title></strong>
        <span data-track-artist></span>
      </div>
      <div class="music-controls">
        <button type="button" data-audio-prev aria-label="Cancion anterior">${icon('skipBack')}</button>
        <button class="play" type="button" data-audio-play aria-label="Reproducir musica">${icon('play')}</button>
        <button type="button" data-audio-next aria-label="Siguiente cancion">${icon('skipForward')}</button>
      </div>
      <div class="time-row"><span data-time-current>0:00</span><span data-time-duration>0:00</span></div>
      <input class="range" data-audio-progress type="range" min="0" max="100" step="0.1" value="0" style="--fill: 0%" aria-label="Progreso de cancion">
      <div class="volume-row">
        <button type="button" data-audio-mute aria-label="Silenciar">${icon('volume')}</button>
        <input class="range" data-audio-volume type="range" min="0" max="100" value="${state.volume}" style="--fill: ${state.volume}%" aria-label="Volumen">
      </div>
    </aside>
  `;
};
