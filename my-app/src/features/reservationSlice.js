import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: ["selena"]
}

export const reservationsSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        addReservation: (state,action) => {
            state.value.push(action.payload)
        },
        removeReservation:(state,action) => {
            state.value.splice(action.payload,1)
        }
    }
})
export const {addReservation,removeReservation} = reservationsSlice.actions
export default reservationsSlice.reducer