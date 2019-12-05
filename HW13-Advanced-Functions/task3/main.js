const sum = (...args) => {
  let result = 0;
  args.forEach((e) => {
    result += e;
  });
  return result;
};

const applyAll = (func, ...args) => {
  return func.apply(this, args);
};

// function applyAll(func) {
//   return func.apply(this, [].slice.call(arguments, 1));
// }

document.write(applyAll(sum, 1,2,3));
