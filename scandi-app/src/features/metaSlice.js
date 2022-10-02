import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: {
        id: "",
        products: [],
        counter:0
    }
    
}

export const metaSlice = createSlice({
    name: "darkPanel",
    initialState,
    reducers: {
        // openDarkPanel: (state,action) => {
        //     state.value = true
        // },
        // closeDarkPanel: (state,action) => {
        //     state.value = false
        // },
        setProducts: (state,action) => {
            state.value.products = action.payload
        },
        setId: (state,action) => {
            state.value.id = action.payload
        },
        incCounter: (state,action) => {
            console.log()
            state.value.counter += 1
        }
    }
})

export const {setProducts,setId,incCounter} = metaSlice.actions
export default metaSlice.reducer