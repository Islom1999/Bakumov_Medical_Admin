import { IPromoCode } from "./promo-code";
import { IRole } from "./role";

export interface IAdmin{
    id?: string;
    name: string;
    email: string;
    phone: string;
    isBlock: boolean;
    adminRoleId: string;

    role?: IRole
    promo_code?: IPromoCode[]
}   
