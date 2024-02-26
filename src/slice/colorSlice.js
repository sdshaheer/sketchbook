import { createSlice } from '@reduxjs/toolkit'
import { TOOLS, COLORS } from '@/constants'

const initialState = {
    [TOOLS.PENCIL]: {
        color: COLORS.BLACK,
        size: 3
    },
    [TOOLS.ERASER]: {
        color: COLORS.WHITE,
        size: 3
    },
    [TOOLS.ERASEALL]: {},
    [TOOLS.UNDO]: {},
    [TOOLS.REDO]: {},
    [TOOLS.DOWNLOAD]: {},
}

export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        changeColor: (state, action) => {
            state[action.payload.item].color = action.payload.color
        },
        changeBrushSize: (state, action) => {
            state[action.payload.item].size = action.payload.size
        }
    }
})

export const { changeColor, changeBrushSize } = colorSlice.actions

export default colorSlice.reducer