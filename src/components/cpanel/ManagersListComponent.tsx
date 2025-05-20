import React, {FC} from 'react';
import {IManager} from "../../interfaces/manager/IManager";

interface IProps {
    managers: IManager[];
}

const ManagersListComponent: FC<IProps> = ({managers}) => {
    return (
        <div className="m-3 w-75">
            {managers.map((manager) => (
                <div key={manager.id} className="bg-success-subtle text-right m-4 p-2">
                    <p className="m-1 fs-4">id:{manager.id}</p>
                    <p className="m-1 fs-4">email:{manager.email}</p>
                    <p className="m-1 fs-4">name:{manager.name}</p>
                    <p className="m-1 fs-4">surname:{manager.surname}</p>
                    <p className="m-1 fs-4">active:{manager.isActive ? "yes" : "no"}</p>
                    <p className="m-1 fs-4">last login:{manager.lastLogIn ?? "null"}</p>
                    <p className="m-1 fs-4">total:{manager.total ?? 0}</p>
                </div>
            ))}
        </div>
    );
};

export default ManagersListComponent;