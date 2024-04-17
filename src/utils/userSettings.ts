import type { Store } from '~store';

export function getUserModel(store: Store) {
  return store.getState().settings.model;
}
