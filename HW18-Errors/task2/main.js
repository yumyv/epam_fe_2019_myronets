function parseJSON(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

parseJSON('{"role":"Student","company":"EPAM"}');
parseJSON('role: Student, company: EPAM');
