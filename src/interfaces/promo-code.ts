import { IAdmin } from "./admin";
import { IOrder } from "./order";

export interface IPromoCode{
    id?: string;
    code: string;
    discount: number;
    isActive?: false;
    adminId?: string;

    admin: IAdmin
    order: IOrder[]
}   
