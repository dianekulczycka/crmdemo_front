import React, {FC, useState} from 'react';
import {IAuthRequest} from "../interfaces/user/IAuthRequest";
import {login} from "../services/authService";

interface IProps {
    onRegister: (accessToken: string, refreshToken: string) => void;
}

const AuthFormComponent: FC<IProps> = ({onRegister}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegister = async (): Promise<void> => {
        try {
            const authData: IAuthRequest = {email, password};
            const response = await login(authData);
            onRegister(response.accessToken, response.refreshToken);
        } catch (error) {
            alert("Login failed. Please try again.");
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <input
                className="m-2"
                type="email"
                value={"admin@gmail.com"}
                onChange={(ev) => setEmail(ev.target.value)}
                required
            />
            <input
                className="m-2"
                type="password"
                value={"admin"}
                onChange={(ev) => setPassword(ev.target.value)}
                required
            />
            <button
                onClick={handleRegister}
                className="btn btn-success m-2">
                Login
            </button>
        </div>
    );
};

export default AuthFormComponent;