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

export enum SettingStatus{
    all = 'all',
    old_user = 'old_user',
    premium = 'premium',
    none = 'none',
}

export interface ISettings{
    id?: string
    is_otp: SettingStatus
    is_google: boolean
    is_payme: boolean
    is_click: boolean
    is_service: boolean
}   
