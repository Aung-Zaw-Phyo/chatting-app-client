import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    tempMsg: null,
    isLoading: false,
    error: null,
    initial: true
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        chatInit(state, action) {
            state.messages = action.payload
            state.isLoading = false
            state.error = null
            state.initial = true
        },
        addMessage(state, action) {
            state.initial = false
            state.isLoading = false
            state.tempMsg = null
            const message = action.payload
            const cp_msgs = [...state.messages]
            const result_msgs = cp_msgs.concat(message)
            state.messages = result_msgs
        },
        paginateMessage(state, action) {
            const messages = action.payload
            const cp_msgs = [...state.messages]
            const result_msgs = messages.concat(cp_msgs)
            state.messages = result_msgs
        },
        addTempMsg(state, action) {
            state.tempMsg = action.payload
            state.isLoading = true
        },
        setError(state, action) {
            state.isLoading = false
            state.tempMsg = null
            state.error = action.payload
        }
    }
})

export const chatActions = chatSlice.actions

export default chatSlice