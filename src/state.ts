import type { ProfilePanel, SectionId } from './types';

export const state = {
  activeSection: 'proyectos' as SectionId,
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
  // per-avatar panel state: index -> panel ('none' | 'skills' | 'tech')
  profilePanels: {} as Record<number, ProfilePanel>,
};
