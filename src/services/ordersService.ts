import axios, {AxiosResponse} from "axios";
import {getAccessToken} from "./tokenService";
import {refreshAccessToken} from "./authService";
import {BASE_URL} from "./consts";
import {IOrdersPaginated} from "../interfaces/order/IOrderPaginated";
import {IOrder} from "../interfaces/order/IOrder";
import {ISearchParams} from "../interfaces/order/ISearchParams";

axios.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export const getAllOrders = async (params: ISearchParams): Promise<IOrdersPaginated> => {
    try {
        const response: AxiosResponse<IOrdersPaginated> = await axios.get(`${BASE_URL}/orders/`, {params});
        return response.data;
    } catch (error) {
        console.error("Failed to get orders", error);
        throw error;
    }
};

export const getAllGroupNames = async (): Promise<string[]> => {
    try {
        const response: AxiosResponse<string[]> = await axios.get(`${BASE_URL}/groups/`);
        return response.data;
    } catch (error) {
        console.error("Failed to get group names", error);
        throw error;
    }
};

export const editOrder = async (id: number, data: IOrder): Promise<void> => {
    const token = getAccessToken();
    try {
        await axios.put(`${BASE_URL}/orders/order/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    } catch (error) {
        console.error('Error editing order', error);
        throw error;
    }
};