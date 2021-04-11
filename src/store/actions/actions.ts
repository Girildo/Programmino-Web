import { ActionTree, ActionContext } from "vuex";
import { State } from "../state";
import { fetchComments } from "./fetchComments";
import { ActionTypes } from "./actionTypes";
import { Mutations } from "../mutations/mutations";
import { MutationTypes } from "../mutations/mutationTypes";
import { SGParser } from "@/core/sgParser";
import { ParsedComment } from "@/core/models";


type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>

export type Actions = {
    [ActionTypes.FETCH_COMMENTS]({ commit }: AugmentedActionContext, payload: { groupId: string; topicId: string }): Promise<void>;
    [ActionTypes.PARSE_COMMENTS]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<State, State> & Actions = {
    FETCH_COMMENTS: async function ({ state, commit }, payload) {
        commit(MutationTypes.SET_FETCHING_COMMENTS, true);
        commit(MutationTypes.SET_PARSER_TYPE, {groupId: payload.groupId});
        const unparsedComments = await fetchComments(payload.groupId, payload.topicId);
        commit(MutationTypes.SET_UNPARSED_COMMENTS, unparsedComments);
        commit(MutationTypes.SET_FETCHING_COMMENTS, false);
    },

    PARSE_COMMENTS: function ({ state, commit }) {
        if (!state.parserType || state.unparsedComments.length === 0)
            throw new Error("Cannot parse!");
        const parser = new SGParser(state.votesPerUser);

        let foundStartVoting = false;
        const parsed: ParsedComment[] = [];
        for (const comment of state.unparsedComments) {
            if (parser.isStartVoting(comment)) {
                if (foundStartVoting)
                    console.error('There is a problem with the sequence of comments');
                else
                    foundStartVoting = true;
            }
            try {
                if (!foundStartVoting)
                    parsed.push(parser.parsePhoto(comment));
                else
                    parsed.push(parser.parseVote(comment));
            }
            catch(error){
                console.warn(error.message);
            }
        }
        commit(MutationTypes.SET_PARSED_COMMENTS, parsed);
    }
}