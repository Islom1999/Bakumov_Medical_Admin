import { PaymentProvider, TransactionStatus } from "src/enumerations";
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



export interface IOrderV2{
    id?: string;
    tid: string;
    success: boolean;
    price: number;
    discount: number;

    userId: string;
    premiumId: string;
    promoId: string;

    createdAt: Date;
    updatedAt: Date;

    user: IUser;
    premium: IPremium;
    promo: IPromoCode;
    transactions: ITransactionV2[];
}   

export interface ITransactionV2{
    id: string
    provider: PaymentProvider
    trans_id: string;
    amount: number;
    prepare_id: number
    perform_time: Date
    cancel_time: Date
    reason: number
    state: number
    status: TransactionStatus
    created_at: Date;
    updated_at: Date;
}





