import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    let carouselElement = document.body.querySelector('[data-carousel-holder]');
    carouselElement.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonMenuElement = document.body.querySelector('[data-ribbon-holder]');
    ribbonMenuElement.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    let stepSliderElement = document.body.querySelector('[data-slider-holder]');
    stepSliderElement.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    let cartIconElement = document.body.querySelector('[data-cart-icon-holder]');
    cartIconElement.append(this.cartIcon.elem);

    let cart = new Cart(this.cartIcon);

    try {
      const response = await fetch('products.json');

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);

      }

      this.products = await response.json();

      this.productsGrid = new ProductsGrid(this.products);
      let productsGridElement = document.body.querySelector('[data-products-grid-holder]')
      productsGridElement.append(this.productsGrid.elem);

      let skeletonElement = productsGridElement.querySelector('.products-grid__skeleton');
        if (skeletonElement) {
          skeletonElement.style.display = 'none'; 
        }
    } catch(error) {
        console.error('Ошибка при загрузке товаров:', error);
    }

    document.body.addEventListener('product-add', (event) => {
      let addProductId = event.detail;
      let productToAdd = this.products.find((product) => product.id === addProductId);

      if (productToAdd) {
        cart.addProduct(productToAdd);
      }
    })

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      console.log('slider-change:', event.detail);
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      console.log('ribbon-select:', event.detail)
      this.productsGrid.updateFilter({
        category: event.detail,
      });
    });

    let noNuts = document.getElementById('nuts-checkbox');
    noNuts.addEventListener('change', (event) => {
      this.productsGrid.updateFilter(
        {
          noNuts: noNuts.checked,
        }
      )
    });

    let vegeterian = document.getElementById('vegeterian-checkbox');
    vegeterian.addEventListener('change', (event) => {
      this.productsGrid.updateFilter(
        {
          vegeterianOnly: vegeterian.checked,
        }
      )
    });
  }
}
