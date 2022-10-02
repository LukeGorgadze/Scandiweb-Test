import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: {
        currOn: false,
        cartOn: false,
        currentPath: "all"
    }
}

export const navBarSlice = createSlice({
    name: "navPanel",
    initialState,
    reducers: {
        setCurrOn:(state,action) => {
            state.value = {...state.value,currOn:action.payload}
        },
        setCartOn:(state,action) => {
            state.value = {...state.value,cartOn:action.payload}
        },
        setCurrentPath:(state,action)=>{
            state.value = {...state.value,currentPath:action.payload}
        }

    }
})

export const {setCartOn,setCurrOn,setCurrentPath} = navBarSlice.actions
export default navBarSlice.reducer