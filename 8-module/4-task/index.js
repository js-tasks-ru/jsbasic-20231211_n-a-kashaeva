import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product || product.id === undefined) {
      return;
    }
    let cartItemIndex = this.cartItems.findIndex(item => item.product.id === product.id);

    if (cartItemIndex === -1) {
      const newCartItem = {
        product: product,
        count: 1
      }
      this.cartItems.push(newCartItem);

      this.onProductUpdate(newCartItem);
     } else {
      this.updateProductCount(product.id, 1);
    }
  }

  updateProductCount(productId, amount) {
    let cartItemIndex = this.cartItems.findIndex(item => item.product.id === productId);
    let cartItem = this.cartItems[cartItemIndex];
    if (cartItemIndex >= 0) {
      cartItem.count += amount;
      if (cartItem.count <= 0) {
        this.cartItems.splice(cartItemIndex, 1);
    }

    this.onProductUpdate(cartItem);
  }
  }

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true;
    };

    return false;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.count * item.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    let body = document.createElement('div');
    for (let item of this.cartItems) {
      let renderedItem = this.renderProduct(item.product, item.count);
      let plus = renderedItem.querySelector('.cart-counter__button_plus');
      let minus = renderedItem.querySelector('.cart-counter__button_minus')
      let productId = item.product.id;
      plus.addEventListener('click', () => this.updateProductCount(productId, 1));
      minus.addEventListener('click', () => this.updateProductCount(productId, -1));
      body.append(renderedItem);
    }
    let orderForm = this.renderOrderForm();
    orderForm.addEventListener('submit', (event) => this.onSubmit(event));
    body.append(orderForm);

    this.modal.setBody(body);

    this.modal.open();
  }

  onProductUpdate(cartItem) {
    let isModalOpen = document.body.classList.contains('is-modal-open');
    if (isModalOpen && this.cartItems.length > 0) {
      let modalBody = document.body.querySelector('.modal__body');
      let productId = cartItem.product.id;
      let productElem = modalBody.querySelector(`[data-product-id="${productId}"]`);
  
      if (cartItem.count > 0) {
        let productCount = productElem.querySelector('.cart-counter__count');
        let productPrice = productElem.querySelector('.cart-product__price');
        let infoPrice = modalBody.querySelector('.cart-buttons__info-price');
        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      } else {
        productElem.remove();
      }
    } else if (isModalOpen) {
      this.modal.close();
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    let successInfo = createElement(
      `<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`
    );
    let form = document.body.querySelector('.cart-form');
    let submitButton = form.querySelector('.cart-buttons__button');
    submitButton.classList.add('is-loading');
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    })
    .then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          this.cartItems = [];
          this.cartIcon.update(this);
          this.modal.setTitle('Success!');
          this.modal.setBody(successInfo);
        }
      },
      failResponse => {
        return null;
      }
    )
    .finally(() => {
      submitButton.classList.remove('is-loading');
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

