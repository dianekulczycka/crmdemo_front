import {createBrowserRouter, RouteObject} from 'react-router-dom';
import MainLayout from "../layouts/MainLayout";
import ErrorLayout from "../layouts/ErrorLayout";
import OrdersPage from "../pages/OrdersPage";
import AuthPage from "../pages/AuthPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: <ErrorLayout/>,
        children: [
            {index: true, element: <AuthPage/>},
            {path: "login", element: <AuthPage/>},
            {path: "orders", element: <OrdersPage/>},
        ],
    },
]

export const router = createBrowserRouter(routes);