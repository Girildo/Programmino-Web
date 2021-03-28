import { CommentType } from "./commentType";
import { PhotoComment, UnparsedComment, VoteComment } from "./models";
import { Parser } from "./Parser";

export const SGParser: Parser = {
    isStopVotingComment: function (comment: UnparsedComment): boolean {

        const text = comment.Content;
        const normalized = text.toLowerCase()
            .replace(/ '/g, '')
            .replace(/\r/g, '')
            .replace(/\n/g, '');

        return /#########/.test(text);
    },

    parsePhoto: function (comment: UnparsedComment): PhotoComment {
        const text = comment.Content;

        const normalized = text.toLowerCase()
            .replace(/ '/g, '')
            .replace(/\r/g, '')
            .replace(/\n/g, '');

        const pattern = /(?:#(\d+)){1}(?:.+)(?:<img.+src="(.+)")/;
        const search = pattern.exec(normalized);
        if (search?.groups && search.groups[1]) {
            const number = parseInt(search.groups[1]);
            const url = search.groups[3];
            return { ...comment, Type: CommentType.PHOTO, Number: number, PhotoURL: url }
        }
        throw new Error(`Comment ${comment} is not in the expected form.`)
    },
    parseVote: function (comment: UnparsedComment): VoteComment {
        return {...comment, Type: CommentType.VOTE, Votes: [{Points: [0], Table: {Name: 'aa'}}]}
    }


}