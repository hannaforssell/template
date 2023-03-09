import '../scss/style.scss'
import { Category } from './models/Category';
import { PodcastApp } from './podcastApp'

const container = document.getElementById('mainContainer') as HTMLDivElement;
const containerTwo = document.getElementById('secContainer') as HTMLDivElement;

let humorApp = new PodcastApp(container, Category.Humor);
let seApp = new PodcastApp(containerTwo, Category.SomethingElse);

humorApp.init();
seApp.init();
