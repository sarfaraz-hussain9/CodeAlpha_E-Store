import { configureStore } from "@reduxjs/toolkit";
import { apislice } from "../api/apiSlice";

// reducer
import authReducer from "../api/auth";

 const store=configureStore({
    reducer: { 
        auth: authReducer,
        [apislice.reducerPath]: apislice.reducer,
    },

    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apislice.middleware),
    devTools:true,
})

export default store;