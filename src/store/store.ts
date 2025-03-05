import {configureStore} from "@reduxjs/toolkit";
import {orderSlice} from "./slices/orderSlice";

export const store = configureStore({
    reducer: {
        orders: orderSlice.reducer
    },
});