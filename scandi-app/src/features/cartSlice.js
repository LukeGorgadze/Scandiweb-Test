import { createSlice } from "@reduxjs/toolkit"

const cartItemsOld = localStorage.getItem('CartItems');
let r = JSON.parse(cartItemsOld);

const initialState = {
    value: {
        cartItems: r?.Items ? r.Items : [],
        totalCount: 0
    }
}

let countQuantity = (cartItems) => {
    let quantityList = cartItems?.map(item => {
        return item?.quantity
    })
    // console.log(quantityList)
    let num = quantityList?.reduce((prevValue, currValue) => {
        return prevValue + currValue
    }, 0)
    return num
}

export const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const cartItemsOld = localStorage.getItem('CartItems');
            let r = JSON.parse(cartItemsOld);
            console.log(r, "read old cartitems")
            let oldItems;
            if (r?.Items) {
                oldItems = r.Items;
            } else {
                oldItems = []
            }
            // console.log(oldItems)
            let check = oldItems?.some(item => item.uniqueId === action.payload.uniqueId)
            let res;
            // console.log(check)
            if (check) {
                console.log(action.payload, "InCartSlice if")
                res = oldItems.map(item => {
                    if (item.uniqueId === action.payload.uniqueId) {
                        item.quantity += 1
                        item.allVals = action.payload.allVals

                    }
                    return item
                })
                console.log(res, "AEEEEEE")
            }
            else {
                console.log(action.payload, "InCartSlice else")
                let newItem = { ...action.payload, quantity: 1, allVals: action.payload.allVals }
                oldItems.push(newItem)
                console.log(action.payload)
                res = oldItems
                // console.log(res)
            }
            console.log(res, "res object cartslice")
            state.value = { cartItems: res }
            const cartItems = { Items: res }
            localStorage.setItem('CartItems', JSON.stringify(cartItems));

        },
        removeFromCart: (state, action) => {
            const cartItemsOld = localStorage.getItem('CartItems');
            let r = JSON.parse(cartItemsOld);
            // console.log(r, "read old cartitems")
            let oldItems;
            if (r?.Items) {
                oldItems = r.Items;
            } else {
                oldItems = []
            }
            // console.log(oldItems)
            let check = oldItems?.some(item => item.uniqueId === action.payload.uniqueId)
            let res = [];
            // console.log(check)
            if (check) {
                for (var i = 0; i < oldItems.length; i++) {
                    console.log(oldItems[i])
                    if (oldItems[i].uniqueId === action.payload.uniqueId) {
                        if (oldItems[i].quantity > 1) {
                            let item = oldItems[i];
                            item.quantity -= 1
                            res.push(item)
                        }
                    } else {
                        if (oldItems[i].quantity >= 1) {
                            res.push(oldItems[i])
                        }
                    }
                }

                console.log(res, "After for")

                // console.log(res, "AEEEEEE")
            }

            // console.log(res, "res object cartslice")
            state.value = { cartItems: res }
            const cartItems = { Items: res }
            localStorage.setItem('CartItems', JSON.stringify(cartItems));
        
        },
        emptyCart: (state, action) => {
            state.value = { cartItems: [] }
            const cartItems = { Items: [] }
            localStorage.setItem('CartItems', JSON.stringify(cartItems))
    
        }

    }
})

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions
export default cartSlice.reducer