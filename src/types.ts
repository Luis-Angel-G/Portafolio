export type SectionId = 'proyectos' | 'who-i-am' | 'misiones' | 'carrera';

export type Project = {
  title: string;
  mode: string;
  summary: string;
  stack: string[];
  reward: string;
  url: string;
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
  facts: AvatarFact[];
};

export type CareerEntry = {
  year: string;
  title: string;
  text: string;
};

export type MissionProgress = {
  key: string;
  title: string;
  phase: string;
  actionLabel: string;
  target: SectionId;
  value: number;
  label: string;
};

// 'skills' → 'facts'
export type ProfilePanel = 'none' | 'facts' | 'tech';