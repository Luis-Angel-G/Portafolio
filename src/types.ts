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
  phase: string;
  actionLabel: string;
  target: SectionId;
  value: number;
  label: string;
};

export type ProfilePanel = 'none' | 'skills' | 'tech';
