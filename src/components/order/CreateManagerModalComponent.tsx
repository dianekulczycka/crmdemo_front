import {FC} from "react";
import {Modal} from "react-bootstrap";
import {Control, Controller} from "react-hook-form";
import {IFormData} from "../../interfaces/order/ICreateManagerFormData";

export interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    control: Control<IFormData>;
}

export const CreateManagerModalComponent: FC<IProps> = ({isOpen, onClose, onSubmit, control}) => {
    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label>email</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({field}) => (
                                <input {...field} type="email" className="form-control" required/>
                            )}
                        />
                    </div>
                    <div className="mb-3">
                        <label>name</label>
                        <Controller
                            name="name"
                            control={control}
                            render={({field}) => (
                                <input {...field} className="form-control" required/>
                            )}
                        />
                    </div>
                    <div className="mb-3">
                        <label>surname</label>
                        <Controller
                            name="surname"
                            control={control}
                            render={({field}) => (
                                <input {...field} className="form-control" required/>
                            )}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        create
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};
