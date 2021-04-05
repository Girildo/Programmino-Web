import { CommentType } from "./commentType";
import { PhotoComment, UnparsedComment, Vote, VoteComment } from "./models";
import { ParserImpl } from "./Parser";

export class SGParser extends ParserImpl {
    /**
     *
     */

    private voteCount: number
    constructor(voteCount = 5) {
        super();
        this.voteCount = voteCount;
    }


    public isStopVotingComment(comment: UnparsedComment): boolean {

        const text = comment.Content;
        const normalized = text.toLowerCase()
            .replace(/ '/g, '')
            .replace(/\r/g, '')
            .replace(/\n/g, '');

        return /#########/.test(text);
    }

    public parsePhoto(comment: UnparsedComment): PhotoComment {
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
    }

    public parseVote(comment: UnparsedComment): VoteComment {

        const pattern = `(?:#(\d+)){${this.voteCount}}`
        const regexp = new RegExp(pattern);

        if (!regexp.test(comment.Content))
            throw new Error(`Comment ${comment} is not in the expected form.`);

        const match = comment.Content.match(regexp)?.[0] ?? '';
        const votePattern = /(?:#(\d+))/;
        const groups = votePattern.exec(match);
        const votedPhotos = groups?.map(Number.parseInt);

        const votes: Vote[] = votedPhotos?.map((ph, i) => ({ PhotoNumber: ph, Points: this.voteCount - i })) ?? []

        return { ...comment, Type: CommentType.VOTE, Votes: votes }
    }
}