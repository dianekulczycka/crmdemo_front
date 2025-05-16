import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

const HeaderComponent: FC = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");
    const isAdmin = role === "ROLE_ADMIN";

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="d-flex justify-content-end align-items-center bg-success-subtle shadow-sm">
            <ul className="d-flex flex-row align-items-center w-auto list-unstyled mb-0">
                <li className="pe-2 ps-2"><p className="fs-5 m-auto">Current user: {username} </p></li>
                {isAdmin && <li>
                    <button className="btn btn-success m-2 fs-6">cPanel</button>
                </li>}
                <li>
                    <button className="btn btn-outline-success m-2 fs-6" onClick={handleLogout}>Log out</button>
                </li>
            </ul>
        </div>
    );
};

export default HeaderComponent;
