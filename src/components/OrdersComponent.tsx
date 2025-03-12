import { IOrder } from "../interfaces/order/IOrder";
import { FC } from "react";
import OrderComponent from "./OrderComponent";
import TableHeaderComponent from "./TableHeaderComponent";

interface IProps {
    orders: IOrder[];
    onSort: (column: string) => void;
    currentOrder: string;
    currentDirection: string;
}

const OrdersComponent: FC<IProps> = ({ orders, onSort, currentOrder, currentDirection }) => {
    return (
        <div>
            <table className="table table-bordered table-striped">
                <TableHeaderComponent onSort={onSort}
                                      currentOrder={currentOrder}
                                      currentDirection={currentDirection} />
                <tbody>
                {orders.map((order, index) => (
                    <OrderComponent key={index} order={order} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersComponent;
