import { ParseCommentType } from "@/lib/commentParser";
import { CommentType } from "@/lib/commentType";

test('comment "gibberish #01 gibberish" resolves type PHOTO', () => {
    expect(ParseCommentType('gibberish #01 gibberish')).toBe(CommentType.PHOTO)
})

test('comment "######### START VOTING #########" resolves to type START VOTING', () => {
    expect(ParseCommentType('######### START VOTING #########')).toBe(CommentType.START_VOTING)
})

test('comment "#12 #01 #1 #4 #13" resolves to type START VOTING', () => {
    expect(ParseCommentType('#12 #01 #01 #04 #13')).toBe(CommentType.VOTE)
})