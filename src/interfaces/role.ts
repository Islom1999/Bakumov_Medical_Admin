import { Permission } from "src/enumerations";
import { IAdmin } from "./admin";

export interface IRole{
    id?: string;
    title: string;
    permission: Permission[];

    admins: IAdmin[]
}   
