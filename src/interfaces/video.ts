export interface IVideo{
    id?:string
    image: string;
    video: string;
    title: string;
    descr: string;
    playlistId: string
    time?: number;
    count?: number;
}