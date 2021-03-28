import { MutationTree } from "vuex";
import { MutationTypes } from "./MutationTypes";
import { State } from "../state";
import { fetchComments } from "./fetchComments";

export type Mutations<S = State> = {
    [MutationTypes.FETCH_COMMENTS](state: S, payload: { groupId: string; topicId: string }): void;
}

export const mutations: MutationTree<State> & Mutations = {
    FETCH_COMMENTS: fetchComments
}