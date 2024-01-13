import { Trim } from "src/enumerations";

export interface INoticeableItem{
    id?:string
    image: string;
    title: string;
    descr: string;
    trim: Trim;
    noticeableId: string;
}