import { bindNavigation } from './navigation';
import { initMusicPlayer } from './music';
import { bindProfile } from './profile';
import { bindProjects } from './projects';
import { initThreeEnergy } from './threeEnergy';
import { initPerfMeter } from '../components/status';
import { initGithubStats } from '../services/github';
import { subscribe } from '../state';
import {
  updateVisibleScreens,
  updateNav,
  updateProjectList,
  updateSeasonProgress,
  updateProjectDetails,
  updateAvatar,
  updateProfilePanel,
  updatePlayingState,
  bindProjectTabs,
  bindProjectLinkTracking,
} from './domUpdates';

export const bootApp = () => {
  bindNavigation();
  bindProjects();
  bindProfile();
  bindProjectTabs();
  bindProjectLinkTracking();
  initMusicPlayer();
  initPerfMeter();
  void initThreeEnergy();
  void initGithubStats();

  // Suscribirse a cambios del store y sincronizar la UI
  subscribe(() => {
    updateVisibleScreens();
    updateNav();
    updateProjectList();
    updateSeasonProgress();
    updateProjectDetails();
    updateAvatar();
    updateProfilePanel();
    updatePlayingState();
  });

  // Sincronización inicial
  updateVisibleScreens();
  updateNav();
  updateProjectList();
  updateSeasonProgress();
  updateProjectDetails();
  updateAvatar();
  updateProfilePanel();
  updatePlayingState();
};