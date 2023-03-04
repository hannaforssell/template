import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { IGetPodcastsResponse } from '../models/IGetPodcastsResponse';

const BASE_URL = `https://api.sr.se/api/v2/programs/index`;

const axios = setupCache(Axios); 

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
        console.log(data.cached);
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
