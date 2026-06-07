import type { ProfilePanel, SectionId, AppState } from './types';

export const state: AppState = {
  activeSection: 'proyectos',
  selectedProject: 0,
  selectedAvatar: 0,
  visitorCount: 0,
  visitorStatus: 'Conectando',
  visitedSections: new Set<SectionId>(['proyectos']),
  currentTrack: 0,
  isPlaying: false,
  isMuted: false,
  volume: 72,
  projectListOpen: false,
  // row visibility for project list (0 = closed)
  projectRowsVisible: 0,
  // per-avatar panel state: index -> panel ('none' | 'facts' | 'tech')
  profilePanels: {} as Record<number, ProfilePanel>,
};
