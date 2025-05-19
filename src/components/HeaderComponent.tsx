import React, {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";

const HeaderComponent: FC = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");
    const isAdmin = role === "ROLE_ADMIN";

    const onLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="d-flex justify-content-end align-items-center bg-success-subtle shadow-sm">
            <ul className="d-flex flex-row align-items-center w-auto list-unstyled mb-0">
                <li className="pe-2 ps-2"><p className="fs-5 m-auto">Current user: {username} </p></li>
                {isAdmin && <li>
                    <Link to="/cpanel" className="btn btn-success m-2 fs-6">cPanel</Link>
                </li>}
                <li>
                    <button className="btn btn-outline-success m-2 fs-6" onClick={onLogout}>Log out</button>
                </li>
            </ul>
        </div>
    );
};

export default HeaderComponent;
