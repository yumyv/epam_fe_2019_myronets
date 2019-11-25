let message;
const login = 'Maks';

login === 'Maks' ? message = 'Hi, Maks' : login === 'Serg' ? message = 'Hi, Serg' : login === '' ? message = 'Hi, undefined' : message = '';

switch (login) {
  case 'Maks':
    message = 'Hi, Maks';
    break;
  case 'Serg':
    message = 'Hi, Serg';
    break;
  case '':
    message = 'Hi, undefined';
    break;
  default:
    message = '';
}

console.log(message);
