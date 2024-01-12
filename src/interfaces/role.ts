import { Permission } from "src/enumerations";

export interface IRole{
    id?: string;
    title: string;
    permission: Permission[];
}   
