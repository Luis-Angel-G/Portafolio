const iconPaths: Record<string, string> = {
  arrow: 'M4 12h14M12 5l7 7-7 7',
  pause: 'M8 5v14M16 5v14',
  play: 'M8 5l11 7-11 7V5z',
  skipBack: 'M19 5v14L9 12l10-7zM5 5v14',
  skipForward: 'M5 5v14l10-7L5 5zM19 5v14',
  users:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  volume: 'M5 9v6h4l5 4V5L9 9H5zM18 9a4 4 0 0 1 0 6',
  volumeOff: 'M5 9v6h4l5 4V5L9 9H5zM18 9l4 6M22 9l-4 6',
  wifi: 'M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M12 20h.01',
};

export const icon = (name: string) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${iconPaths[name] ?? iconPaths.arrow}"></path></svg>`;
