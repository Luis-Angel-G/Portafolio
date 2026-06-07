import { state } from '../state';
import { asRecord, getVisitorApiUrl, readNumber } from '../utils';
import { updateVisitorText } from './domUpdates';

// ─── Shared helpers ───────────────────────────────────────────────────────────

const setVisitorCount = (count: number, status: string) => {
  state.visitorCount = Math.max(0, Math.round(count));
  state.visitorStatus = status;
  updateVisitorText();
};

// ─── API mode (when VITE_VISITOR_API_URL is set) ─────────────────────────────

const initVisitorApi = (apiUrl: string) => {
  const baseUrl = apiUrl.replace(/\/$/, '');
  const visitorId = window.sessionStorage.getItem('victory-grid-visitor-id') || crypto.randomUUID();
  window.sessionStorage.setItem('victory-grid-visitor-id', visitorId);

  const readCount = async () => {
    const response = await fetch(`${baseUrl}/total`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Visitor API ${response.status}`);
    const payload = asRecord(await response.json());
    const count = readNumber(payload?.total) || readNumber(payload?.count) || readNumber(payload?.visitors);
    if (!count) throw new Error('Visitor API payload missing count');
    setVisitorCount(count, 'VISITAS TOTALES');
  };

  const register = () =>
    fetch(`${baseUrl}/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: visitorId, page: window.location.pathname }),
    }).catch(() => undefined);

  void register().then(readCount).catch(() => setVisitorCount(0, 'SIN CONEXIÓN'));
};

// ─── Local mode (no API — uses localStorage as shared counter) ────────────────
//
// Strategy:
//   • Each unique browser gets a UUID stored in localStorage under
//     'victory-grid-uid'. This persists across sessions (unlike sessionStorage).
//   • A separate key 'victory-grid-total' holds an integer: the highest
//     uid-index ever seen. Each new uid increments it.
//   • Result: the counter climbs every time a genuinely new visitor opens the
//     page, and never goes down. Existing visitors don't add to the count on
//     repeat visits.
//
// Limitation: local-only — each browser has its own counter, so the number
// won't sync across devices. To get a real cross-device total you'd need a
// small backend (Supabase, KV, etc.). This is the best we can do client-only.

const initLocalVisitors = () => {
  const UID_KEY   = 'victory-grid-uid';
  const TOTAL_KEY = 'victory-grid-total';

  // Get or create a stable uid for this browser
  let uid = window.localStorage.getItem(UID_KEY);
  const isNewVisitor = !uid;
  if (!uid) {
    uid = crypto.randomUUID();
    window.localStorage.setItem(UID_KEY, uid);
  }

  // Read current total
  const storedTotal = parseInt(window.localStorage.getItem(TOTAL_KEY) ?? '0', 10);
  const currentTotal = Number.isFinite(storedTotal) && storedTotal > 0 ? storedTotal : 0;

  let newTotal = currentTotal;
  if (isNewVisitor) {
    newTotal = currentTotal + 1;
    window.localStorage.setItem(TOTAL_KEY, String(newTotal));
  }

  setVisitorCount(newTotal, 'VISITANTES');

  // Listen for updates from other tabs / windows (different browsers won't
  // trigger this, but multiple tabs in the same browser will stay in sync)
  window.addEventListener('storage', (event) => {
    if (event.key === TOTAL_KEY && event.newValue) {
      const updated = parseInt(event.newValue, 10);
      if (Number.isFinite(updated) && updated > 0) {
        setVisitorCount(updated, 'VISITANTES');
      }
    }
  });
};

// ─── Entry point ─────────────────────────────────────────────────────────────

export const initVisitors = () => {
  const visitorApiUrl = getVisitorApiUrl();
  if (visitorApiUrl) {
    initVisitorApi(visitorApiUrl);
  } else {
    initLocalVisitors();
  }
};