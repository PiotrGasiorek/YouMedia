import { toggleScroll, listenScroll } from './blockScroll.js';

const imgPopup = () => {

    const imgOverlay = document.querySelector('#imgOverlay');
    const carouselsImages = document.querySelectorAll('.photo__image, .graphic__image');

    listenScroll();

    // Image popup activate on click
    carouselsImages.forEach(img => {
        img.addEventListener('click', () => {
            activeImgPopup(img);
        });
    });

    // Image popup deactivate on click 
    document.querySelector('.overlay__btn').addEventListener('click', () => {
        deactivateImgPopup();
    });

    // Activate image popup
    const activeImgPopup = (img) => {
        imgOverlay.style.display = 'block';
        document.querySelector('.overlay__img').setAttribute('src', img.getAttribute('src'));
        toggleScroll('off');
    }

    // Deactivate image popup
    const deactivateImgPopup = () => {
        toggleScroll('on');
        imgOverlay.style.display = 'none';
    }
};

export { imgPopup };