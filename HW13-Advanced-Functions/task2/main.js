const ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    return this.step;
  },
};

document.write(ladder.up().up().down().up().showStep());
