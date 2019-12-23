window.onerror = function () {
  console.log('error');
};

function parseJSON(json) {
  try {
    if (JSON.parse(json).name && JSON.parse(json).company) {
      console.log(JSON.parse(json));
    }
  } catch {
    throw new Error();
  }
}

parseJSON('{"name":"Student","company":"EPAM"}');
parseJSON('{"role: Student","company":"EPAM"}');
