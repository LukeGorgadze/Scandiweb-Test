import { createSlice } from "@reduxjs/toolkit"

let currCurrency = localStorage.getItem('currentCurrency');
let currCurrencySymbol = localStorage.getItem('currentCurrencySymbol');
console.log(currCurrency,currCurrencySymbol,"Init currencySlice")
const initialState = {
    value: {
        currentCurrency: !currCurrency? "USD" : currCurrency ,
        currentCurrencySymbol: !currCurrencySymbol ? "$" : currCurrencySymbol
    }
}
console.log(initialState,"Init object")

export const currencySlice = createSlice({
    name: "Currency",
    initialState,
    reducers: {
        setCurrency:(state,action) => {
            state.value = {...state.value,currentCurrency:action.payload}
            localStorage.setItem('currentCurrency', action.payload);
        },
        setCurrencySymbol:(state,action) => {
            state.value = {...state.value,currentCurrencySymbol:action.payload}
            localStorage.setItem('currentCurrencySymbol', action.payload);
        }
    }
})

export const {setCurrency,setCurrencySymbol} = currencySlice.actions
export default currencySlice.reducer