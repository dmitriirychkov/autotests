const fetch = require('node-fetch');

let url = 'https://bookstore.demoqa.com/Account/v1/User';

let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', 
    'User-Agent': 'insomnia/9.3.2'
  },
  body: '{"userName":"your_username97","password":"Your_Password123!"}'
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));