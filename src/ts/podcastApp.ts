import { Category } from "./models/Category";
import { IProgram } from "./models/IProgram";
import { getPodcasts } from "./services/podcastService";
import { v4 as uuidv4 } from 'uuid';

export class PodcastApp {
    private currentPage = 1;
    private totalPages: number | null = null;
    private podcastContainer: HTMLElement;
    private errorMsgContainer: HTMLElement;
    private id: string;
    public isReady = false;

    constructor(private mainContainer: HTMLDivElement, private category: Category) {
        this.id = uuidv4();

        this.mainContainer.innerHTML = /*html*/ `
            <section id="podcastContainer_${this.id}" class="podcastContainer"></section>
            <section id="errorMsgContainer_${this.id}"></section>
        `;

        this.podcastContainer = this.mainContainer.querySelector(`#podcastContainer_${this.id}`) as HTMLElement;
        this.errorMsgContainer = this.mainContainer.querySelector(`#errorMsgContainer_${this.id}`) as HTMLElement;
    }

    public async init() {
        await this.addPodcasts(this.category);

        this.podcastContainer.addEventListener('scroll', () => {
            this.handleScroll(this);
        });
    }

    private async addPodcasts(category: Category, page: number = 1) {
        try {
            let response = await getPodcasts(category, page);
            this.totalPages = response.pagination.totalpages;

            if (response.programs.length > 0) {
                this.createHTML(response.programs);
            }

        } catch {
            this.errorMsgContainer.innerHTML = 'Åh nej! Nu blev det något fel..';
        }
        this.isReady = true;
    }

    private createHTML(podcasts: IProgram[]) {
        for (const podcast of podcasts) {
            this.podcastContainer.innerHTML += /*html*/ `
                <article class="single-podcast">
                    <img src="${podcast.programimage}" alt="${podcast.name}" class="podcast-image">
                    <div class="podcast-text-container">
                        <h3 class="podcast-name">${podcast.name}</h3>
                        <p class="podcast-description">${podcast.description}</p>
                    </div>
                </article>
                <hr>
            `;
        }
    }

    private async handleScroll(app: PodcastApp) {

        let currentScroll = app.podcastContainer.scrollTop;
        let maxScroll = app.podcastContainer.scrollHeight - app.podcastContainer.offsetHeight;
        let modifier = 50;

        if ((currentScroll + modifier > maxScroll) && (this.totalPages !== null && this.currentPage <= this.totalPages)) {
            app.podcastContainer.removeEventListener('scroll', () => this.handleScroll(app));
            this.currentPage++;
            await this.addPodcasts(this.category, this.currentPage);
            app.podcastContainer.addEventListener('scroll', () => this.handleScroll(app));
        }
    }
}