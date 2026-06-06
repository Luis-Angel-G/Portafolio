import { state } from '../state';
import { asRecord, getVisitorApiUrl, readNumber } from '../utils';
import { updateVisitorText } from './domUpdates';

const setVisitorCount = (count: number, status: string) => {
  state.visitorCount = Math.max(0, Math.round(count));
  state.visitorStatus = status;
  updateVisitorText();
};

const initVisitorApi = (apiUrl: string) => {
  const baseUrl = apiUrl.replace(/\/$/, '');
  const visitorId = window.sessionStorage.getItem('victory-grid-visitor-id') || crypto.randomUUID();
  window.sessionStorage.setItem('victory-grid-visitor-id', visitorId);

  const readCount = async () => {
    const response = await fetch(`${baseUrl}/live`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Visitor API ${response.status}`);
    const payload = asRecord(await response.json());
    const count = readNumber(payload?.count) || readNumber(payload?.active) || readNumber(payload?.visitors);
    if (!count) throw new Error('Visitor API payload missing count');
    setVisitorCount(count, 'EN VIVO API');
  };

  const join = () =>
    fetch(`${baseUrl}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: visitorId, page: window.location.pathname }),
    }).catch(() => undefined);

  const leave = () => {
    const payload = JSON.stringify({ id: visitorId, page: window.location.pathname });
    navigator.sendBeacon?.(`${baseUrl}/leave`, new Blob([payload], { type: 'application/json' }));
  };

  void join().then(readCount).catch(() => setVisitorCount(0, 'API sin respuesta'));
  const timer = window.setInterval(() => {
    void join().then(readCount).catch(() => setVisitorCount(state.visitorCount, 'Reconectando'));
  }, 8000);

  window.addEventListener('pagehide', () => {
    window.clearInterval(timer);
    leave();
  });
};

const initLocalVisitors = () => {
  const key = 'victory-grid-live-visitors';
  const ttl = 18000;
  const visitorId = window.sessionStorage.getItem('victory-grid-visitor-id') || crypto.randomUUID();
  window.sessionStorage.setItem('victory-grid-visitor-id', visitorId);

  const readRoster = () => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(key) || '{}') as Record<string, number>;
      const now = Date.now();
      return Object.fromEntries(Object.entries(parsed).filter(([, expires]) => expires > now));
    } catch {
      return {};
    }
  };

  const touch = () => {
    const roster = readRoster();
    roster[visitorId] = Date.now() + ttl;
    window.localStorage.setItem(key, JSON.stringify(roster));
    setVisitorCount(Object.keys(roster).length, 'EN VIVO LOCAL');
  };

  touch();
  const timer = window.setInterval(touch, 5000);
  window.addEventListener('storage', (event) => {
    if (event.key === key) {
      setVisitorCount(Object.keys(readRoster()).length, 'EN VIVO LOCAL');
    }
  });
  window.addEventListener('pagehide', () => {
    const roster = readRoster();
    delete roster[visitorId];
    window.localStorage.setItem(key, JSON.stringify(roster));
    window.clearInterval(timer);
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
