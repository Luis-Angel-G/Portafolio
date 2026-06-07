import { avatars } from '../data';
import { state } from '../state';
import type { ProfilePanel } from '../types';
import { updateAvatar, updateProfilePanel, updateSeasonProgress } from './domUpdates';

const isProfilePanel = (value: string | undefined): value is Exclude<ProfilePanel, 'none'> =>
  value === 'facts' || value === 'tech';

export const bindProfile = () => {
  document.querySelectorAll<HTMLElement>('[data-avatar]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedAvatar = Math.max(0, Math.min(avatars.length - 1, Number(button.dataset.avatar)));
      updateAvatar();
      updateProfilePanel();
      updateSeasonProgress();
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-profile-panel]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!isProfilePanel(button.dataset.profilePanel)) return;

      const idx = state.selectedAvatar;
      const current = state.profilePanels[idx] ?? 'none';
      state.profilePanels[idx] =
        current === button.dataset.profilePanel
          ? 'none'
          : (button.dataset.profilePanel as Exclude<ProfilePanel, 'none'>);
      updateProfilePanel();
      updateSeasonProgress();
    });
  });
};