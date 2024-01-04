function initCarousel() {
  let arrowRightButton = document.querySelector('.carousel__arrow_right');
  let arrowLeftButton = document.querySelector('.carousel__arrow_left');
  let carouselWindow = document.querySelector('.carousel__inner');
  let counter = 0;
  const totalItems = 4;

  updateArrows();

  function updateArrows() {
    arrowLeftButton.style.display = counter > 0 ? '' : 'none';
    arrowRightButton.style.display = counter < totalItems - 1 ? '' : 'none';
  }

  function carouselNext() {
    if (counter < totalItems - 1) {
      counter++;
      carouselWindow.style.transform = `translateX(${-carouselWindow.offsetWidth * counter}px)`;
    }
    updateArrows();
  }
  function carouselPrevious() {
    if (counter > 0) {
      counter--;
      carouselWindow.style.transform = `translateX(${-carouselWindow.offsetWidth * counter}px)`;
    }
    updateArrows();
  }

  arrowRightButton.addEventListener('click', carouselNext);
  arrowLeftButton.addEventListener('click', carouselPrevious);
}
