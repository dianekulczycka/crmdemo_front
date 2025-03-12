import {FC, useEffect, useState} from "react";
import OrdersComponent from "../components/OrdersComponent";
import PaginationComponent from "../components/PaginationComponent";
import PreloaderComponent from "../components/PreloaderComponent";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getAllOrdersService} from "../services/getAllOrdersService";

const OrdersPage: FC = () => {
    useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [ordersPaginated, setOrdersPaginated] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [total, setTotal] = useState(0);

    const page = Number(searchParams.get("page")) || 1;
    const order = searchParams.get("order") || "id";
    const direction = searchParams.get("direction") || "desc";

    useEffect(() => {
        setIsLoaded(false);
        getAllOrdersService(page, order, direction)
            .then((data) => {
                setOrdersPaginated(data.data);
                setTotal(data.total);
                setIsLoaded(true);
            })
            .catch(() => setIsLoaded(true));
    }, [page, order, direction]);

    const updateSorting = (newOrder: string) => {
        const newDirection = order === newOrder && direction === "asc" ? "desc" : "asc";
        setSearchParams({page: "1", order: newOrder, direction: newDirection});
    };

    return (
        <div>
            {isLoaded ? (
                <div className="d-flex flex-column align-items-center justify-content-evenly">
                    <OrdersComponent orders={ordersPaginated}
                                     onSort={updateSorting}
                                     currentOrder={order}
                                     currentDirection={direction}/>
                    <PaginationComponent total={total}
                                         page={page}
                                         setSearchParams={setSearchParams}/>
                </div>
            ) : (
                <PreloaderComponent/>
            )}
        </div>
    );
};

export default OrdersPage;