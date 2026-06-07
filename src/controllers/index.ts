import { bindNavigation } from './navigation';
import { initMusicPlayer } from './music';
import { bindProfile } from './profile';
import { bindProjects } from './projects';
import { initThreeEnergy } from './threeEnergy';
import { initVisitors } from './visitors';
import { initPerfMeter } from '../components/status';

export const bootApp = () => {
  bindNavigation();
  bindProjects();
  bindProfile();
  initMusicPlayer();
  initVisitors();
  initPerfMeter();
  void initThreeEnergy();
};