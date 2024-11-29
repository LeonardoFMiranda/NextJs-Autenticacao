const jwt = require('jsonwebtoken');

const SECRET_KEY = '29847dhasuodnsjkazxcnjkasdh789123y';

const nossoToken = jwt.sign(
    {
      name: 'Mario',
    },
    SECRET_KEY,
    {
      expiresIn: '1y',
      subject: '1'
    }
);
console.log(nossoToken);
const TOKEN_GERADO = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFyaW8iLCJpYXQiOjE3MzI4OTMyMDEsImV4cCI6MTc2NDQ1MDgwMSwic3ViIjoiMSJ9.F9wY1DFr0hh8yI4oFXnkgT7VLgbOoeCXgEO_MfbwWv0';


console.log(jwt.verify(TOKEN_GERADO, SECRET_KEY));
// console.log(jwt.decode(nossoToken));
