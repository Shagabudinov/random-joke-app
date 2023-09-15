import { configureStore } from "@reduxjs/toolkit"
import counterReducer from './counterSlice'
import mathFactsReducer from './mathFactsSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        facts: mathFactsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
