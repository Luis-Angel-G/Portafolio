import { bindNavigation } from './navigation';
import { initMusicPlayer } from './music';
import { bindProfile } from './profile';
import { bindProjects } from './projects';
import { initThreeEnergy } from './threeEnergy';
import { initVisitors } from '../services/visitors';
import { initPerfMeter } from '../components/status';
import { initGithubStats } from '../services/github';
import { subscribe } from '../state';
import { updateVisibleScreens, updateNav, updateVisitorText, updateProjectList, updateSeasonProgress, updateProjectDetails, updateAvatar, updateProfilePanel, updatePlayingState } from './domUpdates';

export const bootApp = () => {
  bindNavigation();
  bindProjects();
  bindProfile();
  initMusicPlayer();
  initVisitors();
  initPerfMeter();
  void initThreeEnergy();
  void initGithubStats();
  
  // Subscribe to store changes and sync UI
  subscribe(() => {
    updateVisibleScreens();
    updateNav();
    updateVisitorText();
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
  updateVisitorText();
  updateProjectList();
  updateSeasonProgress();
  updateProjectDetails();
  updateAvatar();
  updateProfilePanel();
  updatePlayingState();
};