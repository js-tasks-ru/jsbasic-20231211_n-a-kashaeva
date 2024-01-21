import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.render();
    this.renderProducts(this.products);
  }

  render() {
    let productGrid = createElement(
      `
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
      `
    );

    return productGrid;
  }

  renderProducts(products) {
    let productGridInner = this.elem.querySelector('.products-grid__inner');
    productGridInner.innerHTML = '';
    for (let product of products) {
      let card = new ProductCard(product);
      productGridInner.append(card.elem)
    }
  }

  applyFilters(product) {
    let isProductValid = true;
    
    for (let filterKey in this.filters) {
      let filterValue = this.filters[filterKey];
      
      if (filterKey === 'noNuts' && filterValue === true && product.nuts === true) {
        isProductValid = false;
        break;
      }
      if (filterKey === 'vegeterianOnly' && filterValue === true && (!product.vegeterian || product.vegeterian === undefined)) {
        isProductValid = false;
        break;
      } 
      if (filterKey === 'category' && product.category !== filterValue) {
        isProductValid = false;
        break;
      } 
      if (filterKey === 'maxSpiciness' && product.spiciness > filterValue) {
        isProductValid = false;
        break;
      }
    }
    return isProductValid;
  }

  updateFilter(filters) {
    this.filters = {...this.filters, ...filters};

    let filteredProducts;

    if ((this.filters.noNuts === undefined || this.filters.noNuts == false) && 
        (this.filters.vegeterianOnly === undefined || this.filters.vegeterianOnly === false) &&
        (this.filters.category === undefined || this.filters.category === '') &&
        (this.filters.maxSpiciness === undefined || this.filters.maxSpiciness === 4)) {
            filteredProducts = this.products;
        } else {
          filteredProducts = this.products.filter(product => this.applyFilters(product));
        }

    this.renderProducts(filteredProducts);
  }
}
