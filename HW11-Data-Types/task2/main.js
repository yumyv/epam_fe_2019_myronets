function sum(value1, value2) {
  const isNeededDivisible = (value) => {
    value = parseFloat(value);
    if (value % 3 === 0 && value % 5 === 0) {
      const minus = -1;
      return value * minus;
    } else {
      return value;
    }
  };

  const isBothTypesOfSting = (val1, val2) => {
    return typeof (val1) === 'string' && typeof (val2) === 'string';
  };
  const isBothTypesOfNumber = (val1, val2) => {
    return typeof (val1) === 'number' && typeof (val2) === 'number';
  };

  if (!isBothTypesOfSting(value1, value2) &&
    !isBothTypesOfNumber(value1, value2)) {
    const result = isNeededDivisible(value1) + isNeededDivisible(value2);
    if (result) {
      return result;
    } else {
      return 'invalid input';
    }
  } else {
    return 'invalid input: similar types';
  }
}

document.write(sum('25', 15));
