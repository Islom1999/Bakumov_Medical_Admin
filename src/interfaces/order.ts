import { IPremium } from "./premium";
import { IPromoCode } from "./promo-code";
import { IUser } from "./user";

export interface IOrder{
    id?: string;
    tid?: string;
    success: boolean;
    price: number;
    discount: number;
    createdAt: Date;
    updatedAt: Date;

    promoId?: string;
    premiumId?: string;
    userId?: string;

    user?: IUser;
    promo_code?: IPromoCode;
    premium?: IPremium
    paymentList:IPayment[]
}   


export interface IPayment{
    id?: string;
    amount: number;
    system: string;
    transactionId: string;
    createdAt: Date;
    updatedAt: Date;

    transaction ?: ITransaction;
}   

export interface ITransaction{
    id?: string;
    tid?: string;
} 





