const createDOMElement = (elemType, ...elemClass) => {
  const elem = document.createElement(elemType);
  if (elemClass.length > 0) {
    elem.classList.add(...elemClass);
  }
  return elem;
};

const makeSvgPic = (imgUrl, ...svgClasses) => {
  const pic = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  pic.classList.add(...svgClasses);
  const useTag = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  useTag.setAttribute('href', imgUrl);
  pic.append(useTag);
  return pic;
};

const isValidTitle = (title) => {
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
    return !!(isNeededLength(title) &&
      isStartFromUpperCase(title) &&
      findValidChars(title));
  } else {
    return false;
  }
};
