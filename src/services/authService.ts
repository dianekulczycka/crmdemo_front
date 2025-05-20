import axios, {AxiosResponse} from "axios";
import {IAuthResponse} from "../interfaces/auth/IAuthResponse";
import {IAuthRequest} from "../interfaces/auth/IAuthRequest";
import {getRefreshToken, setAccessToken, setRefreshToken} from "./tokenService";
import {BASE_URL} from "./consts";

export const login = async (authData: IAuthRequest): Promise<void> => {
    try {
        const response: AxiosResponse<IAuthResponse> = await axios.post(
            `${BASE_URL}/auth/login`,
            authData,
            {headers: {"Content-Type": "application/json"}}
        );
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
    } catch (error) {
        console.error("Error auth", error);
        throw new Error("Auth fail");
    }
};

export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = getRefreshToken();
    try {
        const response: AxiosResponse<IAuthResponse> = await axios.post(
            `${BASE_URL}/auth/refresh-token`,
            {refreshToken},
            {headers: {"Content-Type": "application/json"}}
        );

        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);

        return response.data.accessToken;
    } catch (error) {
        console.error("Error refresh token", error);
        return null;
    }
};