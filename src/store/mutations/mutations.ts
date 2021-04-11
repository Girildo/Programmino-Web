import { MutationTree } from "vuex";
import { MutationTypes } from "./mutationTypes";
import { State } from "../state";
import { ParsedComment, UnparsedComment } from "@/core/models";

export type Mutations<S = State> = {
    [MutationTypes.SET_PARSER_TYPE](state: S, payload: { groupId: string }): void;
    [MutationTypes.SET_PARSED_COMMENTS](state: S, payload: State['parsedComments']): void;
    [MutationTypes.SET_UNPARSED_COMMENTS](state: S, payload: State['unparsedComments']): void;
    [MutationTypes.SET_FETCHING_COMMENTS](state: S, payload: State['fetchingComments']): void;
    [MutationTypes.SET_VOTES_PER_USER](state: S, payload: State['votesPerUser']): void;
    [MutationTypes.SET_CONTEST_RULES](state: S, payload: Partial<State['contestRules']>): void;
}

function setParserType(state: State, payload: { groupId: string }) {
    switch (payload.groupId) {
        case '1744262@N24':
            state.parserType = 'SG';
            break;
        case 'clickthecontest':
            state.parserType = 'CTC';
            break;
        default:
            state.parserType = null;
            break;
    }
}

function setParsedComments(state: State, payload: ParsedComment[]) {
    state.parsedComments.splice(0, state.parsedComments.length);
    state.parsedComments.push(...payload);
}

function setUnparsedComments(state: State, payload: UnparsedComment[]) {
    state.unparsedComments.splice(0, state.parsedComments.length);
    state.unparsedComments.push(...payload);
}

function setContestRules(state: State, payload: Partial<State['contestRules']>) {
    type keys = keyof State['contestRules'];

    for (const prop in state.contestRules) {
        if (Object.prototype.hasOwnProperty.call(payload, prop)) {
            state.contestRules[prop as keys] = payload[prop as keys]!;
        }
    }
}

export const mutations: MutationTree<State> & Mutations = {
    SET_PARSER_TYPE: setParserType,
    SET_PARSED_COMMENTS: setParsedComments,
    SET_UNPARSED_COMMENTS: setUnparsedComments,
    SET_FETCHING_COMMENTS: (state, payload) => { state.fetchingComments = payload; },
    SET_VOTES_PER_USER: (state, payload) => { state.votesPerUser = payload; },
    SET_CONTEST_RULES: setContestRules,
}