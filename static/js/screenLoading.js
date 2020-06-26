import { toggleScroll, listenScroll } from './blockScroll.js';

listenScroll();


const animationBlock = document.querySelector('.animationBlock');
const logo = document.querySelector('.animationBlock__content');

// Show loading block
animationBlock.classList.add('loadingScreen');
toggleScroll('off');

// Show logo
logo.style.display = 'block';
logo.style.animation = 'showLogo 1s';

const hideLoadingScreen = () => {
    setTimeout(() => {

        // Hide logo
        logo.style.animation = 'hideLogo 1s';
        setTimeout(() => {
            logo.style.display = 'none';
        }, 900);

        // Hide loading block
        setTimeout(() => {
            animationBlock.style.animation = 'loadingAnimation 1s';
        }, 1000);

        setTimeout(() => {
            toggleScroll('on');
        }, 1300);

        // Remove loading block
        setTimeout(() => {
            animationBlock.style.display = 'none';
            animationBlock.classList.remove('loadingScreen');
        }, 1900);

    }, 1000);
};
    
window.addEventListener("load", hideLoadingScreen);