import { configureStore } from "@reduxjs/toolkit";
import { apislice } from "../api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";

// reducer
import authReducer from "../api/auth";
import cartSliceReducer from "../api/cart"

 const store=configureStore({
    reducer: { 
        auth: authReducer,
        cart: cartSliceReducer,
        [apislice.reducerPath]: apislice.reducer,
    },

    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apislice.middleware),
    devTools:true,
})

setupListeners(store.dispatch);
export default store;