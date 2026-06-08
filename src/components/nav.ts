// src/components/nav.ts
import { navItems } from '../data';
import { state } from '../state';

export const Navigation = () => `
  <header class="top-nav">
    <nav aria-label="Navegación principal" role="navigation">
      ${navItems
        .map(
          (item) => `
            <button
              type="button"
              data-nav="${item.id}"
              role="link"
              aria-current="${item.id === state.activeSection ? 'page' : 'false'}"
              class="${item.id === state.activeSection ? 'active' : ''}"
            >${item.label}</button>`
        )
        .join('')}
    </nav>
  </header>
`;