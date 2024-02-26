import { configureStore } from '@reduxjs/toolkit'
import toolReducer from '@/slice/toolSlice'
import colorReducer from '@/slice/colorSlice'

export const store = configureStore({
    reducer: {
        tool: toolReducer,
        color: colorReducer
    }
})