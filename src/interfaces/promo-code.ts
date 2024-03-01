import { IAdmin } from "./admin";
import { IOrder } from "./order";
import { ITotal } from "./total";

export interface IPromoCode{
    id?: string;
    code: string;
    discount: number;
    isActive?: false;
    adminId?: string;

    admin: IAdmin
    order: IOrder[]
    total: ITotal
}   
