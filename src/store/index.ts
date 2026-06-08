import type { AppState } from '../types';
import { state as internalState } from './state';

type Subscriber = (prev: AppState, next: AppState) => void;

const subscribers: Subscriber[] = [];

export const getState = () => internalState;

export const setState = (patch: Partial<AppState>) => {
  const prev = { ...internalState } as AppState;
  Object.assign(internalState, patch);
  subscribers.forEach((s) => s(prev, internalState));
  return internalState;
};

export const subscribe = (cb: Subscriber) => {
  subscribers.push(cb);
  return () => {
    const i = subscribers.indexOf(cb);
    if (i !== -1) subscribers.splice(i, 1);
  };
};

export const state = internalState;