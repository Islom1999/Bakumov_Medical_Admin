import { RoleType } from "src/enumerations";

export interface INoticeable{
    id?:string
    icon: string;
    name: string;
    roleType: RoleType;
}