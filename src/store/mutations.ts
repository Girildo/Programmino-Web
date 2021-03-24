import { MutationTree } from "vuex";
import { MutationTypes } from "./MutationTypes";
import { state, State } from "./state";
import Axios from "axios";

export type Mutations<S = State> = {
    [MutationTypes.FETCH_COMMENTS](state: S, payload: { groupId: string; topicId: string }): void;
}

const client = Axios.create({
    baseURL: 'https://www.flickr.com/services/rest/',
    responseType: 'json'
});

client.interceptors.request.use(req => {
    req.params = { ...req.params, 'api_key': '00b9cc2a3bf5e2896905d1fd621a20eb', 'format':'json', 'nojsoncallback': '1' }
    return req;
})


export const mutations: MutationTree<State> & Mutations = {
    FETCH_COMMENTS: async function (state, payload) {
        state.fetchingComments = true;
        const res = await client.get('/', {
            params: {
                method: 'flickr.groups.discuss.replies.getList',
                'group_id': payload.groupId,
                'topic_id': payload.topicId,
            }
        })
        state.unparsedComments = (res.data.replies.reply as any[]).map(u => ({
            AuthorID: u.author,
            AuthorName: u.authorname,
            Content: u.message._content,
            ID: u.id,
        } as FlickrComment))
        state.fetchingComments = false;
    }
}