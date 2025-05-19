import {FC, useState} from "react";
import {IStat} from "../../interfaces/order/IStat";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateManagerModalComponent} from "./CreateManagerModalComponent";
import {IFormData} from "../../interfaces/order/ICreateManagerFormData";

interface IProps {
    stats: IStat[];
}

const CPanelComponent: FC<IProps> = ({stats}) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const {
        control,
        handleSubmit,
        reset
    } = useForm<IFormData>({
        defaultValues: {
            email: "managerOne@gmail.com",
            name: "manager",
            surname: "managerovich",
        }
    });

    const onSubmit: SubmitHandler<IFormData> = (data) => {
        setModalOpen(false);
        reset();
    };

    const onClose = () => {
        setModalOpen(false);
        reset();
    };

    return (
        <div className="d-flex flex-row align-items-center justify-content-evenly w-75">
            <div className="w-25">
                <button className="btn btn-success my-3 fs-4" onClick={() => setModalOpen(true)}>
                    Create manager
                </button>
            </div>

            <div>
                <h3>Orders:</h3>
                {stats.length > 0 ? (
                    <ul className="list-unstyled">
                        {stats.map(({name, count}) => (
                            <li key={name} className="list-group-item d-flex justify-content-between">
                                <h4>{name}: {count}</h4>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <h3 className="text-danger">No stats</h3>
                )}

                <CreateManagerModalComponent
                    isOpen={isModalOpen}
                    onClose={onClose}
                    onSubmit={handleSubmit(onSubmit)}
                    control={control}
                />
            </div>
        </div>
    );
};

export default CPanelComponent;