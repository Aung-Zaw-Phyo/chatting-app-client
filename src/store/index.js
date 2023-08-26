import {
    configureStore
} from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import privateSlice from './private-slice'
import groupSlice from './group-slice'


const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        private: privateSlice.reducer,
        group: groupSlice.reducer
    }
})

export default store