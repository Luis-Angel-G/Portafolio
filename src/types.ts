export type SectionId = 'proyectos' | 'who-i-am' | 'misiones' | 'carrera';

export type Project = {
  title: string;
  mode: string;
  summary: string;
  stack: string[];
  reward: string;
  url: string;       // repo (GitHub)
  demo?: string;     // live demo URL (opcional)
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
  visitorCount: number;
  visitorStatus: string;
  visitedSections: Set<SectionId>;
  currentTrack: number;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  projectListOpen: boolean;
  projectRowsVisible?: number;
  profilePanels: Record<number, ProfilePanel>;
  completedMissions: Set<string>;
  projectTab: 'repo' | 'demo'; // qué pestaña de acción está activa en el lobby
  repoClicked: boolean;        // el usuario hizo clic en "Ver Proyecto" al menos una vez
  demoClicked: boolean;        // el usuario hizo clic en "Ver Demo" al menos una vez
};