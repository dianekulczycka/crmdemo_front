import {FC, useEffect, useState} from "react";
import {IStat} from "../interfaces/order/IStat";
import {getStats} from "../services/ordersService";
import PreloaderComponent from "../components/PreloaderComponent";
import CPanelComponent from "../components/order/CPanelComponent";

const CPanelPage: FC = () => {
    const [stats, setStats] = useState<IStat[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect((): void => {
        setIsLoaded(false);
        getStats()
            .then((data) => {
                setStats(data);
                setIsLoaded(true);
            })
    }, []);

    return (
        <div className="d-flex flex-column align-items-center justify-content-evenly p-4">
            {!isLoaded ? <PreloaderComponent/> : <CPanelComponent stats={stats}/>}
        </div>
    );
};

export default CPanelPage;