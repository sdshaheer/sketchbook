import { createSlice } from '@reduxjs/toolkit'
import { TOOLS } from '@/constants'

const initialState = {
    activeToolItem: TOOLS.PENCIL,
    actionToolItem: null
}

export const toolSlice = createSlice({
    name: 'tool',
    initialState,
    reducers: {
        toolItemClick: (state, action) => {
            state.activeToolItem = action.payload
        },
        actionItemClick: (state, action) => {
            state.actionToolItem = action.payload
        }
    }
})

export const { toolItemClick, actionItemClick } = toolSlice.actions

export default toolSlice.reducer