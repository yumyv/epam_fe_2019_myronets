function calculateFibByRecursion(sequenceLength) {
  return sequenceLength <= 1 ? sequenceLength : calculateFibByRecursion(sequenceLength - 1) + calculateFibByRecursion(sequenceLength - 2);
}

function calculateFibByCycle(sequenceLength) {
  let a = 1;
  let b = 0;
  let buffer;
  while (sequenceLength > 0) {
    buffer = a;
    a = a + b;
    b = buffer;
    sequenceLength--;
  }
  return b;
}

const bench = (fn, value) => {
  const start = Date.now();
  fn(value);
  const finish = Date.now();
  return finish - start;
};

console.log(bench(calculateFibByRecursion,30));
console.log(bench(calculateFibByCycle, 20000));

// Recursion can be slower than iteration because, in addition to processing the loop content,
// it has to deal with the recursive call stack frame, which will mean more code is run, which
// means it will be slower.
