import { navItems } from '../data';
import { state } from '../state';

export const Navigation = () => `
  <header class="top-nav">
    <nav aria-label="Navegacion principal">
      ${navItems
        .map(
          (item) =>
            `<button type="button" data-nav="${item.id}" class="${item.id === state.activeSection ? 'active' : ''}">${item.label}</button>`
        )
        .join('')}
    </nav>
  </header>
`;
