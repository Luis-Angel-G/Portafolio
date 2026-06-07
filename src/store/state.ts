import type { ProfilePanel, SectionId, AppState } from '../types';

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
  projectRowsVisible: 0,
  profilePanels: {} as Record<number, ProfilePanel>,
  completedMissions: new Set<string>(),
  projectTab: 'repo',
};