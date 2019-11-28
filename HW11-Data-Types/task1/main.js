const validateTitle = (title) => {
  const isNeededLength = (str) => {
    return str.length > 2 && str.length < 20;
  };

  const isStartFromUpperCase = (str) => {
    const startUpperCharsUnicode = 65;
    const endUpperCharsUnicode = 90;
    return str.charCodeAt(0) >= startUpperCharsUnicode &&
      str.charCodeAt(0) <= endUpperCharsUnicode;
  };

  const isValidChars = (char) => {
    const validSpecialSymbols = (arr, symbol) => {
      return arr.some((s) => {
        return s === symbol;
      });
    };

    const validSymbol = [97, 122, 65, 90];
    const specialSymbols = [32, 33, 44, 45, 46, 58, 63];

    char = char.charCodeAt(0);
    return (char >= validSymbol[2] &&
      char <= validSymbol[3]) ||
      (char >= validSymbol[0] &&
        char <= validSymbol[1]) ||
      validSpecialSymbols(specialSymbols, char);
  };

  const findValidChars = (str) => {
    const arr = str.split('');
    let result = true;
    for (let i = 0; i < arr.length; i++) {
      if (!isValidChars(arr[i])) {
        result = false;
        break;
      }
    }
    return result;
  };

  if (typeof title === 'string') {
    if (isNeededLength(title) &&
      isStartFromUpperCase(title) &&
      findValidChars(title)) {
      return 'Valid';
    } else {
      return 'Invalid';
    }
  } else {
    return 'Incorrect input data';
  }
};

document.write(validateTitle('Title!'));
