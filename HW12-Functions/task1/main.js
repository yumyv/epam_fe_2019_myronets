const isValidItems = (arr) => {
  const result = arr.map((e) => {
    return parseFloat(e);
  });
  return result.every((e) => {
    return (typeof (e) === 'number') && (e === 25 || e === 50 || e === 100);
  });
};

const isValidFor50 = (arr, prevItem, mainResult) => {
  const isValidItem = arr.some((i) => {
    return parseInt(i) === 25;
  });
  return mainResult ? !!((prevItem === 25) || (prevItem === 50 && isValidItem)) : false;
};

const isValidFor100 = (arr, mainResult) => {
  let countOf25 = 0;
  let countOf50 = 0;
  arr.forEach((i) => {
    if (parseInt(i) === 25) {
      countOf25++;
    }
    if (parseInt(i) === 50) {
      countOf50++;
    }
  });
  return mainResult ? !!(countOf25 > 2 || (countOf25 > 0 && countOf50 > 0)) : false;
};

const isValidCalculate = (personAsArr) => {
  let result = true;
  for (let i = 0; i < personAsArr.length; i++) {
    if (parseInt(personAsArr[i]) === 25) {
      result = result !== false;
    } else if (parseInt(personAsArr[i]) === 50) {
      result = isValidFor50(personAsArr.slice(0, i + 1), parseInt(personAsArr[i - 1]), result);
    } else if (parseInt(personAsArr[i]) === 100) {
      result = isValidFor100(personAsArr.slice(0, i + 1), result);
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

document.write(tickets([25,'25',50]));
