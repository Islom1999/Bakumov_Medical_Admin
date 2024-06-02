import { CreatedBy, SendingBy, Status } from "src/enumerations";
import { IUser } from "./user";

export interface IMessage{
    id?: string;
    title: string;
    body: string;
    status: Status;
    created_by: CreatedBy;
    sending_by: SendingBy;

    createdAt: string;
    updatedAt: string;

    userId?: string;
    user?: IUser;
}   