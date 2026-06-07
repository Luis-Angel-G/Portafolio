import { state } from './state';
import type { MissionProgress } from './types';

export const getMissionProgress = (): MissionProgress[] => {
  const projectOpened   = state.projectListOpen || state.selectedProject > 0;
  const projectSwitched = state.selectedProject > 0;
  const profileVisited  = state.visitedSections.has('who-i-am');
  const avatarChanged   = state.selectedAvatar > 0;
  const careerVisited   = state.visitedSections.has('carrera');
  const misionesVisited = state.visitedSections.has('misiones');
  const musicPlaying    = state.isPlaying;
  const allSections     = state.visitedSections.size >= 4;

  const make = (
    key: string,
    phase: string,
    title: string,
    description: string,
    actionLabel: string,
    target: import('./types').SectionId,
    value: number,
    label: string,
    xpReward: string,
  ): MissionProgress => {
    const wasCompleted = state.completedMissions.has(key);
    const isNowComplete = value >= 100;
    const justCompleted = isNowComplete && !wasCompleted;
    return { key, phase, title, description, actionLabel, target, value, label, xpReward, completed: isNowComplete, justCompleted };
  };

  return [
    make(
      'projects',
      'Fase 1 · Reconocimiento',
      'Abrir lista de proyectos',
      'Despliega el menú flotante haciendo scroll o presionando el botón en la pantalla de Proyectos.',
      'Ver proyectos',
      'proyectos',
      projectOpened ? 100 : 55,
      projectOpened ? 'Lista abierta' : 'Pendiente',
      '+2,500 XP',
    ),
    make(
      'project-switch',
      'Fase 1 · Reconocimiento',
      'Seleccionar un proyecto',
      'Haz clic en cualquier tarjeta de la lista flotante para cambiar el proyecto activo.',
      'Explorar proyectos',
      'proyectos',
      projectSwitched ? 100 : 30,
      projectSwitched ? 'Proyecto elegido' : 'Sin seleccionar',
      '+3,000 XP',
    ),
    make(
      'who',
      'Fase 2 · Identidad',
      'Leer Who I Am',
      'Visita la sección de perfil para conocer al desarrollador detrás del portafolio.',
      'Ver perfil',
      'who-i-am',
      profileVisited ? 100 : 35,
      profileVisited ? 'Perfil leído' : 'Sin revisar',
      '+2,000 XP',
    ),
    make(
      'avatar',
      'Fase 2 · Identidad',
      'Cambiar de avatar',
      'Selecciona la skin alterna en la taquilla del portafolio para descubrir al desarrollador real.',
      'Ir a skins',
      'who-i-am',
      avatarChanged ? 100 : 50,
      avatarChanged ? 'Skin alterna activa' : 'Boltrex activo',
      '+1,500 XP',
    ),
    make(
      'career',
      'Fase 3 · Ruta',
      'Revisar Mi Camino a Unreal',
      'Explora la sección de carrera: timeline educativo, tech stack y estadísticas de GitHub en vivo.',
      'Ver carrera',
      'carrera',
      careerVisited ? 100 : 25,
      careerVisited ? 'Ruta explorada' : 'Bloqueada',
      '+2,500 XP',
    ),
    make(
      'misiones',
      'Fase 3 · Ruta',
      'Visitar la pantalla de Misiones',
      'Llega a esta pantalla para ver tu progreso de temporada y las misiones activas.',
      'Ver misiones',
      'misiones',
      misionesVisited ? 100 : 0,
      misionesVisited ? 'Misiones abiertas' : 'No visitada',
      '+1,000 XP',
    ),
    make(
      'music',
      'Fase 4 · Ambiente',
      'Reproducir la música del lobby',
      'Activa el reproductor integrado y deja que la playlist ambie tu experiencia.',
      'Ir al lobby',
      'proyectos',
      musicPlaying ? 100 : 20,
      musicPlaying ? 'Playlist activa' : 'Silencio',
      '+1,000 XP',
    ),
    make(
      'explorer',
      'Fase 4 · Maratón',
      'Explorador completo',
      'Visita las cuatro secciones del portafolio: Proyectos, Who I Am, Misiones y Carrera.',
      'Explorar todo',
      'proyectos',
      allSections ? 100 : Math.round((state.visitedSections.size / 4) * 100),
      allSections ? '¡Todo explorado!' : `${state.visitedSections.size}/4 secciones`,
      '+5,000 XP',
    ),
  ];
};

export const getMissionAverage = () => {
  const missions = getMissionProgress();
  return Math.round(missions.reduce((total, mission) => total + mission.value, 0) / missions.length);
};