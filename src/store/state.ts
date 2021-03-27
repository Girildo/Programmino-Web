import { UnparsedComment } from "@/lib/models";

export const state = {
    fetchingComments: false,
    unparsedComments: [] as UnparsedComment[]
}

export type State = typeof state