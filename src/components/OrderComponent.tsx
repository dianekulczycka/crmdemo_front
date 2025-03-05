import React, {FC} from 'react';
import {IOrder} from "../interfaces/order/IOrder";

interface IProps {
    order: IOrder;
}

const OrderComponent: FC<IProps> = ({order}) => {
    return (
        <tr>
            <td>{order.id}</td>
            <td>{order.name || 'null'}</td>
            <td>{order.surname || 'null'}</td>
            <td>{order.email || 'null'}</td>
            <td>{order.phone || 'null'}</td>
            <td>{order.age !== null ? order.age : 'null'}</td>
            <td>{order.course || 'null'}</td>
            <td>{order.courseFormat || 'null'}</td>
            <td>{order.courseType || 'null'}</td>
            <td>{order.sum !== null ? order.sum : 'null'}</td>
            <td>{order.alreadyPaid !== null ? order.alreadyPaid : 'null'}</td>
            <td>{order.createdAt || 'null'}</td>
        </tr>
    );
};

export default OrderComponent;