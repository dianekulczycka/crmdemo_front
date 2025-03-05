import {useAppDispatch} from "../store/helpers/useAppDispatch";
import {useAppSelector} from "../store/helpers/useAppSelector";
import React, {FC, useEffect} from "react";
import {orderActions} from "../store/slices/orderSlice";
import PreloaderComponent from "../components/PreloaderComponent";
import PaginationComponent from "../components/PaginationComponent";
import OrdersComponent from "../components/OrdersComponent";

const OrdersPage: FC = () => {
    const dispatch = useAppDispatch();
    const {
        ordersPaginated,
        isLoaded,
        page,
        itemsPerPage,
        total
    } = useAppSelector(state => state.orders);

    useEffect(() => {
        dispatch(orderActions.loadAllOrders({page, itemsPerPage}));
    }, [dispatch, page, itemsPerPage]);

    return (
        <div>
            {
                isLoaded ?
                    <div className="d-flex flex-column align-items-center justify-content-evenly">
                        <OrdersComponent orders={ordersPaginated}/>
                        <PaginationComponent total={total} page={page} itemsPerPage={itemsPerPage}/>
                    </div>
                    :
                    <PreloaderComponent/>
            }
        </div>
    );
};

export default OrdersPage;