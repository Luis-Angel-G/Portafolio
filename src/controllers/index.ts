import { bindNavigation } from './navigation';
import { initMusicPlayer } from './music';
import { bindProfile } from './profile';
import { bindProjects } from './projects';
import { initThreeEnergy } from './threeEnergy';
import { initVisitors } from './visitors';

export const bootApp = () => {
  bindNavigation();
  bindProjects();
  bindProfile();
  initMusicPlayer();
  initVisitors();
  void initThreeEnergy();
};
