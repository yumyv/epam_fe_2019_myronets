function Slider(selector, autoScrollTime, animationShift) {
  this.selector = document.querySelector(selector);
  this.autoScrollTime = autoScrollTime;
  this.autoStop = false;
  this.isAnimation = false;
  this.animationShift = animationShift;

  this.onCreate = function () {
    if (this.autoScrollTime > 0) {
      setInterval(() => {
        if (this.autoStop) {
          return;
        }
        this.animateLeft(this.animationShift);
      }, this.autoScrollTime);
    }
  };

  this.animateLeft = function (animationShift) {
    if (this.isAnimation) {
      return;
    }
    this.isAnimation = true;
    const values = {startValue: 0, endValue: `${-animationShift}`, time: 1000};
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
  };

  this.animateRight = function (animationShift) {
    if (this.isAnimation) {
      return;
    }
    this.isAnimation = true;
    this.slideWrapper.style.transform = `translateX(-${animationShift}%)`;
    if (this.slideWrapper.firstElementChild) {
      this.slideWrapper.insertBefore(
        this.slideWrapper.lastElementChild,
        this.slideWrapper.firstElementChild,
      );
    }
    const values = {startValue: parseInt(`-${animationShift}`), endValue: 0, time: 1000};
    this.animation(values,
      (value) => {
        this.slideWrapper.style.transform = `translateX(${value}%)`;
      }, () => {
        this.slideWrapper.style.transform = '';
        this.isAnimation = false;
      });
  };

  this.animation = function (valuesAsObj, onFrame, onend) {
    const FRAME_TIME = 15;
    const frames = valuesAsObj.time / FRAME_TIME;
    const step = (valuesAsObj.endValue - valuesAsObj.startValue) / frames;
    const up = valuesAsObj.endValue > valuesAsObj.startValue;

    const conditionForZeroing = () => {
      if ((up && valuesAsObj.startValue >= valuesAsObj.endValue) || (!up && valuesAsObj.startValue <= valuesAsObj.endValue)) {
        clearInterval(inter);
        valuesAsObj.startValue = valuesAsObj.endValue;
      }
    };
    const terminationCondition = () => {
      onFrame(valuesAsObj.startValue);
      if (valuesAsObj.startValue === valuesAsObj.endValue && onend) {
        onend();
      }
    };

    const inter = setInterval(() => {
      valuesAsObj.startValue += step;
      conditionForZeroing();
      terminationCondition();
    }, FRAME_TIME);
  };
}
