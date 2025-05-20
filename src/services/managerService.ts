import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "./consts";
import {ICreateManagerFormData} from "../interfaces/manager/ICreateManagerFormData";
import {IManager} from "../interfaces/manager/IManager";
import {getAccessToken} from "./tokenService";
import {IPaginationResponse} from "../interfaces/order/IPaginationResponse";

export const getManagers = async (): Promise<IPaginationResponse<IManager>> => {
    try {
        const response: AxiosResponse<IPaginationResponse<IManager>> = await axios.get(`${BASE_URL}/managers?page=1`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching managers", error);
        throw error;
    }
};


export const addManager = async (data: ICreateManagerFormData): Promise<void> => {
    try {
        const response: AxiosResponse<void> = await axios.post(
            `${BASE_URL}/managers/create`,
            data,
            {headers: {Authorization: `Bearer ${getAccessToken()}`}}
        );
        return response.data;
    } catch (error) {
        console.error("Error creating manager", error);
        throw error;
    }
};