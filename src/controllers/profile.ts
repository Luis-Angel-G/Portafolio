import { avatars } from '../data';
import { state, setState } from '../state';
import type { ProfilePanel } from '../types';
import { updateAvatar, updateProfilePanel, updateSeasonProgress } from './domUpdates';

const isProfilePanel = (value: string | undefined): value is Exclude<ProfilePanel, 'none'> =>
  value === 'facts' || value === 'tech';

export const bindProfile = () => {
  document.querySelectorAll<HTMLElement>('[data-avatar]').forEach((button) => {
    button.addEventListener('click', () => {
      const sel = Math.max(0, Math.min(avatars.length - 1, Number(button.dataset.avatar)));
      setState({ selectedAvatar: sel });
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
      const next =
        current === button.dataset.profilePanel
          ? 'none'
          : (button.dataset.profilePanel as Exclude<ProfilePanel, 'none'>);
      setState({ profilePanels: { ...(state.profilePanels || {}), [idx]: next } });
      updateProfilePanel();
      updateSeasonProgress();
    });
  });
};