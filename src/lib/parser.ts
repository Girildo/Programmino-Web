import { PhotoComment, UnparsedComment, VoteComment } from "./models";


export interface Parser {
    parsePhoto: (comment: UnparsedComment) => PhotoComment;
    parseVote: (comment: UnparsedComment) => VoteComment;
    isStopVotingComment: (comment: UnparsedComment) => boolean;
}