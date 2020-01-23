import {Slider} from './Slider';
import {createDOMElement} from '../functions/functions';

function TestimonialsSlider(selector, autoScrollTime = 0, animationShift) {
  Slider.apply(this, arguments);
  this.clickStartX = 0;
  this.clickEndX = 0;

  this.onComponentsLoading = function () {
    this.slideWrapper = this.selector.querySelector('.testimonials-slider__list');
    this.leftArrow = this.selector.querySelector('.testimonials-slider__btn--prev');
    this.rightArrow = this.selector.querySelector('.testimonials-slider__btn--next');
  };

  this.onBindEvents = function () {
    this.rightArrow.addEventListener('click', () => this.animateLeft(this.animationShift));
    this.leftArrow.addEventListener('click', () => this.animateRight(this.animationShift));
    this.selector.addEventListener('mouseenter', () => {
      this.autoStop = true;
    });
    this.selector.addEventListener('mouseleave', () => {
      this.autoStop = false;
    });
    this.selector.addEventListener('mousedown', (e) => {
      this.clickStartX = e.clientX;
    }, false);
    this.selector.addEventListener('mouseup', (e) => {
      this.clickEndX = e.clientX;
      this.handleSwipe(e.target);
    }, false);
  };

  this.handleSwipe = function (target) {
    const VALUE_FOR_SWIPE = 50;
    if ((this.clickStartX - this.clickEndX) > VALUE_FOR_SWIPE) {
      this.animateLeft(this.animationShift);
      this.previewNextSlide(target);
    }
    if ((this.clickEndX - this.clickStartX) > VALUE_FOR_SWIPE) {
      this.animateRight(this.animationShift);
      this.previewPrevSlide(target);
    }
  };

  this.previewNextSlide = function (target) {
    if (target.closest('.testimonials-slider__item')) {
      const preview = createDOMElement('div', 'testimonials-post__preview');
      const text = createDOMElement('p', 'testimonials-post__preview-text');
      text.innerText = 'Next slide';
      text.style.fontSize = '36px';
      preview.append(text);
      preview.append(target.closest('.testimonials-slider__item').nextSibling.cloneNode(true));
      preview.style.position = 'absolute';
      this.selector.append(preview);
      setTimeout(() => {
        this.selector.removeChild(preview);
      }, 1000);
    }
  };

  this.previewPrevSlide = function (target) {
    if (target.closest('.testimonials-slider__item')) {
      const preview = createDOMElement(
        'div', 'testimonials-post__preview', 'testimonials-post__preview--prev',
      );
      const text = createDOMElement('p', 'testimonials-post__preview-text');
      text.innerText = 'Previous slide';
      text.style.fontSize = '36px';
      preview.append(text);
      preview.append(target.closest('.testimonials-slider__item').previousSibling.cloneNode(true));
      preview.style.position = 'absolute';
      this.selector.append(preview);
      setTimeout(() => {
        this.selector.removeChild(preview);
      }, 1000);
    }
  };

  this.init = function () {
    this.onComponentsLoading();
    this.onBindEvents();
    this.onCreate();
  };
}

export {TestimonialsSlider};
