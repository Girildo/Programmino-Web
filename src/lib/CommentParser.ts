import { CommentType } from "./CommentType";


const SG = {
    photoPattern: /(?:#(\d)+){1}/,
    startVotePattern: /#########/,
    votePattern: /(?:#(\d)+){5}/
}


export function ParseCommentType(text: string): CommentType {
    const normalized = text.toLowerCase()
    .replaceAll(' ', '')
    .replaceAll('\r', '')
    .replaceAll('\n', '');

    const patterns = SG;
    console.log(normalized);

    if (patterns.startVotePattern.test(normalized))
        return CommentType.START_VOTING;
    else if (patterns.votePattern.test(normalized))
        return CommentType.VOTE;
    else if (patterns.photoPattern.test(normalized))
        return CommentType.PHOTO;
    else
        return CommentType.IGNORE;
}