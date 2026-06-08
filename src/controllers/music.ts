import { icon } from '../icons';
import {  setState } from '../state';
import { formatTime } from '../utils';

// ─── YouTube IFrame API types ────────────────────────────────────────────────

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  nextVideo(): void;
  previousVideo(): void;
  loadPlaylist(opts: { list: string; listType: string; index: number; startSeconds: number }): void;
  cuePlaylist(opts: { list: string; listType: string; index: number; startSeconds: number }): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlaylistIndex(): number;
  getVideoData(): { title?: string; author?: string; video_id?: string };
  setVolume(volume: number): void;
  mute(): void;
  unMute(): void;
  getPlayerState(): number;
  destroy(): void;
}

interface YTEvent {
  data: number;
  target: YTPlayer;
}

interface YTReadyEvent {
  target: YTPlayer;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          width?: number | string;
          height?: number | string;
          playerVars?: Record<string, string | number | boolean>;
          events?: {
            onReady?: (e: YTReadyEvent) => void;
            onStateChange?: (e: YTEvent) => void;
            onError?: (e: YTEvent) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

// ─── Playlist ID ─────────────────────────────────────────────────────────────
// https://youtube.com/playlist?list=PLRpXyUQM3FyxbC8MtCoYVdo3qCQtfh-3w
const PLAYLIST_ID = 'PLRpXyUQM3FyxbC8MtCoYVdo3qCQtfh-3w';

// ─── Load YouTube API once ───────────────────────────────────────────────────
let apiReady: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (apiReady) return apiReady;

  apiReady = new Promise<void>((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return apiReady;
}

// ─── Main init ───────────────────────────────────────────────────────────────
export function initMusicPlayer(): void {
  // DOM refs
  const host       = document.querySelector<HTMLDivElement>('[data-youtube-player]');
  const playBtn    = document.querySelector<HTMLButtonElement>('[data-audio-play]');
  const prevBtn    = document.querySelector<HTMLButtonElement>('[data-audio-prev]');
  const nextBtn    = document.querySelector<HTMLButtonElement>('[data-audio-next]');
  const progressEl = document.querySelector<HTMLInputElement>('[data-audio-progress]');
  const timeCur    = document.querySelector<HTMLElement>('[data-time-current]');
  const timeDur    = document.querySelector<HTMLElement>('[data-time-duration]');
  const titleEl    = document.querySelector<HTMLElement>('[data-track-title]');
  const artistEl   = document.querySelector<HTMLElement>('[data-track-artist]');

  if (!host || !playBtn || !prevBtn || !nextBtn ||
      !progressEl || !timeCur || !timeDur || !titleEl || !artistEl) {
    console.warn('[music] Missing DOM nodes, skipping init');
    return;
  }

  // Create a real div element for YT to target
  const playerDiv = document.createElement('div');
  playerDiv.id = 'yt-iframe-target';
  host.appendChild(playerDiv);

  let player: YTPlayer | null = null;
  let progressTimer: number | null = null;
  let metaRetryTimer: number | null = null;
  let seekingFromUser = false;

  // ── UI helpers ─────────────────────────────────────────────────────────────

  function setPlayIcon(playing: boolean): void {
    playBtn!.innerHTML = icon(playing ? 'pause' : 'play');
    playBtn!.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
  }

  function setProgress(current: number, duration: number): void {
    const pct = duration > 0 ? (current / duration) * 100 : 0;
    if (!seekingFromUser) {
      progressEl!.value = String(pct);
      progressEl!.style.setProperty('--fill', `${pct}%`);
    }
    timeCur!.textContent  = formatTime(current);
    timeDur!.textContent  = formatTime(duration);
  }

  function clearProgress(): void {
    progressEl!.value = '0';
    progressEl!.style.setProperty('--fill', '0%');
    timeCur!.textContent = '0:00';
    timeDur!.textContent = '0:00';
  }

  // YouTube strips HTML entities and truncates titles; clean it up
  function cleanText(raw: string | undefined): string {
    if (!raw) return '';
    const txt = document.createElement('textarea');
    txt.innerHTML = raw;
    return txt.value.trim();
  }

  function syncMeta(): void {
    if (!player) return;
    const data = player.getVideoData();
    const t    = cleanText(data?.title);
    const a    = cleanText(data?.author);

    if (!t) {
      if (metaRetryTimer) clearTimeout(metaRetryTimer);
      metaRetryTimer = window.setTimeout(syncMeta, 600);
      return;
    }

    titleEl!.textContent  = t || 'Sin título';
    artistEl!.textContent = a || '';
  }

  function startProgressLoop(): void {
    if (progressTimer) return;
    progressTimer = window.setInterval(() => {
      if (!player) return;
      const cur = player.getCurrentTime() ?? 0;
      const dur = player.getDuration()    ?? 0;
      setProgress(cur, dur);
    }, 500);
  }

  function stopProgressLoop(): void {
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
  }

  // ── Event bindings ─────────────────────────────────────────────────────────

  playBtn.addEventListener('click', () => {
    if (!player) return;
    const ps = window.YT?.PlayerState;
    if (!ps) return;
    const s = player.getPlayerState();
    if (s === ps.PLAYING) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (!player) return;
    player.previousVideo();
    window.setTimeout(syncMeta, 500);
  });

  nextBtn.addEventListener('click', () => {
    if (!player) return;
    player.nextVideo();
    window.setTimeout(syncMeta, 500);
  });

  // Seek: start/end events to avoid fighting with the progress loop
  progressEl.addEventListener('mousedown',  () => { seekingFromUser = true;  });
  progressEl.addEventListener('touchstart', () => { seekingFromUser = true;  }, { passive: true });

  progressEl.addEventListener('input', () => {
    const pct = Number(progressEl.value);
    progressEl.style.setProperty('--fill', `${pct}%`);
    // Show live time while dragging
    if (player) {
      const dur = player.getDuration() ?? 0;
      timeCur!.textContent = formatTime((pct / 100) * dur);
    }
  });

  progressEl.addEventListener('change', () => {
    if (!player) { seekingFromUser = false; return; }
    const dur = player.getDuration() ?? 0;
    const pct = Number(progressEl.value);
    player.seekTo((pct / 100) * dur, true);
    seekingFromUser = false;
  });

  // ── Create YT Player ────────────────────────────────────────────────────────

  void loadYouTubeAPI().then(() => {
    if (!window.YT?.Player) { console.error('[music] YT API not available'); return; }

    player = new window.YT.Player(playerDiv, {
      width:  1,
      height: 1,
      playerVars: {
        listType:   'playlist',
        list:        PLAYLIST_ID,
        autoplay:    1,
        controls:    0,
        disablekb:   1,
        fs:          0,
        rel:         0,
        origin:      window.location.origin,
        enablejsapi: 1,
      },
      events: {
        onReady(e) {
          player = e.target;
          player.playVideo();
          syncMeta();
          clearProgress();
        },

        onStateChange(e) {
          const ps = window.YT!.PlayerState;
          switch (e.data) {
            case ps.PLAYING:
              setState({ isPlaying: true });
              setPlayIcon(true);
              startProgressLoop();
              syncMeta();
              break;

            case ps.PAUSED:
            case ps.ENDED:
              setState({ isPlaying: false });
              setPlayIcon(false);
              if (e.data === ps.ENDED) stopProgressLoop();
              break;

            case ps.BUFFERING:
              break;

            default:
              break;
          }
        },

        onError(e) {
          console.warn('[music] YT player error code', e.data);
          if (e.data === 101 || e.data === 150) {
            player?.nextVideo();
          }
        },
      },
    });
  });
}