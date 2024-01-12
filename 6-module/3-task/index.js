import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
    this.initCarousel();
    this.initProductAddEventListener();
  }

  render() {
    let carousel = createElement(
      `<div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
      </div>`
    )
    let carouselInner = createElement('<div class="carousel__inner"></div>');
    for (let slide of this.slides) {
      let slide_elem = createElement(`
        <div class="carousel__slide" data-id=${slide.id}>
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `)
      this.initProductAddEvent(slide_elem);
      carouselInner.appendChild(slide_elem);
    }
    carousel.appendChild(carouselInner);

    return carousel;
  }

  initCarousel() {
    let arrowRightButton = this.elem.querySelector('.carousel__arrow_right');
    let arrowLeftButton = this.elem.querySelector('.carousel__arrow_left');
    let carouselWindow = this.elem.querySelector('.carousel__inner');
    let counter = 0;
    let totalItems = this.slides.length;
  
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

  initProductAddEvent(slide_elem) {
    let carouselButton = slide_elem.querySelector('.carousel__button');
    carouselButton.addEventListener('click', (event) => {
      let productId = slide_elem.dataset.id;
      let productAdd = new CustomEvent('product-add', {
        bubbles: true,
        detail: productId,
      });
      slide_elem.dispatchEvent(productAdd);
    });
  }

  initProductAddEventListener() {
    document.body.addEventListener('product-add', (event) => {
      console.log('Продукт добавлен в корзину', event.detail);
    });
  }
}
