export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.isDragging = false;
    this.updateSlider(this.value, this.getRoundLeftPercents(this.value));
    this.addEventListeners();
  }

  render() {
    let slider = document.createElement('div');
    slider.className = 'slider';

    slider.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">${new Array(this.steps).fill('<span></span>').join('')}</div>
    `;

    return slider;
  }

  getRoundLeftPercents(value) {
    let leftPercents = (value / (this.steps - 1)) * 100;
    return leftPercents;
  }

  updateSlider(value, leftPercents) {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    this.elem.querySelector('.slider__value').innerHTML = value;

    let activeStep = this.elem.querySelector('.slider__step-active');
    if (activeStep) {
      activeStep.classList.remove('slider__step-active');
    }
    this.elem.querySelector('.slider__steps').children[value].classList.add('slider__step-active');
  }

  addEventListeners() {
    this.elem.addEventListener('click', event => {
      if (!this.isDragging) {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;
  
        this.value = Math.round(leftRelative * (this.steps - 1));
        this.updateSlider(this.value, this.getRoundLeftPercents(this.value));
        this.elem.dispatchEvent(new CustomEvent('slider-change', { detail: this.value, bubbles: true }));
      }
    });
    this.isDragging = false;

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', event => {
      event.preventDefault();
      this.elem.classList.add('slider_dragging');
      this.isDragging = true;
    
      const onPointerMove = (event) => {
        event.preventDefault();
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = Math.min(Math.max(left / this.elem.offsetWidth, 0), 1);
        
        let leftPercents = leftRelative * 100;
        let approximateValue = leftRelative * (this.steps - 1);
        let roundValue = Math.round(approximateValue);
    
        this.value = roundValue;
    
        this.updateSlider(this.value, leftPercents);
      };
    
      document.addEventListener('pointermove', onPointerMove);
    
      document.addEventListener('pointerup', () => {
        this.updateSlider(this.value, this.getRoundLeftPercents(this.value));
        this.elem.classList.remove('slider_dragging');
        this.elem.dispatchEvent(new CustomEvent('slider-change', { detail: this.value, bubbles: true }));
        document.removeEventListener('pointermove', onPointerMove);
        document.onpointerup = null;
      }, { once: true });
    });
  }
}
