import {FC, useEffect, useState} from "react";
import OrdersComponent from "../components/order/OrdersComponent";
import PaginationComponent from "../components/order/PaginationComponent";
import PreloaderComponent from "../components/PreloaderComponent";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getAllGroupNames, getAllOrders} from "../services/ordersService";
import {IOrdersPaginated} from "../interfaces/order/IOrderPaginated";
import {IOrder} from "../interfaces/order/IOrder";
import {ISearchParams} from "../interfaces/order/ISearchParams";
import FilterFormComponent from "../components/order/FilterFormComponent";

const OrdersPage: FC = () => {
    useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [ordersPaginated, setOrdersPaginated] = useState<IOrder[]>([]);
    const [groups, setGroups] = useState<string[]>([]);
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
        isAssignedToMe: searchParams.get("isAssignedToMe") === "true" || undefined,
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

    useEffect(() => {
        getAllGroupNames()
            .then((groups: string[]) => setGroups(groups.map(g => g.toUpperCase())))
            .catch(error => console.error("Error fetching groups", error));
    }, [setGroups]);

    const handleFilterChange = (filters: Partial<ISearchParams>) => {
        const formattedParams: { [key: string]: string } = {};

        Object.entries(filters).forEach(([key, value]) => {
            if (typeof value === "string") {
                const trim = value.trim().toLowerCase();
                if (trim) formattedParams[key] = trim;
            } else if (typeof value === "boolean" && value) {
                formattedParams[key] = "true";
            }
        });

        setSearchParams(formattedParams);
    };

    const updateSorting = (newOrder: string) => {
        const newDirection: string =
            queryParams.order === newOrder && queryParams.direction === "asc" ? "desc" : "asc";

        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            order: newOrder,
            direction: newDirection
        });
    };

    return (
        <div>
            {isLoaded ? (
                <div className="d-flex flex-column align-items-center justify-content-evenly">
                    <FilterFormComponent groups={groups} onFilterChange={handleFilterChange}/>

                    {ordersPaginated.length > 0 ? (
                        <>
                            <OrdersComponent
                                orders={ordersPaginated}
                                groups={groups}
                                onSort={updateSorting}/>
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