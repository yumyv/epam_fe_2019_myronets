class Slider extends Module {
  animation(valuesAsObj, onFrame, onend) {
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
  }
}
