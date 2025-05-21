import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {IManager} from "../../../interfaces/manager/IManager";
import {Button} from "react-bootstrap";
import {banManager} from "../../../services/managerService";

interface IProps {
    manager: IManager;
}

export const ActivateBanButtonsComponent: FC<IProps> = ({manager}) => {
    const navigate = useNavigate();

    const onBan = () => {
        banManager(manager.id, true).then(() => navigate(0));
    };

    const onUnban = () => {
        banManager(manager.id, false).then(() => navigate(0));
    };

    return (
        <div className="d-flex flex-column justify-content-evenly">
            <Button className="btn btn-success mx-3 fs-4">{manager.isActive ? "recover pass" : "activate"}</Button>
            <Button className="btn btn-success mx-3 fs-4" onClick={onBan} disabled={manager.isBanned}>ban</Button>
            <Button className="btn btn-success mx-3 fs-4" onClick={onUnban} disabled={!manager.isBanned}>unban</Button>
        </div>
    );
};

export default ActivateBanButtonsComponent;