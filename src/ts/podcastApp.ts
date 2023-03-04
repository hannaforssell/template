import { Category } from "./models/Category";
import { IProgram } from "./models/IProgram";
import { getPodcasts } from "./services/podcastService";

let currentPage = 1;
let totalPages: number | null = null;
let mainContainer: HTMLDivElement;
let podcastContainer: HTMLDivElement;
let errorMsgContainer: HTMLDivElement;

export async function init(container: HTMLDivElement) {
    mainContainer = container;

    mainContainer.innerHTML = /*html*/ `
        <section id="podcastContainer"></section>
        <section id="errorMsgContainer"></section>
    `;

    podcastContainer = mainContainer.querySelector('#podcastContainer') as HTMLDivElement;
    errorMsgContainer = mainContainer.querySelector('#errorMsgContainer') as HTMLDivElement;

    addPodcasts();

    document.addEventListener('DOMContentLoaded', function () {
        document.addEventListener('scroll', handleScroll);
    });
}

export async function addPodcasts(page: number = 1) {
    try {
        let response = await getPodcasts(Category.Humor, page);
        totalPages = response.pagination.totalpages;

        if (response.programs.length > 0) {
            createHTML(response.programs);
        }

    } catch {
        errorMsgContainer.innerHTML = 'Åh nej! Nu blev det något fel..';
    }
}

function createHTML(podcasts: IProgram[]) {
    for (const podcast of podcasts) {
        podcastContainer.innerHTML += /*html*/ `
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

async function handleScroll() {
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    let modifier = 50;

    if ((currentScroll + modifier > documentHeight) && (totalPages !== null && currentPage <= totalPages)) {
        document.removeEventListener('scroll', handleScroll);
        currentPage++;
        await addPodcasts(currentPage);
        document.addEventListener('scroll', handleScroll);
    }
}
