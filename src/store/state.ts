export const state = {
    fetchingComments: false,
    unparsedComments: [] as FlickrComment[]
}

export type State = typeof state