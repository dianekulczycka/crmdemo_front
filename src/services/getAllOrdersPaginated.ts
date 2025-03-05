import axios, {AxiosResponse} from "axios";
import {IOrderPaginationResponse} from "../interfaces/order/IOrderPaginationResponse";

export const getAllOrdersPaginated = async (page: number, itemsPerPage: number): Promise<IOrderPaginationResponse> => {
    try {
        let results: AxiosResponse<IOrderPaginationResponse> = await axios.get("http://localhost:8080/v1/api/", {
            params: {
                page: page,
                perPage: itemsPerPage,
            },
            headers: {
                Authorization: "Bearer " + "" }
        });
        return results.data;
    } catch (error) {
        console.error("Failed to get orders", error);
        throw error;
    }
};