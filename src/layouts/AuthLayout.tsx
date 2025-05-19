import React, {FC} from "react";
import {Outlet} from "react-router-dom";

const AuthLayout: FC = () => {
    const isAuthed: boolean = !!localStorage.getItem("accessToken");

    return (
        <>
            {!isAuthed && <Outlet/>}
        </>
    );
};

export default AuthLayout;