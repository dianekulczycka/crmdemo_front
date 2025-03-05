import {IOrder} from "./IOrder";

export interface IOrderPaginationResponse {
  total: number;
  perPage: number;
  nextPage: number | null;
  prevPage: number | null;
  data: IOrder[];
}