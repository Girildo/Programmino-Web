import { PhotoComment, UnparsedComment, VoteComment } from "./models";


export interface Parser {
    parsePhoto: (comment: UnparsedComment) => PhotoComment;
    parseVote: (comment: UnparsedComment) => VoteComment;
    isStopVotingComment: (comment: UnparsedComment) => boolean;
}

export abstract class ParserImpl implements Parser
{
    public abstract parsePhoto(comment: UnparsedComment): PhotoComment;
    public abstract parseVote(comment: UnparsedComment): VoteComment;
    public abstract isStopVotingComment(comment: UnparsedComment): boolean;
}