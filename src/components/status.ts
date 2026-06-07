import { icon } from '../icons';
import { state } from '../state';
import { formatVisitorCount } from '../utils';

// ─── Component HTML ───────────────────────────────────────────────────────────

export const StatusPanel = () => `
  <aside class="status-panel" aria-label="Estado del portafolio">
    <p>Estado: Online</p>
    <span data-fps-ms>-- FPS | --ms</span>
    <div>
      ${icon('users')}
      <strong data-visitor-status>${formatVisitorCount(state.visitorCount)}</strong>
      <small>Visitantes</small>
    </div>
  </aside>
`;

export const BackgroundLayer = () => `
  <div class="background-layer" aria-hidden="true">
    <img src="./assets/backgrounds/lobby-energy-stadium.png" alt="">
    <span class="background-vignette"></span>
  </div>
`;

// ─── Real FPS / frame-time meter using requestAnimationFrame ─────────────────
//
// Measures the gap between consecutive rAF callbacks. Smooths over 30 frames
// so the number doesn't flicker on every tick.

export const initPerfMeter = () => {
  const el = document.querySelector<HTMLElement>('[data-fps-ms]');
  if (!el) return;

  const WINDOW = 30; // frames to average
  const times: number[] = [];
  let last = 0;

  const tick = (now: number) => {
    if (last > 0) {
      const delta = now - last;
      times.push(delta);
      if (times.length > WINDOW) times.shift();

      const avg = times.reduce((a, b) => a + b, 0) / times.length;
      const fps = Math.round(1000 / avg);
      const ms  = avg.toFixed(1);
      el.textContent = `${fps} FPS | ${ms}ms`;
    }
    last = now;
    window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
};