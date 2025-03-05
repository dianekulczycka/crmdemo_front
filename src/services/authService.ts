import {IAuthRequest} from "../interfaces/user/IAuthRequest";
import {IAuthResponse} from "../interfaces/user/IAuthResponse";
import axios, {AxiosResponse} from "axios";

export const login = async (authData: IAuthRequest): Promise<IAuthResponse> => {
    try {
        const response: AxiosResponse<IAuthResponse> = await axios.post(
            "http://localhost:8080/v1/api/auth/login",
            authData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error during auth:", error);
        throw new Error("Auth failed");
    }
};
