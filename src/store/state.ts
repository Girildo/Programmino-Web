// Reference article: https://dev.to/3vilarthas/vuex-typescript-m4j
import { UnparsedComment, ParsedComment } from "@/core/models";
import { ParserType } from "@/core/parser";

export const state = {
    fetchingComments: false,
    unparsedComments: [] as UnparsedComment[],
    parsedComments: [] as ParsedComment[],
    parserType: null as ParserType,
    votesPerUser: 5,
    contestRules: {
        allowSelfVote: false,
        requireHavingAPhoto: true,
        creatorMustParticipate: true,
    }
}

export type State = typeof state