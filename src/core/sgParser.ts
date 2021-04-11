import { CommentType } from "./commentType";
import { PhotoComment, UnparsedComment, Vote, VoteComment } from "./models";
import { ParserImpl } from "./parser";

export class SGParser extends ParserImpl {
    private voteCount: number
    constructor(voteCount = 5) {
        super();
        this.voteCount = voteCount;
    }


    public isStartVoting(comment: UnparsedComment): boolean {

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
        throw new Error(`Comment ${JSON.stringify(comment, null, 2)} is not in the expected form.`)
    }

    public parseVote(comment: UnparsedComment): VoteComment {
        const normalized = comment.Content.toLowerCase()
            .replace(/ '/g, '')
            .replace(/\r/g, '')
            .replace(/\n/g, '');

        const votePatternUnit = '(?:#([0-9]+))'
        const regexp = new RegExp(votePatternUnit.repeat(this.voteCount));
        if (!regexp.test(normalized))
            throw new Error(`Comment ${JSON.stringify(comment, null, 2)} is not in the expected vote form.`);

        const match = regexp.exec(normalized);
        if (!match)
            throw new Error(`Comment ${JSON.stringify(comment, null, 2)} is not in the expected vote form.`);
        const votedPhotos = match.map(Number.parseInt);
        const votes = votedPhotos.map((ph, i) => ({PhotoNumber: ph, Points: this.voteCount - i}));

        return {...comment, Type: CommentType.VOTE, Votes: votes};
    }
}