import './src/base.css';
import './src/career.css';
import './src/lobby.css';
import './src/missions.css';
import './src/musicplayer.css';
import './src/nav.css';
import './src/profile.css';
import './src/status.css';
import { renderApp } from './src/components/app';
import { bootApp } from './src/controllers';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing #root mount element');
}

renderApp(root);
bootApp();
