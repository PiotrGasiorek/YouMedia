const carouselsMechanism = () => { 
    const carousels = document.querySelectorAll('.photo__carousel, .graphic__carousel');
    const nextBtns = document.querySelectorAll('.graphic__btnRight, .photo__btnRight');
    const prevBtns = document.querySelectorAll('.graphic__btnLeft, .photo__btnLeft');
    let activeImg = 0;

    // Hide all images in every carousel
    carousels.forEach(carousel => {
        carousel.querySelectorAll('.photo__image, .graphic__image').forEach(image => {
            image.style.display = 'none';
        });
    });

    // Show first image in every carousel
    carousels.forEach(carousel => {
        carousel.querySelectorAll('.photo__image, .graphic__image')[0].style.display = 'block';
    });

    const hideAll = (carousel) => {
        carousel.querySelectorAll('.photo__image, .graphic__image').forEach(image => {
            image.style.display = 'none';
        });
    };

    const showImage = (carousel, activeImg) => {
        carousel.querySelectorAll('.photo__image, .graphic__image')[activeImg].style.display = 'block';
        carousel.querySelectorAll('.photo__image, .graphic__image')[activeImg].classList.add('active');
    };

    nextBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            activeImg += 1;
            if(activeImg == carousels[index].querySelectorAll('.photo__image, .graphic__image').length){
                activeImg = 0;
            } 
            hideAll(carousels[index]);
            showImage(carousels[index], activeImg);
        });
    });

    prevBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            activeImg -= 1;
            if(activeImg < 0){
                activeImg = carousels[index].querySelectorAll('.photo__image, .graphic__image').length - 1;
            } 
            hideAll(carousels[index]);
            showImage(carousels[index], activeImg);
        });
    });

};

export { carouselsMechanism };