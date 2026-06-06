import { musicPlaylist } from '../data';
import { icon } from '../icons';
import { state } from '../state';
import { formatTime } from '../utils';

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  cuePlaylist: (playlist: string | string[], index?: number, startSeconds?: number) => void;
  loadPlaylist: (playlist: string | string[], index?: number, startSeconds?: number) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlaylistIndex?: () => number;
  getVideoData: () => { author?: string; title?: string; video_id?: string };
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
};

type YouTubeStateEvent = {
  data: number;
};

type YouTubeApi = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId?: string;
      width?: string;
      height?: string;
      playerVars?: Record<string, string | number | boolean>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: YouTubeStateEvent) => void;
      };
    }
  ) => YouTubePlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
  };
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YouTubeApi> | null = null;

const loadYouTubeApi = () => {
  if (window.YT?.Player) return Promise.resolve(window.YT);

  youtubeApiPromise ??= new Promise<YouTubeApi>((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      if (window.YT) resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return youtubeApiPromise;
};

export const initMusicPlayer = () => {
  const host = document.querySelector<HTMLElement>('[data-youtube-player]');
  const playButton = document.querySelector<HTMLButtonElement>('[data-audio-play]');
  const muteButton = document.querySelector<HTMLButtonElement>('[data-audio-mute]');
  const progress = document.querySelector<HTMLInputElement>('[data-audio-progress]');
  const volume = document.querySelector<HTMLInputElement>('[data-audio-volume]');
  const current = document.querySelector<HTMLElement>('[data-time-current]');
  const duration = document.querySelector<HTMLElement>('[data-time-duration]');
  const title = document.querySelector<HTMLElement>('[data-track-title]');
  const artist = document.querySelector<HTMLElement>('[data-track-artist]');

  if (!host || !playButton || !muteButton || !progress || !volume || !current || !duration || !title || !artist) return;

  let player: YouTubePlayer | null = null;
  let playerState = { ended: 0, playing: 1, paused: 2 };

  const updatePlayIcon = () => {
    playButton.innerHTML = icon(state.isPlaying ? 'pause' : 'play');
    playButton.setAttribute('aria-label', state.isPlaying ? 'Pausar musica' : 'Reproducir musica');
  };

  const updateTrackUi = () => {
    if (!player) {
      title.textContent = '';
      artist.textContent = '';
      duration.textContent = '0:00';
      current.textContent = '0:00';
      progress.value = '0';
      progress.style.setProperty('--fill', '0%');
      return;
    }

    const data = player.getVideoData?.();
    title.textContent = data?.title?.trim() || '';
    artist.textContent = data?.author?.trim() || '';
  };

  const applyVolume = () => {
    if (!player) return;
    player.setVolume(state.volume);
    if (state.isMuted || state.volume === 0) {
      player.mute();
    } else {
      player.unMute();
    }
    muteButton.innerHTML = icon(state.isMuted || state.volume === 0 ? 'volumeOff' : 'volume');
    volume.style.setProperty('--fill', `${state.volume}%`);
  };

  const syncTrackUi = () => {
    if (!player) return;

    const playlistIndex = Math.max(0, player.getPlaylistIndex?.() ?? state.currentTrack);
    state.currentTrack = playlistIndex;

    const videoData = player.getVideoData?.();
    const titleText = videoData?.title?.trim() || '';
    const artistText = videoData?.author?.trim() || '';
    const currentDuration = player.getDuration();
    const safeDuration = Number.isFinite(currentDuration) && currentDuration > 0 ? currentDuration : 0;

    title.textContent = titleText;
    artist.textContent = artistText;
    duration.textContent = formatTime(safeDuration);
  };

  const changeTrack = (offset: number) => {
    if (!player) return;
    if (offset > 0) {
      player.nextVideo();
    } else if (offset < 0) {
      player.previousVideo();
    }
    syncTrackUi();
  };

  const syncProgress = () => {
    if (!player) return;

    const playerDuration = player.getDuration();
    const safeDuration = Number.isFinite(playerDuration) && playerDuration > 0 ? playerDuration : 0;
    const currentTime = Math.max(0, player.getCurrentTime() || 0);
    const percent = safeDuration > 0 ? (currentTime / safeDuration) * 100 : 0;

    syncTrackUi();
    current.textContent = formatTime(currentTime);
    duration.textContent = formatTime(safeDuration);
    progress.value = String(percent);
    progress.style.setProperty('--fill', `${percent}%`);
  };

  playButton.addEventListener('click', () => {
    if (!player) {
      return;
    }

    if (state.isPlaying) {
      player.pauseVideo();
      state.isPlaying = false;
    } else {
      player.playVideo();
      state.isPlaying = true;
    }

    updatePlayIcon();
  });

  document.querySelector('[data-audio-prev]')?.addEventListener('click', () => changeTrack(-1));
  document.querySelector('[data-audio-next]')?.addEventListener('click', () => changeTrack(1));

  muteButton.addEventListener('click', () => {
    state.isMuted = !state.isMuted;
    applyVolume();
  });

  volume.addEventListener('input', () => {
    state.volume = Number(volume.value);
    state.isMuted = state.volume === 0;
    applyVolume();
  });

  progress.addEventListener('input', () => {
    if (!player) return;
    const percent = Number(progress.value);
    const safeDuration = player.getDuration() || 0;
    player.seekTo((percent / 100) * safeDuration, true);
    progress.style.setProperty('--fill', `${percent}%`);
  });

  updateTrackUi();

  void loadYouTubeApi().then((api) => {
    playerState = {
      ended: api.PlayerState.ENDED,
      playing: api.PlayerState.PLAYING,
      paused: api.PlayerState.PAUSED,
    };

    player = new api.Player(host, {
      width: '200',
      height: '113',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0,
        listType: 'playlist',
        list: musicPlaylist.id,
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          applyVolume();
          player?.cuePlaylist(musicPlaylist.id, 0, 0);
          syncTrackUi();
        },
        onStateChange: (event) => {
          syncTrackUi();
          if (event.data === playerState.playing) {
            state.isPlaying = true;
          }
          if (event.data === playerState.paused) {
            state.isPlaying = false;
          }
          updatePlayIcon();
        },
      },
    });
  });

  window.setInterval(syncProgress, 500);
};
