import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: []
}

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        addCustomer: (state,action) => {
            state.value.push(action.payload)
        },
        addFoodToCustomer: (state,action) => {
            console.log("In add food customer")
            state.value.forEach(customer => {
                console.log("In add food customer loop")
                if(customer.id === action.payload.id){
                    customer.food.push(action.payload.food)
                }
            })
        }
    }
})
export const {addCustomer,addFoodToCustomer} = customerSlice.actions
export default customerSlice.reducer