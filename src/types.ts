export type SectionId = 'proyectos' | 'who-i-am' | 'misiones' | 'carrera';

export type Project = {
  title: string;
  mode: string;
  summary: string;
  stack: string[];
  reward: string;
  url?: string;
  demo?: string;
  preview: string;
};

export type MusicTrack = {
  title: string;
  artist: string;
  videoId: string;
  duration: number;
};

export type AvatarFact = {
  icon: string;
  label: string;
  value: string;
};

export type Avatar = {
  name: string;
  role: string;
  face: string;
  full: string;
  bioTitle: string;
  bioText: string;
  stats: {
    value: string;
    label: string;
  }[];
};

export type CareerEntry = {
  year: string;
  title: string;
  text: string;
};

export type MissionProgress = {
  key: string;
  title: string;
  description: string;
  phase: string;
  actionLabel: string;
  target: SectionId;
  value: number;
  label: string;
  xpReward: string;
  completed: boolean;
  justCompleted: boolean;
};

// 'skills' → 'facts'
export type ProfilePanel = 'none' | 'facts' | 'tech';

export type AppState = {
  activeSection: SectionId;
  selectedProject: number;
  selectedAvatar: number;
  visitedSections: Set<SectionId>;
  currentTrack: number;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  projectListOpen: boolean;
  projectRowsVisible?: number;
  profilePanels: Record<number, ProfilePanel>;
  completedMissions: Set<string>;
  projectTab: 'repo' | 'demo';
  repoClicked: boolean;
  demoClicked: boolean;
};