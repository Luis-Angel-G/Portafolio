import { navItems } from '../data';
import { state, setState } from '../state';
import type { SectionId } from '../types';
import { updateNav, updateProjectList, updateSeasonProgress, updateVisibleScreens } from './domUpdates';
import { closeList } from './projects';

const isSectionId = (target: string): target is SectionId => navItems.some((item) => item.id === target);

export const scrollToTarget = (target: string) => {
  if (!isSectionId(target)) return;

  const visited = new Set([...state.visitedSections, target]);
  const updates: Record<string, unknown> = { activeSection: target, visitedSections: visited };
  if (target !== 'proyectos' || state.activeSection !== 'proyectos') {
    closeList();
  }
  setState(updates as any);

  updateNav();
  updateVisibleScreens();
  updateProjectList();
  updateSeasonProgress();
};

export const bindNavigation = () => {
  document.querySelectorAll<HTMLElement>('[data-nav], [data-scroll]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.nav ?? button.dataset.scroll;
      if (!target) return;
      scrollToTarget(target);
      if (button.dataset.scroll === 'proyectos') {
        setState({ projectListOpen: true });
        updateProjectList();
        updateSeasonProgress();
      }
    });
  });
};
