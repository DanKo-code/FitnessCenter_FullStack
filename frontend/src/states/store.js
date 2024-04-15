import {configureStore} from "@reduxjs/toolkit"
import appSateSliceReducer from "./storeSlice/appStateSlice"
import mainComponentsSliceReducer from "./storeSlice/mainComponentsSlice"

const store = configureStore({

    reducer: {
        appSateSliceMode : appSateSliceReducer,
        mainComponentsSliceMode : mainComponentsSliceReducer
    },
})

export default store;