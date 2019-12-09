const dotenv = require('dotenv');
dotenv.config();
const params = require('./params');
let port_server, host;
let ambient = process.env.NODE_ENV;

const enviroment = () => {
  let base_url = '';
  let api_url = '/kaizen/api';
  if (ambient !== 'production') {
    //port = params.dev.port;
    port_server = params.dev.port_server;
    host = params.dev.host;
    base_url = 'http://' + host + ':' + port_server;
  } else {
    //port = params.prod.port;
    port_server = params.prod.port_server;
    host = params.prod.host;
    base_url = 'http://' + host + ':' + port_server;
  }
  return { base_url, api_url };
};

let url = enviroment();
export default url;
