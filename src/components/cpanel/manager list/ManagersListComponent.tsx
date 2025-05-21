import React, {FC} from 'react';
import {IManager} from "../../../interfaces/manager/IManager";
import ManagersListItemComponent from "./ManagersListItemComponent";

interface IProps {
    managers: IManager[];
}

const ManagersListComponent: FC<IProps> = ({managers}) => {
    return (
        <div className="m-3 w-75">
            {managers.map((manager, index) => <ManagersListItemComponent index={index} manager={manager}/>)}
        </div>
    );
};

export default ManagersListComponent;