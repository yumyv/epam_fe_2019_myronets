let countOf25 = 0;
let countOf50 = 0;

const isValidItems = (arr) => {
  const result = arr.map((e) => {
    return parseFloat(e);
  });
  return result.every((e) => {
    return (typeof (e) === 'number') && (e === 25 || e === 50 || e === 100);
  });
};

const isValidFor50 = (mainResult) => {
  if (mainResult) {
    if (countOf25 > 0) {
      countOf25--;
      countOf50++;
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const isValidFor100 = (mainResult) => {
  if (mainResult) {
    if (countOf25 > 2) {
      countOf25 -= countOf25 * 3;
      return true;
    } else if (countOf25 > 0 && countOf50 > 0) {
      countOf25--;
      countOf50--;
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const isValidCalculate = (personAsArr) => {
  let result = true;
  for (let i = 0; i < personAsArr.length; i++) {
    if (parseInt(personAsArr[i]) === 25) {
      countOf25++;
      result = result !== false;
    } else if (parseInt(personAsArr[i]) === 50) {
      result = isValidFor50(result);
    } else if (parseInt(personAsArr[i]) === 100) {
      result = isValidFor100(result);
    }
  }
  return result;
};

const tickets = (person) => {
  let result;
  if (Array.isArray(person) && isValidItems(person)) {
    result = isValidCalculate(person) ? 'YES' : 'NO';
  } else {
    result = 'Invalid input';
  }
  return result;
};

document.write(tickets([25, '25', 50]));
