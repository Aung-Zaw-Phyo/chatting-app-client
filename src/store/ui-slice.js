import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: false,
    chat: true,
    group_chat: false,
    emojiPicker: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        showProfile(state, action) {
            state.profile = true
            state.chat = false
            state.group_chat = false
        },
        showChat(state, action) {
            state.chat = true
            state.profile = false
            state.group_chat = false
        },
        showGroupChat(state, action) {
            state.group_chat = true
            state.profile = false
            state.chat = false
        },
        emojiPickerHandler(state, action) {
            if(action.payload === 'SHOW') {
                if(state.emojiPicker === false) {
                    state.emojiPicker = true
                }
            }
            if(action.payload === 'HIDE') {
                if(state.emojiPicker === true) {
                    state.emojiPicker = false
                }
            }
        }
    }
})


export const uiActions = uiSlice.actions

export default uiSlice