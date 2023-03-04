import { Category } from "../../models/Category";
import { IGetPodcastsResponse } from "../../models/IGetPodcastsResponse";

export function getPodcasts(categoryId: number, page: number): Promise<IGetPodcastsResponse> {
    return new Promise((resolve, reject) => {
        if (categoryId == Category.Humor && page == 1) {
            resolve({
                copyright: 'copyright',
                pagination: {
                    page: 1,
                    size: 10,
                    totalhits: 3,
                    totalpages: 1
                },
                programs: [
                    { name: 'Name1', programimage: 'Url1', description: 'Description1' },
                    { name: 'Name2', programimage: 'Url2', description: 'Description2' },
                    { name: 'Name3', programimage: 'Url3', description: 'Description3' }
                ]
            })
        }
        reject();
    });
}
