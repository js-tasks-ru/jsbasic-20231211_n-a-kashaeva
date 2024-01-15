import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render();
  }

  render() {
    let price = this.product.price.toFixed(2);
    let elem = createElement(
      `<div class="card">
        <div class="card__top">
            <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
            <span class="card__price">€${price}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this.product.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
      </div>`
    )
    

   elem.querySelector('.card__button').addEventListener('click', (event) => {
      let productAdd = new CustomEvent('product-add', { 
        bubbles: true,
        detail: this.product.id
      })
      this.elem.dispatchEvent(productAdd);
    });
    
    document.body.addEventListener('product-add', (event) => {
      console.log('Продукт добавлен в корзину', event.detail);
    });

    return elem;
    
  }




}
