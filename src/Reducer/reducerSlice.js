import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'Posts',
    initialState : {
        list : [],
        loading : false
    },

    reducers:{
        postsRequested: (Posts, action) => {
            Posts.loading = true
        },

        postsReceived: (posts, action) => {
            posts.list = action.payload;
            posts.loading = false
        },

        postsRequestFailed: (posts, action) => {
            posts.loading = false;
        } 
    }
})

export default slice.reducer;


export const {postsRequested, postsReceived, postsRequestFailed} = slice.actions;

const url = "/expenses-tracker.json";

export const loadPosts = () => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url,
            onStart: postsRequested.type,
            onSuccess: postsReceived.type,
            onError: postsRequestFailed.type
        })
    )
}