import { navItems } from '../data';
import { state } from '../state';
import type { SectionId } from '../types';
import { updateNav, updateProjectList, updateSeasonProgress, updateVisibleScreens } from './domUpdates';

const isSectionId = (target: string): target is SectionId => navItems.some((item) => item.id === target);

export const scrollToTarget = (target: string) => {
  if (!isSectionId(target)) return;

  state.activeSection = target;
  state.visitedSections.add(target);

  if (state.activeSection !== 'proyectos') {
    state.projectListOpen = false;
  }

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
        state.projectListOpen = true;
        updateProjectList();
        updateSeasonProgress();
      }
    });
  });
};
