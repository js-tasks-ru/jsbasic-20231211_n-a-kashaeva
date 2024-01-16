import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEventListeners();
  }

  render () {
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    let ribbonMenuInner = document.createElement('div')
    ribbonMenuInner.classList.add('ribbon__inner');
    this.elem.appendChild(ribbonMenuInner);

    let ribbonMenuArrowLeft = createElement(
      `<button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`
    );
    ribbonMenuInner.appendChild(ribbonMenuArrowLeft);

    for (let category of this.categories) {
      ribbonMenuInner.insertAdjacentHTML('beforeEnd', `<a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>`);
    }

    let ribbonMenuArrowRight = createElement(
      `<button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`
    );
    ribbonMenuInner.appendChild(ribbonMenuArrowRight)

    document.addEventListener('DOMContentLoaded', () => {
      this.updateArrows();
    })
    
  }

  addEventListeners() {
    this.elem.addEventListener('click', ({target}) => {
      let category = target.closest('.ribbon__item');
      if (category) {
        let id = target.closest('[data-id]').dataset.id;
        this.elem.dispatchEvent(new CustomEvent ('ribbon-select', {
            detail: id,
            bubbles: true,
          }
        ));
      }

      let leftArrow = target.closest('.ribbon__arrow_left');
      if (leftArrow) {
        this.back();
      }

      let rightArrow = target.closest('.ribbon__arrow_right');
      if (rightArrow) {
        this.forward();
      }
    });
    let ribbonMenuInner = this.elem.querySelector('.ribbon__inner');
    ribbonMenuInner.addEventListener('scroll', () => this.updateArrows());
  }

  forward() {
    let ribbonMenuInner = this.elem.querySelector('.ribbon__inner');
    ribbonMenuInner.scrollBy(350, 0);
  }

  back() {
    let ribbonMenuInner = this.elem.querySelector('.ribbon__inner');
    ribbonMenuInner.scrollBy(-350, 0);
  }

  updateArrows() {
    let ribbonMenuInner = this.elem.querySelector('.ribbon__inner');
    let ribbonMenuArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let ribbonMenuArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let scrollLeft = ribbonMenuInner.scrollLeft;
    let scrollWidth = ribbonMenuInner.scrollWidth;
    let clientWidth = ribbonMenuInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      ribbonMenuArrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      ribbonMenuArrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      ribbonMenuArrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      ribbonMenuArrowRight.classList.add('ribbon__arrow_visible');
    }
  }
}
