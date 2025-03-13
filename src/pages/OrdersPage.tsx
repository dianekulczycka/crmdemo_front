import {FC, useEffect, useState} from "react";
import OrdersComponent from "../components/order/OrdersComponent";
import PaginationComponent from "../components/order/PaginationComponent";
import PreloaderComponent from "../components/PreloaderComponent";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getAllOrders} from "../services/ordersService";
import {IOrdersPaginated} from "../interfaces/order/IOrderPaginated";
import {IOrder} from "../interfaces/order/IOrder";


const OrdersPage: FC = () => {
    useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [ordersPaginated, setOrdersPaginated] = useState<IOrder[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    const page = Number(searchParams.get("page")) || 1;
    const order = searchParams.get("order") || "id";
    const direction = searchParams.get("direction") || "desc";

    useEffect(() => {
        setIsLoaded(false);
        getAllOrders(page, order, direction)
            .then((resp: IOrdersPaginated) => {
                setOrdersPaginated(resp.data);
                setTotal(resp.total);
                setIsLoaded(true);
            })
            .catch(() => setIsLoaded(true));
    }, [page, order, direction]);

    const updateSorting = (newOrder: string) => {
        const newDirection: string = order === newOrder && direction === "asc" ? "desc" : "asc";
        setSearchParams({page: "1", order: newOrder, direction: newDirection});
    };

    return (
        <div>
            {isLoaded ? (
                <div className="d-flex flex-column align-items-center justify-content-evenly">
                    <OrdersComponent orders={ordersPaginated}
                                     onSort={updateSorting}/>
                    <PaginationComponent total={total}
                                         page={page}
                                         setSearchParams={setSearchParams}/>
                </div>
            ) : <PreloaderComponent/>
            }
        </div>
    );
};

export default OrdersPage;