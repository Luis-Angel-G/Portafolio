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
} from './domUpdates';

export const bootApp = () => {
  bindNavigation();
  bindProjects();
  bindProfile();
  bindProjectTabs();
  initMusicPlayer();
  initPerfMeter();
  void initThreeEnergy();
  void initGithubStats();

  // Subscribe to store changes and sync UI
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

  // Initial sync
  updateVisibleScreens();
  updateNav();
  updateProjectList();
  updateSeasonProgress();
  updateProjectDetails();
  updateAvatar();
  updateProfilePanel();
  updatePlayingState();
};