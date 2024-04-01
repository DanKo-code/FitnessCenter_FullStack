import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    appState: "signUp"
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