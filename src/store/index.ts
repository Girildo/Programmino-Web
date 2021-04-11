import Vue from 'vue';
import Vuex, { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';
import { state, State } from "./state";
import { Mutations, mutations } from './mutations/mutations';
import { Actions, actions } from "./actions/actions";

Vue.use(Vuex)

export default new VuexStore({
  state,
  mutations,
  actions
});

export type Store = Omit<
  VuexStore<State>,
  'commit'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};