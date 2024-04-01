import {configureStore} from "@reduxjs/toolkit"
import appSateSliceReducer from "./storeSlice/appStateSlice"

const store = configureStore({



    reducer: {
        appSateSliceMode : appSateSliceReducer
    },
})

export default store;