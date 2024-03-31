import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    appState: "register"
}

const appSateSlice = createSlice({
    name: "appSate",
    initialState,
    reducers: {
        setAppState(state, action){
            state.appState = action.payload
        }
    }
})

export const {setAppState} = appSateSlice.actions
export default appSateSlice.reducer