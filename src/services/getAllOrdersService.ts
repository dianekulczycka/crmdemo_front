import axios from "axios";
import {getAccessToken} from "./tokenService";
import {refreshAccessToken} from "./authService";

const BASE_URL: string = "http://localhost:8080/v1/api";

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

export const getAllOrdersService = async (page: number, order: string, direction: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/orders`, {
            params: {page, order, direction}
        });
        return response.data;
    } catch (error) {
        console.error("Failed to get orders", error);
        throw error;
    }
};