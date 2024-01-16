import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render();
  }
 
  render() {
    let modal = createElement(
      `<div class="modal">
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
          </h3>
        </div>
  
        <div class="modal__body">
        </div>
      </div>
  
    </div>`
    );
    return modal; 
  }

  setTitle(title) {
    let modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  setBody(content) {
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.appendChild(content);
  }

  open() {
    let body = document.body;
    body.appendChild(this.elem);
    body.classList.add('is-modal-open');
    this.addEventListeners();
  }

  close() {
    let body = document.body;
    if (this.elem && this.elem.parentNode === body) {
      body.removeChild(this.elem);
      body.classList.remove('is-modal-open');
    }
  }

  addEventListeners() {
    let modalCloseButton = this.elem.querySelector('.modal__close');
    modalCloseButton.addEventListener('click', () => {this.close()});
    document.body.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    });
  }
}
