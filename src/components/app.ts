import { BackgroundLayer, StatusPanel } from './status';
import { CareerScreen } from './career';
import { LobbyScreen, ProjectFloatingList } from './lobby';
import { MissionsScreen } from './missions';
import { Navigation } from './nav';
import { ProfileScreen } from './profile';
import { state } from '../state';

type Component = (() => string) | (() => HTMLElement);

export const renderApp = (root: HTMLElement) => {
  const main = document.createElement('main');
  main.className = 'app-shell';
  main.setAttribute('data-active-section', state.activeSection);

  // ── Global toast container — lives outside any screen so it shows always ──
  const toastContainer = document.createElement('div');
  toastContainer.className = 'mission-toast-container';
  toastContainer.setAttribute('aria-live', 'polite');
  toastContainer.setAttribute('aria-label', 'Notificaciones de misión');
  main.appendChild(toastContainer);

  const components: Component[] = [
    Navigation,
    StatusPanel,
    BackgroundLayer,
    LobbyScreen as any,
    ProjectFloatingList as any,
    ProfileScreen,
    MissionsScreen,
    CareerScreen,
  ];

  components.forEach((comp) => {
    const out = (comp as any)();
    if (typeof out === 'string') {
      const tmp = document.createElement('div');
      tmp.innerHTML = out;
      while (tmp.firstChild) main.appendChild(tmp.firstChild);
    } else if (out instanceof HTMLElement) {
      main.appendChild(out);
    }
  });

  // footer
  const footer = document.createElement('div');
  footer.innerHTML = `
    <footer class="footer-bar">
      <a href="https://github.com/Luis-Angel-G" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/luis-angel-gir%C3%B3n-ar%C3%A9valo-0b185a321/" target="_blank" rel="noreferrer">LinkedIn</a>
    </footer>
  `;
  while (footer.firstChild) main.appendChild(footer.firstChild as Node);

  root.innerHTML = '';
  root.appendChild(main);
};