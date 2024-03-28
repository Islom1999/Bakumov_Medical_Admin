import { RoleType } from "src/enumerations";
import { ServiceType } from "src/enumerations/serviceType";

export interface IPlaylist{
    id?:string
    image: string;
    title: string;
    descr: string;
    time?: number;
    count?: number;
    serviceType: ServiceType[];
    roleType: RoleType;
}