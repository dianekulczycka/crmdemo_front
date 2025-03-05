import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

const MainLayout: FC = () => {
    return (
        <div className="fs-6 mx-5">
            <HeaderComponent/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;