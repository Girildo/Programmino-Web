import Vue from 'vue';
import Vuex, { Store as VuexStore, CommitOptions } from 'vuex'
import { state, State } from "./state";
import { Mutations, mutations } from './mutations';

Vue.use(Vuex)

export default new VuexStore({
  state,
  mutations
})

export type Store = Omit<
  VuexStore<State>,
  'commit'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};