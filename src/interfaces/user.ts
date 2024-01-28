import { RoleType } from "src/enumerations";
import { ServiceType } from "src/enumerations/serviceType";

export interface IUser{
    id?: string;
    fullname: string;
    username: string;
    phone: string;
    date_of_birth: Date;
    roleType: RoleType;
    date_premium_active: Date;
    serviceType: ServiceType;
    isSuccess: string;
}   
