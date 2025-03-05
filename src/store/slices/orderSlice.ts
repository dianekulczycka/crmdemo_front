import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {IOrder} from "../../interfaces/order/IOrder";
import {IOrderPaginationResponse} from "../../interfaces/order/IOrderPaginationResponse";
import {getAllOrdersPaginated} from "../../services/getAllOrdersPaginated";

interface IOrderSlice {
    ordersPaginated: IOrder[];
    page: number;
    itemsPerPage: number;
    isLoaded: boolean;
    error: string | undefined;
    total: number;
    nextPage: number | null;
    prevPage: number | null;
}

const initialState: IOrderSlice = {
    ordersPaginated: [],
    page: 1,
    itemsPerPage: 25,
    isLoaded: false,
    error: "",
    total: 0,
    nextPage: null,
    prevPage: null,
};

export const loadAllOrders = createAsyncThunk(
    'order/loadOrders',
    async ({ page, itemsPerPage }: { page: number; itemsPerPage: number }, thunkAPI) => {
        try {
            const response: IOrderPaginationResponse = await getAllOrdersPaginated(page, itemsPerPage);
            return thunkAPI.fulfillWithValue(response);
        } catch (e) {
            const error: AxiosError = e as AxiosError;
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setItemsPerPage(state, action: PayloadAction<number>) {
            state.itemsPerPage = action.payload;
        },
        clearOrders(state) {
            state.ordersPaginated = [];
            state.total = 0;
            state.nextPage = null;
            state.prevPage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllOrders.fulfilled, (state, action: PayloadAction<IOrderPaginationResponse>) => {
                const {data, total, nextPage, prevPage} = action.payload;
                state.ordersPaginated = data;
                state.total = total;
                state.nextPage = nextPage;
                state.prevPage = prevPage;
                state.isLoaded = true;
            })
            .addCase(loadAllOrders.rejected, (state, {error: {message}}) => {
                console.log(`Failed to load orders. ${message}`);
                state.isLoaded = false;
                state.error = message;
            });
    }
});

export const orderActions = {
    ...orderSlice.actions,
    loadAllOrders,
};
