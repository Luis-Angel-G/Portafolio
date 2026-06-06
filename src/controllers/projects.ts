import { projects } from '../data';
import { state } from '../state';
import { updateProjectDetails, updateProjectList, updateSeasonProgress } from './domUpdates';
import { scrollToTarget } from './navigation';

const setProjectListOpen = (open: boolean) => {
  state.activeSection = 'proyectos';
  state.visitedSections.add('proyectos');
  state.projectListOpen = open;
  updateProjectList();
  updateSeasonProgress();
};

const selectProject = (index: number) => {
  state.selectedProject = Math.max(0, Math.min(projects.length - 1, index));
  state.projectListOpen = false;
  updateProjectDetails();
  updateProjectList();
  updateSeasonProgress();
  scrollToTarget('proyectos');
};

export const bindProjects = () => {
  const projectsSection = document.getElementById('proyectos');
  let touchStartY: number | null = null;

  document.querySelector<HTMLElement>('[data-open-projects]')?.addEventListener('click', () => {
    setProjectListOpen(!state.projectListOpen);
  });

  projectsSection?.addEventListener(
    'wheel',
    (event) => {
      if (state.activeSection !== 'proyectos') return;

      if (event.deltaY > 20 && !state.projectListOpen) {
        event.preventDefault();
        setProjectListOpen(true);
      }

      if (event.deltaY < -20 && state.projectListOpen) {
        event.preventDefault();
        setProjectListOpen(false);
      }
    },
    { passive: false }
  );

  projectsSection?.addEventListener(
    'touchstart',
    (event) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    },
    { passive: true }
  );

  projectsSection?.addEventListener(
    'touchmove',
    (event) => {
      if (state.activeSection !== 'proyectos' || touchStartY === null) return;
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - currentY;

      if (delta > 42 && !state.projectListOpen) {
        setProjectListOpen(true);
        touchStartY = currentY;
      }

      if (delta < -42 && state.projectListOpen) {
        setProjectListOpen(false);
        touchStartY = currentY;
      }
    },
    { passive: true }
  );

  document.querySelectorAll<HTMLElement>('[data-project]').forEach((button) => {
    button.addEventListener('click', () => selectProject(Number(button.dataset.project)));
  });
};
