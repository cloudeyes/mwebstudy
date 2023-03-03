// store.ts
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

export interface State {
  address?: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {},
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
