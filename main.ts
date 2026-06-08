import './src/styles/base.css';
import './src/styles/career.css';
import './src/styles/lobby.css';
import './src/styles/missions.css';
import './src/styles/musicplayer.css';
import './src/styles/nav.css';
import './src/styles/profile.css';
import './src/styles/status.css';
import { renderApp } from './src/components/app';
import { bootApp } from './src/controllers';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing #root mount element');
}

renderApp(root);
bootApp();