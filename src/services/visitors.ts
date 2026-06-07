import { state, setState } from '../state';
import { asRecord, getVisitorApiUrl, readNumber } from '../utils';
import { updateVisitorText } from '../controllers/domUpdates';

const setVisitorCount = (count: number, status: string) => {
  setState({ visitorCount: Math.max(0, Math.round(count)), visitorStatus: status });
  updateVisitorText();
};

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

const initLocalVisitors = () => {
  const UID_KEY   = 'victory-grid-uid';
  const TOTAL_KEY = 'victory-grid-total';

  let uid = window.localStorage.getItem(UID_KEY);
  const isNewVisitor = !uid;
  if (!uid) {
    uid = crypto.randomUUID();
    window.localStorage.setItem(UID_KEY, uid);
  }

  const storedTotal = parseInt(window.localStorage.getItem(TOTAL_KEY) ?? '0', 10);
  const currentTotal = Number.isFinite(storedTotal) && storedTotal > 0 ? storedTotal : 0;

  let newTotal = currentTotal;
  if (isNewVisitor) {
    newTotal = currentTotal + 1;
    window.localStorage.setItem(TOTAL_KEY, String(newTotal));
  }

  setVisitorCount(newTotal, 'VISITANTES');

  window.addEventListener('storage', (event) => {
    if (event.key === TOTAL_KEY && event.newValue) {
      const updated = parseInt(event.newValue, 10);
      if (Number.isFinite(updated) && updated > 0) {
        setVisitorCount(updated, 'VISITANTES');
      }
    }
  });
};

export const initVisitors = () => {
  const visitorApiUrl = getVisitorApiUrl();
  if (visitorApiUrl) {
    initVisitorApi(visitorApiUrl);
  } else {
    initLocalVisitors();
  }
};
