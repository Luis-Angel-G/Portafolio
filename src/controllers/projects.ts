import { projects } from '../data';
import { state } from '../state';
import { updateProjectDetails, updateProjectList, updateSeasonProgress } from './domUpdates';
import { scrollToTarget } from './navigation';

// ─── How many rows to reveal per scroll step ──────────────────────────────────
//
// state.projectRowsVisible: 0 = closed, 1 = one row + peek, 2 = two rows + peek …
// Each scroll DOWN adds one row. Each scroll UP removes one row.
// When it goes past maxRows, the list closes.

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
  const peek = rowH * 0.42; // ~42% of next row visible
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
  // Subtract the 'peek' portion (~42% of a row) when computing total rows
  // so the partially-visible peek doesn't count as a whole extra row.
  const peek = rowH * 0.42;
  const effectiveHeight = Math.max(0, list.scrollHeight - peek);
  return Math.max(1, Math.ceil(effectiveHeight / rowH));
}

// ─── State helpers ────────────────────────────────────────────────────────────

function rows(): number {
  return ((state as any).projectRowsVisible as number) || 0;
}

function openRows(n: number) {
  const maxRows = getTotalRows();
  (state as any).projectRowsVisible = Math.min(Math.max(n, 0), maxRows);
  state.projectListOpen = (state as any).projectRowsVisible > 0;
  applyRowVisibility((state as any).projectRowsVisible);
  updateProjectList();
  updateSeasonProgress();
  // Toggle a class when fully opened so CSS can remove the fade/mask
  const listEl = document.querySelector<HTMLElement>('.project-float-list');
  if (listEl) {
    if ((state as any).projectRowsVisible >= maxRows) listEl.classList.add('full-open');
    else listEl.classList.remove('full-open');
  }
}

function closeList() {
  (state as any).projectRowsVisible = 0;
  state.projectListOpen = false;
  applyRowVisibility(0);
  updateProjectList();
  updateSeasonProgress();
  // ensure mask removed when closed
  const listEl = document.querySelector<HTMLElement>('.project-float-list');
  listEl?.classList.remove('full-open');
}

const selectProject = (index: number) => {
  state.selectedProject = Math.max(0, Math.min(projects.length - 1, index));
  closeList();
  updateProjectDetails();
  updateProjectList();
  updateSeasonProgress();
  scrollToTarget('proyectos');
};

// ─── Bind ─────────────────────────────────────────────────────────────────────

export const bindProjects = () => {
  (state as any).projectRowsVisible = 0;

  const THRESHOLD  = 18;  // minimum wheel delta to register a step
  const COOLDOWN   = 300; // ms between steps
  let   wheelReady = true;

  const cooldown = () => {
    wheelReady = false;
    setTimeout(() => { wheelReady = true; }, COOLDOWN);
  };

  // Toggle button
  document.querySelector<HTMLElement>('[data-open-projects]')?.addEventListener('click', () => {
    rows() > 0 ? closeList() : openRows(1);
  });

  // ── Wheel — attached to WINDOW so it fires regardless of hover target ──────
  // The list has overflow:hidden so no internal scroll ever competes.
  window.addEventListener('wheel', (e) => {
    if (state.activeSection !== 'proyectos') return;
    if (Math.abs(e.deltaY) < THRESHOLD) return;

    const r   = rows();
    const max = getTotalRows();

    if (e.deltaY > 0) {
      // ── DOWN ──
      e.preventDefault();
      if (!wheelReady) return;
      cooldown();

      if (r === 0) {
        openRows(1);                        // closed → show row 1 + peek
      } else if (r < max) {
        openRows(r + 1);                    // add one more row
      }
    } else {
      // ── UP ──
      if (r === 0) return;                  // already closed, let page scroll
      e.preventDefault();
      if (!wheelReady) return;
      cooldown();

      if (r > 0) openRows(r - 1);          // remove one row (0 → closeList)
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
    const delta = touchStartY - endY; // positive = swipe up = scroll down
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

  // ── Card clicks (delegated) ───────────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('[data-project]');
    if (card) selectProject(Number(card.dataset.project));
  });
};