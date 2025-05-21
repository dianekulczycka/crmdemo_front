import {IStat} from "../order/IStat";

export interface IManager {
    id: number;
    email: string;
    name: string;
    surname: string;
    isActive: boolean;
    lastLogIn: string | null;
    isBanned: boolean;
    total: number;
    stats?: IStat[];
}