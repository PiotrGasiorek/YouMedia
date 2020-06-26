import { apiLink } from './API.js'

window.addEventListener("DOMContentLoaded", () => {
    fetch(`${apiLink}/api/v1/team`)
    .then(response => response.json())
    .then(data => data.Team_side_data)
    .then(data => {
        console.log(data)
        let team = data;
        let neededRows;
        let rows = [];
        let htmlToDisplay = '';

        if(data.length % 3 !== 0){
            neededRows = Math.floor(data.length / 3) + 1;
        } else{
            neededRows = data.length / 3;
        }

        for(let i = 0; i < neededRows; i++){
            rows.push([]);
        }

        rows.forEach(row => {
            for(let i = 0; i < 3; i++){
                if(team[i] == undefined){
                    break;
                }
                row.push(team[i]);
            }
            team.splice(0, 3);
        })

        rows.forEach(row => {
            row.forEach(card => {
                htmlToDisplay += `
                    <div class="team__card">
                        <img class="team__img" src="${card.photo_path}" alt="${card.photo_alt}">
                        <h3 class="team__title title title--sm">${card.name}</h3>
                        <p class='team__paragraph paragraph paragraph--sm paragraph--bold'>${card.description}</p>
                        <p class='team__paragraph paragraph paragraph--sm'>${card.email}</p>
                        <a class='team__btn btn--round' href="mailto: ${card.email}">
                            <img class='team__icon' src="static/gallery/icons/email--dark.svg" alt="Mail button">
                        </a>
                    </div>
                `
            })
        })

        document.querySelector('.team__deck').innerHTML += htmlToDisplay;

    })
    .catch(error => {
        console.log(error);
    });
});