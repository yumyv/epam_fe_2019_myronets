class LatestPortfolioSlider extends Slider {
  constructor(selector, autoScrollTime = 0, autoStop = false) {
    super(selector);
    this.autoScrollTime = autoScrollTime;
    this.autoStop = autoStop;
    this.isAnimation = false;
    this.clickStartX = 0;
    this.clickEndX = 0;
  }

  onComponentsLoading() {
    this.slideWrapper = this.selector.querySelector('.portfolio-slider__list');
    this.leftArrow = this.selector.querySelector('.portfolio-slider__btn--prev');
    this.rightArrow = this.selector.querySelector('.portfolio-slider__btn--next');
  }

  onBindEvents() {
    this.rightArrow.addEventListener('click', () => this.animateLeft());
    this.leftArrow.addEventListener('click', () => this.animateRight());
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
      this.handleSwipe();
    }, false);
  }

  onCreate() {
    if (this.autoScrollTime > 0) {
      setInterval(() => {
        if (this.autoStop) {
          return;
        }
        this.animateLeft();
      }, this.autoScrollTime);
    }
  }

  animateLeft() {
    const ANIMATION_SHIFT = -17;
    if (this.isAnimation) {
      return;
    }
    this.isAnimation = true;
    const values = {startValue: 0, endValue: `${ANIMATION_SHIFT}`, time: 1000};
    this.animation(values,
      (value) => {
        this.slideWrapper.style.transform = `translateX(${value}%)`;
      }, () => {
        if (this.slideWrapper.firstElementChild) {
          this.slideWrapper.appendChild(this.slideWrapper.firstElementChild);
          this.slideWrapper.style.transform = '';
          this.isAnimation = false;
        }
      });
  }

  animateRight() {
    const ANIMATION_SHIFT = 17;
    if (this.isAnimation) {
      return;
    }
    this.isAnimation = true;
    this.slideWrapper.style.transform = `translateX(-${ANIMATION_SHIFT}%)`;
    if (this.slideWrapper.firstElementChild) {
      this.slideWrapper.insertBefore(
        this.slideWrapper.lastElementChild,
        this.slideWrapper.firstElementChild,
      );
    }
    const values = {startValue: parseInt(`-${ANIMATION_SHIFT}`), endValue: 0, time: 1000};
    this.animation(values,
      (value) => {
        this.slideWrapper.style.transform = `translateX(${value}%)`;
      }, () => {
        this.slideWrapper.style.transform = '';
        this.isAnimation = false;
      });
  }

  handleSwipe() {
    const VALUE_FOR_SWIPE = 100;
    if ((this.clickStartX - this.clickEndX) > VALUE_FOR_SWIPE) {
      this.animateLeft();
    }
    if ((this.clickEndX - this.clickStartX) > VALUE_FOR_SWIPE) {
      this.animateRight();
    }
  }

  init() {
    this.onComponentsLoading();
    this.onBindEvents();
    this.onCreate();
  }
}
