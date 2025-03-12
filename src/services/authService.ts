import axios, {AxiosResponse} from "axios";
import {IAuthResponse} from "../interfaces/manager/IAuthResponse";
import {IAuthRequest} from "../interfaces/manager/IAuthRequest";
import {getRefreshToken, setAccessToken, setRefreshToken} from "./tokenService";

const BASE_URL: string = "http://localhost:8080/v1/api";

export const login = async (authData: IAuthRequest): Promise<IAuthResponse> => {
    try {
        const response: AxiosResponse<IAuthResponse> = await axios.post(
            `${BASE_URL}/auth/login`,
            authData,
            {headers: {"Content-Type": "application/json"}}
        );

        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);

        return response.data;
    } catch (error) {
        console.error("Error during auth:", error);
        throw new Error("Auth failed");
    }
};

export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token found");

        const response: AxiosResponse<IAuthResponse> = await axios.post(
            `${BASE_URL}/auth/refresh-token`,
            {refreshToken},
            {headers: {"Content-Type": "application/json"}}
        );

        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);

        return response.data.accessToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};