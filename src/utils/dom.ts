import type { SectionId } from '../types';

export const tagRow = (items: string[]) => items.map((item) => `<span>${item}</span>`).join('');

export const screenClass = (id: SectionId, activeSection: SectionId, extra = '') =>
  `screen ${extra} ${activeSection === id ? 'active-screen' : ''}`.trim();
