import { configureStore } from "@reduxjs/toolkit"
import mathFactsReducer from './mathFactsSlice'

const store = configureStore({
    reducer: {
        facts: mathFactsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
