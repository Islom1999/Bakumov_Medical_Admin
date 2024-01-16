import { Gender } from "src/enumerations";

export interface IName{
    id?: string;
    name:string;
    explanation: string;
    gender: Gender;
}