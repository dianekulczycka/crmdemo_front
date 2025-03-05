import {IOrder} from "../interfaces/order/IOrder";
import {FC} from "react";
import OrderComponent from "./OrderComponent";
import TableHeaderComponent from "./TableHeaderComponent";

interface IProps {
    orders: IOrder[]
}

const OrdersComponent: FC<IProps> = ({orders}) => {
    return (
        <div>
            <table className="table table-bordered table-striped">
                <TableHeaderComponent/>
                <tbody>
                {
                    orders.map((order, index) => (
                        <OrderComponent key={index} order={order}/>))
                }
                </tbody>
            </table>
        </div>
    );
};

export default OrdersComponent;