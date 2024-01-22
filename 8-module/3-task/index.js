export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

