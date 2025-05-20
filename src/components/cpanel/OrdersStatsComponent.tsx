import React, {FC} from 'react';
import {IStat} from "../../interfaces/order/IStat";

interface IProps {
    stats: IStat[];
}

const OrdersStatsComponent: FC<IProps> = ({stats}) => {
    return (
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
        </div>
    );
};

export default OrdersStatsComponent;