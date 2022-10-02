import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: false
}

export const darkPanelSlice = createSlice({
    name: "darkPanel",
    initialState,
    reducers: {
        openDarkPanel: (state,action) => {
            state.value = true
        },
        closeDarkPanel: (state,action) => {
            state.value = false
        },
    }
})

export const {openDarkPanel,closeDarkPanel} = darkPanelSlice.actions
export default darkPanelSlice.reducer