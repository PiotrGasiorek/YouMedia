import { toggleScroll, listenScroll } from './blockScroll.js';

window.addEventListener("DOMContentLoaded", () => {

    listenScroll();
    
    // Responsive navigation
    (() => {
        const links = document.querySelector('.nav__right').innerHTML; 
        const sideNav = document.querySelector('.sideNav');
        const overlay = document.querySelector('#navOverlay');
        let didRun = false;

        sideNav.innerHTML += links;
        // Change color if needed
        document.querySelectorAll('.sideNav .link--dark').forEach(link => {
            link.classList.remove('link--dark');
            link.classList.add('link--light');
        })
        
        const isPopupActive = () => {
            let popup = document.querySelector('#imgOverlay');
            let popupStyles = window.getComputedStyle(popup);
            let popupDisplay = popupStyles.getPropertyValue('display');
            if(popupDisplay === 'none'){
                return false
            } else{
                return true
            }
        }

        function checkIfSmallDevice() {
            // Mobile menu
            if(self.innerWidth < 1066){
                // Display hamburger btn
                document.querySelector('.nav__right').innerHTML = `
                    <button class='nav__btn btn--round'>
                        <img src="./static/gallery/icons/menu--light.svg" alt="Menu button">
                    </button>
                `;
                // Activate side nav
                const activateSideNav = () => {
                    sideNav.classList.add('sideNav--active');
                    overlay.style.display = 'block';
                    toggleScroll('off');
                }

                document.querySelector('.nav__btn').addEventListener('click', () => {
                    activateSideNav();
                })

                // Deactivate side nav
                document.querySelector('.sideNav__btn').addEventListener("click", () => {
                    sideNav.classList.remove('sideNav--active');
                    overlay.style.display = 'none';
                    toggleScroll('on');
                })
                didRun = true;
            }
            // Dekstop menu
            else{
                sideNav.classList.remove('sideNav--active');
                overlay.style.display = 'none';
                document.querySelector('.nav__right').innerHTML = links;
                // Should toggle scroll
                if(didRun){
                    isPopupActive() ? toggleScroll('off') : toggleScroll('on');
                } else{
                    toggleScroll('off');
                }
                didRun = true;
            }
        }

        checkIfSmallDevice();

        window.addEventListener("resize", function() {
            checkIfSmallDevice();
        })
    })();

});


