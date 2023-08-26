import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    users: [],
    groups: [],
    profile: false,
    chat: true,
    group_chat: false,
    isSideBar: false,
    emojiPicker: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        initUsers(state, action) {
            state.users = action.payload
        },
        initGroups(state, action) {
            state.groups = action.payload
        },
        addGroup(state, action) {
            const group = action.payload
            const cp_groups = [...state.groups]
            const result_groups = cp_groups.concat(group)
            state.groups = result_groups
        },
        removeGroup(state, action) {
            const id = action.payload
            const cp_groups = [...state.groups]
            const result_groups = cp_groups.filter(group => group.id !== id)
            state.groups = result_groups
        },
        showProfile(state, action) {
            Cookies.set('status', 'PROFILE', {expires: 46}) 
            state.profile = true
            state.chat = false
            state.group_chat = false
        },
        showChat(state, action) {
            Cookies.set('status', 'CHAT', {expires: 46})
            state.chat = true
            state.profile = false
            state.group_chat = false
        },
        showGroupChat(state, action) {
            Cookies.set('status', 'GROUPCHAT', {expires: 46})
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
        },
        sideBarChangeHandler(state, action) {
            if(action.payload) {
                state.isSideBar = true
            }
            if(!action.payload) {
                state.isSideBar = false
            }
        }
    }
})


export const uiActions = uiSlice.actions

export default uiSlice