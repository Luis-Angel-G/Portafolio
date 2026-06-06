import type { SectionId } from './types';

export const formatCount = (value: number) => value.toLocaleString('es-GT');

export const formatVisitorCount = (value: number) => (value > 0 ? formatCount(value) : '--');

export const formatTime = (value: number) => {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = Math.floor(safe % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const tagRow = (items: string[]) => items.map((item) => `<span>${item}</span>`).join('');

export const screenClass = (id: SectionId, activeSection: SectionId, extra = '') =>
  `screen ${extra} ${activeSection === id ? 'active-screen' : ''}`.trim();

export const readString = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : '');

export const readNumber = (value: unknown) => {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

export const asRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

export const getVisitorApiUrl = () => import.meta.env.VITE_VISITOR_API_URL || '';
