import {FC, useState} from "react";
import {IStat} from "../../interfaces/order/IStat";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateManagerModalComponent} from "../modals/CreateManagerModalComponent";
import {ICreateManagerFormData} from "../../interfaces/manager/ICreateManagerFormData";
import {addManager} from "../../services/managerService";
import OrdersStatsComponent from "../cpanel/OrdersStatsComponent";
import {IManager} from "../../interfaces/manager/IManager";
import ManagersListComponent from "../cpanel/ManagersListComponent";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

interface IProps {
    stats: IStat[];
    managers: IManager[];
}

const CPanelComponent: FC<IProps> = ({stats, managers}) => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const {
        control,
        handleSubmit,
        reset
    } = useForm<ICreateManagerFormData>({
        defaultValues: {
            email: "manager@gmail.com",
            name: "manager",
            surname: "managerovich",
        }
    });

    const onSubmit: SubmitHandler<ICreateManagerFormData> = (data) => {
        addManager(data)
            .then(() => {
                setModalOpen(false);
                reset();
                navigate(0);
            })
    };

    const onClose = () => {
        setModalOpen(false);
        reset();
    };

    return (
        <>
            <div className="d-flex flex-row align-items-center justify-content-evenly w-75">
                <div className="w-25">
                    <Button className="btn btn-success my-3 fs-4" onClick={() => setModalOpen(true)}>
                        Create manager
                    </Button>
                </div>

                <div>
                    <OrdersStatsComponent stats={stats}/>
                    <CreateManagerModalComponent
                        isOpen={isModalOpen}
                        onClose={onClose}
                        onSubmit={handleSubmit(onSubmit)}
                        control={control}
                    />
                </div>
            </div>
            <div className="d-flex flex-row align-items-center w-100">
                <ManagersListComponent managers={managers}/>
            </div>
        </>
    );
};

export default CPanelComponent;