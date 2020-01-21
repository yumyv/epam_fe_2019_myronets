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
  if (typeof title === 'string') {
    return /^[A-Z][\w\s!:\-?.,]{6,60}$/.test(title);
  } else {
    return false;
  }
};
