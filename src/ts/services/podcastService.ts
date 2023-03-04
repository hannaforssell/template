import axios from 'axios';
import { IGetPodcastsResponse } from '../models/IGetPodcastsResponse';

const BASE_URL = `https://api.sr.se/api/v2/programs/index`;

export async function getPodcasts(categoryId: number, page: number): Promise<IGetPodcastsResponse> {
    return axios({
        method: 'get',
        url: BASE_URL,
        params: {
            programcategoryid: categoryId,
            page: page,
            format: 'json'
        }
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return {
            copyright: '',
            pagination: {
                page: 1,
                size: 0,
                totalhits: 0,
                totalpages: 1
            },
            programs: [],
        };
    });
}
