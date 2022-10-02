import {configureStore} from '@reduxjs/toolkit'
import darkPanelSliceReducer from '../features/darkPanelSlice'
import navBarSliceReducer from '../features/navBarSlice'
import currencySliceReducer from '../features/currencySlice'
import metaSliceReducer from '../features/metaSlice'
import cartSliceReducer from '../features/cartSlice'
export const store = configureStore({
    reducer: {
        darkPanel:darkPanelSliceReducer,
        navBar: navBarSliceReducer,
        currency: currencySliceReducer,
        metaData: metaSliceReducer,
        cart:cartSliceReducer
    }
})