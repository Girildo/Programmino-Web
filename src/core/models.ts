import { CommentType } from "./commentType";

export type UnparsedComment = {
    AuthorID: string;
    AuthorName: string;
    Content: string;
    ID: string;
}

export type ParsedComment = Omit<UnparsedComment, 'Content'> & {
    Type: CommentType,
}

export type VoteComment = ParsedComment & {
    Votes: Vote[];
}

export type PhotoComment = ParsedComment & {
    Number: number,
    PhotoURL: string,
}

export type Vote = {
    PhotoNumber: number;
    Points: number;
    Table?: Table;
}

export type Table = {
    Name: string;
}
