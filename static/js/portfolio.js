import { apiLink } from './API.js'
import { carouselsMechanism } from './carousel.js'
import { imgPopup } from './imgPopup.js';

window.addEventListener("DOMContentLoaded", () => {

    const websiteHtml = (data) => {
        return `
            <div class="portfolio__card website">
                <img src="static/gallery/icons/code.svg" alt="code" class="portfolio__icons">
                <h3 class="portfolio__dates title title--grey title--md">${data.date}</h3>
                <div class="website__descritpion">
                    <h3 class="website__title title title--sm">
                        ${data.title}
                    </h3>
                    <p class="website__paragraph paragraph paragraph--sm">
                        ${data.description}
                    </p>
                    <a class='website__btn btn btn--primary link' href='${data.webside_link}'>zobacz stronę</a>
                </div>
                <div>
                    <img 
                        class="website__logo"
                        src="${data.photos_path}" 
                        alt="${data.photos_alt}"
                    >
                </div>
            </div>
        `;
    }

    const videoHtml = (data) => {
        return `
            <div class="portfolio__card movie">
                <img src="static/gallery/icons/video.svg" alt="camera" class="portfolio__icons">
                <h3 class="portfolio__dates title title--grey title--md">${data.date}</h3>
                <div class="movie__head" style='background-image: url("${data.photos_path}")'>
                    <a class="movie__btn--play" href='${data.video_link}' target="_blank" rel="noopener noreferrer">
                        <img src="./static/gallery/icons/play.svg" alt="Play icon">
                    </a>
                </div>
                <div class="movie__body">
                    <h3 class="movie__title title title--sm">
                        ${data.title}
                    </h3>
                    <p class="movie__paragraph paragraph paragraph--sm">
                        ${data.description}
                    </p>
                </div>
            </div>
        `;
    }

    const photosHtml = (data) => {
        let srcs = data.photos_path.split(',');
        let alts = data.photos_alt.split(',');

        let imgs = srcs.map((src, index) => {
            return `<img class='photo__image' src="${src}" alt="${alts[index]}">`
        }).join('');

        const html = 
            `<div class="portfolio__card photo">
                <img src="static/gallery/icons/camera.svg" alt="camera" class="portfolio__icons">
                <h3 class="portfolio__dates title title--grey title--md">${data.date}</h3>
                <div class="photo__carousel">
                    <button class='photo__btnRight' >
                        <img src="static/gallery/icons/arrow--right.svg" alt="Arrow button">
                    </button>
                    <button class='photo__btnLeft' >
                        <img src="static/gallery/icons/arrow--left.svg" alt="Arrow button">
                    </button>
                    ${imgs}
                </div>
                <div class="photo__descritpion">
                    <h3 class="photo__title title title--sm">
                        ${data.title}
                    </h3>
                    <p class="photo__paragraph paragraph paragraph--sm">
                        ${data.description}
                    </p>
                </div>
            </div>`
        ;
        
        return html
    }

    const graphicsHtml = (data) => {
        let srcs = data.photos_path.split(',');
        let alts = data.photos_alt.split(',');

        let imgs = srcs.map((src, index) => {
            return `<img class='graphic__image' src="${src}" alt="${alts[index]}">`
        }).join('');

        const html = 
            `<div class="portfolio__card graphic">
                <img src="static/gallery/icons/graphic.svg" alt="pen icon" class="portfolio__icons">
                <h3 class="portfolio__dates title title--grey title--md">${data.date}</h3>
                <div class="graphic__carousel">
                    <button class='graphic__btnRight' >
                        <img src="static/gallery/icons/arrow--right.svg" alt="Arrow button">
                    </button>
                    <button class='graphic__btnLeft' >
                        <img src="static/gallery/icons/arrow--left.svg" alt="Arrow button">
                    </button>
                    ${imgs}
                </div>
                <div class="graphic__descritpion">
                    <h3 class="graphic__title title title--sm">
                        ${data.title}
                    </h3>
                    <p class="graphic__paragraph paragraph paragraph--sm">
                        ${data.description}
                    </p>
                </div>
            </div>`
        ;

        return html
    }

    const displayProject = (project) => {
        document.querySelector('.portfolio').innerHTML += project
    }

    fetch(`${apiLink}/api/v1/portfolio`)
    .then(response => response.json())
    .then(data => data.Portfolio_side_data)
    .then(data => {

        data.forEach((project) => {
            switch(project.category) {
                case 'website':
                    displayProject(websiteHtml(project));
                    break;
                case 'video':
                    displayProject(videoHtml(project));
                    break;
                case 'photos':
                    displayProject(photosHtml(project));
                    break;
                case 'graphics':
                    displayProject(graphicsHtml(project));
                    break;
            }
        });

    })
    // Mechanisms for portfolio subpage
    .then(data => {
        carouselsMechanism();
        imgPopup();
    })
    .catch(error => {
        location.replace("/500.html");
    });

});