import {Slider} from './Slider';

function LatestPortfolioSlider(selector, autoScrollTime = 0, animationShift) {
  Slider.apply(this, arguments);

  this.onComponentsLoading = function () {
    this.slideWrapper = this.selector.querySelector('.portfolio-slider__list');
    this.leftArrow = this.selector.querySelector('.portfolio-slider__btn--prev');
    this.rightArrow = this.selector.querySelector('.portfolio-slider__btn--next');
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
      this.slideIncrease(e.target);
    }, false);
    this.selector.addEventListener('mouseup', (e) => {
      this.sliderReduce(e.target);
    }, false);
  };

  this.slideIncrease = function (target) {
    if (target.closest('.portfolio-slider__item')) {
      target.closest('.portfolio-slider__item').style.transition = 'all 0.5s linear';
      target.closest('.portfolio-slider__item').style.transform = 'scale(1.2)';
    }
  };

  this.sliderReduce = function (target) {
    if (target.closest('.portfolio-slider__item')) {
      target.closest('.portfolio-slider__item').style.transform = 'scale(1)';
    }
  };

  this.init = function () {
    this.onComponentsLoading();
    this.onBindEvents();
    this.onCreate();
  };
}

export {LatestPortfolioSlider};
