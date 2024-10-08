import { PremiumMonth } from "src/enumerations";

export interface IPremium{
    id?: string;
    name:string;
    price: number,
    month: PremiumMonth,
    isActive: boolean,
}