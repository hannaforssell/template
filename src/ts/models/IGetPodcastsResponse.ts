import { IProgram } from "./IProgram";
import { IPagination } from "./IPagination";

export interface IGetPodcastsResponse {
    copyright: string,
    pagination: IPagination,
    programs: IProgram[],
}