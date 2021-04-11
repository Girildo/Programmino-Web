import { ParsedComment, PhotoComment, UnparsedComment, VoteComment } from "./models";
export type ParserType = 'SG' | 'CTC' | null;

export abstract class ParserImpl {
    
    abstract parsePhoto(comment: UnparsedComment): PhotoComment;
    abstract parseVote(comment: UnparsedComment): VoteComment;
    abstract isStartVoting(comment: UnparsedComment): boolean;
}