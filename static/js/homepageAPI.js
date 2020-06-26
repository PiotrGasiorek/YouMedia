import { apiLink } from './API.js'

window.addEventListener("DOMContentLoaded", () => {
    fetch(`${apiLink}/api/v1/homepage`)
    .then(response => response.json())
    .then(data => data.Homepage_side_data)
    .then(data => {
        
        let projectsCountParagraphs = Array.from(document.querySelectorAll('.services__paragraph'));
        let projectsCount = [
            data.video_projects,
            data.web_projects,
            data.graphic_projects,
            data.rental_projects
        ];

        projectsCountParagraphs.forEach((paragraph, index) => {
            paragraph.textContent = `Zrealizowane projekty: ${projectsCount[index]}`;
        });

        document.querySelector('.header__title').textContent = data.main_header;
        document.querySelector('video').innerHTML = `
            <source src="${data.showreel_link}" type="video/mp4">
        `;

    })
    .catch(error => {
        console.log(error);
        location.replace("http://127.0.0.1:5500/front-end/500.html");
    });

    document.querySelectorAll('.header__jumbotron .btn')[1].addEventListener('click', () => {
        document.querySelector('.main').scrollIntoView({
            behavior: "smooth", 
            inline: "start"
        });
    });
});