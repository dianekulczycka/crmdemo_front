import {FC, useEffect, useState} from "react";
import OrdersComponent from "../components/order/OrdersComponent";
import PaginationComponent from "../components/order/PaginationComponent";
import PreloaderComponent from "../components/PreloaderComponent";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getAllOrders} from "../services/ordersService";
import {IOrdersPaginated} from "../interfaces/order/IOrderPaginated";
import {IOrder} from "../interfaces/order/IOrder";
import {ISearchParams} from "../interfaces/order/ISearchParams";
import FilterFormComponent from "../components/order/FilterFormComponent";
import {pickBy} from "lodash";

const OrdersPage: FC = () => {
    useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [ordersPaginated, setOrdersPaginated] = useState<IOrder[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    const page = Number(searchParams.get("page")) || 1;
    const order = searchParams.get("order") || "id";
    const direction = searchParams.get("direction") || "desc";

    const queryParams: ISearchParams = {
        page,
        order,
        direction,
        name: searchParams.get("name") || undefined,
        surname: searchParams.get("surname") || undefined,
        email: searchParams.get("email") || undefined,
        phone: searchParams.get("phone") || undefined,
        course: searchParams.get("course") || undefined,
        courseFormat: searchParams.get("courseFormat") || undefined,
        courseType: searchParams.get("courseType") || undefined,
        status: searchParams.get("status") || undefined,
        groupName: searchParams.get("groupName") || undefined,
        startDate: searchParams.get("startDate") || undefined,
        endDate: searchParams.get("endDate") || undefined,
    };

    useEffect(() => {
        setIsLoaded(false);
        getAllOrders(queryParams)
            .then((resp: IOrdersPaginated) => {
                setOrdersPaginated(resp.data);
                setTotal(resp.total);
                setIsLoaded(true);
            })
            .catch(() => setIsLoaded(true));
    }, [searchParams]);

    const handleFilterChange = (filters: Partial<ISearchParams>) => {
        if (Object.values(filters).some((value) => value !== undefined && value !== "")) {
            const updatedParams = {
                ...Object.fromEntries(searchParams.entries()),
                ...pickBy(filters, (value) => value !== undefined && value !== ""),
                page: "1",
            };

            const formattedParams = Object.fromEntries(
                Object.entries(updatedParams).map(([key, value]) => {
                    return [key, value.trim().toLowerCase()];
                })
            );

            setSearchParams(formattedParams);
        } else {
            setSearchParams({});
        }
    };

    const updateSorting = (newOrder: string) => {
        const newDirection: string =
            queryParams.order === newOrder && queryParams.direction === "asc" ? "desc" : "asc";

        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            order: newOrder,
            direction: newDirection,
            page: "1",
        });
    };

    return (
        <div>
            {isLoaded ? (
                <div className="d-flex flex-column align-items-center justify-content-evenly">
                    <FilterFormComponent onFilterChange={handleFilterChange}/>

                    {ordersPaginated.length > 0 ? (
                        <>
                            <OrdersComponent orders={ordersPaginated} onSort={updateSorting}/>
                            <PaginationComponent
                                total={total}
                                page={page}
                                setSearchParams={setSearchParams}
                            />
                        </>
                    ) : (
                        <h3 className="mt-4 text-danger">No orders matched</h3>
                    )}
                </div>
            ) : (
                <PreloaderComponent/>
            )}
        </div>
    );
};

export default OrdersPage;