import { RoleType } from "src/enumerations";
import { ToolsType } from "src/enumerations/toolsType";

export interface ITools{
    id?: string;
    icon: string;
    name: string;
    toolsType?: string;
    serviceType?: ToolsType;
    roleType?: RoleType;
}   
