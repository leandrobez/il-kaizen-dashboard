const dotenv = require('dotenv');

//initialize dotenv
dotenv.config();
let ambient = 'production';
let port = process.env.PORT;
const enviroment = () => {
  let base_url = '';
  let api_url = '/kaizen/api';
  //if (process.env.NODE_ENV !== 'production') {
  if (ambient !== 'production') {
    base_url = 'http://localhost:' + port;
  } else {
    base_url = 'http://138.68.56.227:3000';
  }
  return { base_url, api_url };
};

let url = enviroment();
export default url;
