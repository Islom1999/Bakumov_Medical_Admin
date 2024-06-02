import { Gender, RoleType } from "src/enumerations";
import { ServiceType } from "src/enumerations/serviceType";
import { IOrder, IPayment } from "./order";

export interface IUser{
    id?: string;
    fullname: string;
    username: string;
    phone: number;
    email: string;
    date_of_birth: Date;
    roleType: RoleType;
    date_premium_active: Date;
    serviceType: ServiceType;
    isSuccess: string;
    
    createdAt: Date;
    updatedAt: Date;

    children?: IChildren[];
    order: IOrder[];
    paymentList: IPayment[]
}   


export interface IChildren{
    id?:string;
    fullname: string,
    gender: Gender,
    serviceType: ServiceType,
    date_of_birth: Date,
    date_of_embry: Date,
    createdAt: Date,
    updatedAt: Date,
}