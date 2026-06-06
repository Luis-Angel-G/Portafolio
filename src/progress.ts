import { state } from './state';
import type { MissionProgress } from './types';

export const getMissionProgress = (): MissionProgress[] => {
  const projectValue = state.projectListOpen || state.selectedProject > 0 ? 100 : 55;
  const profileValue = state.visitedSections.has('who-i-am') ? 100 : 35;
  const avatarValue = state.selectedAvatar > 0 ? 100 : 50;
  const careerValue = state.visitedSections.has('carrera') ? 100 : 25;

  return [
    {
      key: 'projects',
      title: 'Abrir lista de proyectos',
      phase: 'Fase 1 de 4',
      actionLabel: 'Ver proyectos',
      target: 'proyectos',
      value: projectValue,
      label: state.projectListOpen ? 'Lista abierta' : 'Pendiente',
    },
    {
      key: 'who',
      title: 'Leer Who I Am',
      phase: 'Fase 2 de 4',
      actionLabel: 'Ver perfil',
      target: 'who-i-am',
      value: profileValue,
      label: profileValue === 100 ? 'Completa' : 'Sin revisar',
    },
    {
      key: 'avatar',
      title: 'Cambiar avatar',
      phase: 'Fase 3 de 4',
      actionLabel: 'Ir a skins',
      target: 'who-i-am',
      value: avatarValue,
      label: avatarValue === 100 ? 'Skin alterna lista' : 'Boltrex activo',
    },
    {
      key: 'career',
      title: 'Revisar Mi Camino a Unreal',
      phase: 'Mision final',
      actionLabel: 'Ver carrera',
      target: 'carrera',
      value: careerValue,
      label: careerValue === 100 ? 'Ruta vista' : 'Bloqueada',
    },
  ];
};

export const getMissionAverage = () => {
  const missions = getMissionProgress();
  return Math.round(missions.reduce((total, mission) => total + mission.value, 0) / missions.length);
};
