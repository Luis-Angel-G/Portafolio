import { icon } from '../icons';
import { state } from '../state';
import { formatVisitorCount } from '../utils';

export const StatusPanel = () => `
  <aside class="status-panel" aria-label="Estado del portafolio">
    <p>Estado: Online</p>
    <span>60 FPS | 24ms</span>
    <div>${icon('users')}<strong data-visitor-status>${formatVisitorCount(state.visitorCount)}</strong><small data-visitor-label>${state.visitorStatus}</small></div>
    <div>${icon('wifi')}<strong>Vite</strong><small>Conexion</small></div>
  </aside>
`;

export const BackgroundLayer = () => `
  <div class="background-layer" aria-hidden="true">
    <img src="./assets/backgrounds/lobby-energy-stadium.png" alt="">
    <span class="background-vignette"></span>
  </div>
`;
