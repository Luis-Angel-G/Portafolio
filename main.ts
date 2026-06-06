import './src/global.css';
import { renderApp } from './src/components/app';
import { bootApp } from './src/controllers';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing #root mount element');
}

renderApp(root);
bootApp();
