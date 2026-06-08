import { projects } from '../data';
import { state, setState } from '../state';
import { updateProjectDetails, updateProjectList, updateSeasonProgress } from './domUpdates';
import { scrollToTarget } from './navigation';

function getCardRowHeight(): number {
  const card = document.querySelector<HTMLElement>('.project-float-card');
  if (!card) return 160;
  const style = getComputedStyle(document.querySelector<HTMLElement>('.project-float-list')!);
  const gap = parseFloat(style.gap || style.rowGap || '16');
  return card.getBoundingClientRect().height + (isNaN(gap) ? 16 : gap);
}

function applyRowVisibility(rows: number) {
  const list = document.querySelector<HTMLElement>('.project-float-list');
  if (!list) return;

  if (rows <= 0) {
    list.style.maxHeight = '0px';
    list.style.opacity = '0';
    list.style.pointerEvents = 'none';
    list.style.transform = 'translateY(8px)';
    return;
  }

  const rowH = getCardRowHeight();
  const peek = rowH * 0.42;
  const height = rowH * rows + peek;

  list.style.maxHeight = `${height}px`;
  list.style.opacity = '1';
  list.style.pointerEvents = 'auto';
  list.style.transform = 'translateY(0)';
}

function getTotalRows(): number {
  const list = document.querySelector<HTMLElement>('.project-float-list');
  if (!list) return 1;
  const rowH = getCardRowHeight();
  if (rowH <= 0) return 1;
  const peek = rowH * 0.42;
  const effectiveHeight = Math.max(0, list.scrollHeight - peek);
  return Math.max(1, Math.ceil(effectiveHeight / rowH));
}

// ─── State helpers ────────────────────────────────────────────────────────────

function rows(): number {
  return state.projectRowsVisible ?? 0;
}

function openRows(n: number) {
  const maxRows = getTotalRows();
  const newRows = Math.min(Math.max(n, 0), maxRows);
  setState({ projectRowsVisible: newRows, projectListOpen: newRows > 0 });
  applyRowVisibility(newRows);
  updateProjectList();
  updateSeasonProgress();
  const listEl = document.querySelector<HTMLElement>('.project-float-list');
  if (listEl) {
    if (newRows >= maxRows) listEl.classList.add('full-open');
    else listEl.classList.remove('full-open');
  }
}

export function closeList() {
  setState({ projectRowsVisible: 0, projectListOpen: false });
  applyRowVisibility(0);
  updateProjectList();
  updateSeasonProgress();
  const listEl = document.querySelector<HTMLElement>('.project-float-list');
  listEl?.classList.remove('full-open');
}

const selectProject = (index: number) => {
  const sel = Math.max(0, Math.min(projects.length - 1, index));
  setState({ selectedProject: sel });
  closeList();
  updateProjectDetails();
  updateProjectList();
  updateSeasonProgress();
  scrollToTarget('proyectos');
};

// ─── Bind ─────────────────────────────────────────────────────────────────────

export const bindProjects = () => {
  setState({ projectRowsVisible: 0 });

  const THRESHOLD  = 18;
  const COOLDOWN   = 300;
  let   wheelReady = true;

  const cooldown = () => {
    wheelReady = false;
    setTimeout(() => { wheelReady = true; }, COOLDOWN);
  };

  // Toggle button
  document.querySelector<HTMLElement>('[data-open-projects]')?.addEventListener('click', () => {
    rows() > 0 ? closeList() : openRows(1);
  });

  window.addEventListener('wheel', (e) => {
    if (state.activeSection !== 'proyectos') return;
    if (Math.abs(e.deltaY) < THRESHOLD) return;

    const r   = rows();
    const max = getTotalRows();

    if (e.deltaY > 0) {
      e.preventDefault();
      if (!wheelReady) return;
      cooldown();

      if (r === 0) {
        openRows(1);
      } else if (r < max) {
        openRows(r + 1); 
      }
    } else {
      if (r === 0) return;
      e.preventDefault();
      if (!wheelReady) return;
      cooldown();

      if (r > 0) openRows(r - 1);
    }
  }, { passive: false });

  // ── Touch ─────────────────────────────────────────────────────────────────
  let touchStartY: number | null = null;

  window.addEventListener('touchstart', (e) => {
    if (state.activeSection !== 'proyectos') return;
    touchStartY = e.touches[0]?.clientY ?? null;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (state.activeSection !== 'proyectos' || touchStartY === null) return;
    const endY  = e.changedTouches[0]?.clientY ?? touchStartY;
    const delta = touchStartY - endY;
    touchStartY = null;

    if (Math.abs(delta) < 36) return;

    const r   = rows();
    const max = getTotalRows();

    if (delta > 0) {
      // Swipe up
      if (r < max) openRows(r === 0 ? 1 : r + 1);
      else closeList();
    } else {
      // Swipe down
      if (r > 0) openRows(r - 1);
    }
  }, { passive: true });

  document.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('[data-project]');
    if (card) selectProject(Number(card.dataset.project));
  });
};