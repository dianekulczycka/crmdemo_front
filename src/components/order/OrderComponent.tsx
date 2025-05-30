import {FC} from "react";
import {IOrder} from "../../interfaces/order/IOrder";
import CommentsComponent from "../comment/CommentsComponent";

interface IProps {
    order: IOrder;
    isExpanded: boolean;
    onClick: () => void;
    groups: string[];
}

const OrderComponent: FC<IProps> = ({order, groups, isExpanded, onClick}) => {
    return (
        <>
            <tr onClick={onClick} className="table-light">
                <td>{order.id}</td>
                <td>{order.name || "null"}</td>
                <td>{order.surname || "null"}</td>
                <td>{order.email || "null"}</td>
                <td>{order.phone || "null"}</td>
                <td>{order.age ?? "null"}</td>
                <td>{order.course || "null"}</td>
                <td>{order.courseFormat || "null"}</td>
                <td>{order.courseType || "null"}</td>
                <td>{order.status || "null"}</td>
                <td>{order.sum ?? "null"}</td>
                <td>{order.alreadyPaid ?? "null"}</td>
                <td>{order.createdAt || "null"}</td>
                <td>{order.manager || "null"}</td>
                <td>{order.groupName || "null"}</td>
            </tr>
            {isExpanded && <CommentsComponent
                order={order}
                groups={groups}
            />}
        </>
    );
};

export default OrderComponent;