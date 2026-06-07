export const readString = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : '');

export const readNumber = (value: unknown) => {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

export const asRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

export const getVisitorApiUrl = () => import.meta.env.VITE_VISITOR_API_URL || '';
