const complexFunction = (arg1, arg2) => {
  return arg1 + arg2;
};

const cache = function (func) {
  const cache = {};
  return function (...args) {
    return args in cache ? cache[args] : cache[args] = func.apply(this, args);
  };
};

const cachedFunction = cache(complexFunction);

document.write(cachedFunction(1,2));
