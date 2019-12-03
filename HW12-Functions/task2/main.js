const calculateSum = (longerArr, shorterArr) => {
  const result = [];
  for (let i = 0; i < longerArr.length; i++) {
    let value = parseInt(longerArr[i]) + parseInt(shorterArr[i]);
    if (value > 9) {
      value = parseInt(value.toString().split('').reverse()[0]);
      result.push(value);
      longerArr[i + 1] ? longerArr.splice(i + 1, 1, parseInt(longerArr[i + 1]) + 1) : longerArr.push(1);
    } else if (value < 10) {
      result.push(value);
    } else {
      result.push(parseInt(longerArr[i]));
    }
  }
  return result;
};

const getSum = (str1, str2) => {
  if (typeof (str1) === 'string' && typeof (str2) === 'string') {
    let longerStringAsArr;
    let shorterStringAsArr;
    if (str1.length > str2.length) {
      longerStringAsArr = str1.split('');
      shorterStringAsArr = str2.split('');
    } else {
      longerStringAsArr = str2.split('');
      shorterStringAsArr = str1.split('');
    }
    return calculateSum(longerStringAsArr.reverse(), shorterStringAsArr.reverse()).reverse().join('');
  } else {
    return 'Invalid input';
  }
};

document.write(getSum('123', '324'));
