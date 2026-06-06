import { BackgroundLayer, StatusPanel } from './status';
import { CareerScreen } from './career';
import { LobbyScreen, ProjectFloatingList } from './lobby';
import { MissionsScreen } from './missions';
import { Navigation } from './nav';
import { ProfileScreen } from './profile';
import { state } from '../state';

export const renderApp = (root: HTMLElement) => {
  root.innerHTML = `
    <main class="app-shell" data-active-section="${state.activeSection}">
      ${Navigation()}
      ${StatusPanel()}
      ${BackgroundLayer()}
      ${LobbyScreen()}
      ${ProjectFloatingList()}
      ${ProfileScreen()}
      ${MissionsScreen()}
      ${CareerScreen()}
      <footer class="footer-bar">
        <a href="https://github.com/Luis-Angel-G" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/luis-angel-gir%C3%B3n-ar%C3%A9valo-0b185a321/" target="_blank" rel="noreferrer">LinkedIn</a>
      </footer>
    </main>
  `;
};
