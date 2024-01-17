import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.updateSlider(this.value);
    this.addEventListeners();
  }

  render() {
    let stepSlider = createElement(
      `<div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
      </div>`
    );
    
    let sliderSteps = stepSlider.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      let step = document.createElement('span');
      if (i === this.value) step.classList.add('slider__step-active');
      sliderSteps.appendChild(step);
    }

    return stepSlider;
  }

  addEventListeners() {
    this.elem.addEventListener('click', event => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      this.updateSlider(this.value);
  
      let sliderChangeEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
      this.elem.dispatchEvent(sliderChangeEvent);
    });
  }

  updateSlider(value) {
    let segments = this.steps - 1;
    let percentage = (value / segments) * 100;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');
    
    thumb.style.left = `${percentage}%`;
    progress.style.width = `${percentage}%`;
    sliderValue.textContent = value;

    this.displayActiveStep(value);
  }

  displayActiveStep(value) {
    let sliderSteps = this.elem.querySelectorAll('.slider__steps span');
    sliderSteps.forEach(step => step.classList.remove('slider__step-active'));
    sliderSteps[value].classList.add('slider__step-active');
  }
}
