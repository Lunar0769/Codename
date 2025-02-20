let currentIndex = 0;

function moveSlide(direction) {
    const carousel = document.querySelector('.carousel');
    const totalSlides = document.querySelectorAll('.carousel img').length;
    const slideWidth = document.querySelector('.carousel img').clientWidth;
    
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    
    carousel.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
}