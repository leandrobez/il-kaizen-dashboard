'use strict';

import axios from 'axios';
const dotenv = require('dotenv');

dotenv.config();
let base_url = '';
if (process.env.NODE_ENV !== 'production') {
  base_url = 'http://localhost:3000';
}
const endPoints = {
  urlAPI: '/kaizen/api/register',
  baseURL: base_url,
  points: [
    {
      name: 'create',
      path: '/create'
    },
    {
      name: 'alls',
      path: '/alls'
    },
    {
      name: 'show',
      path: '/show'
    },
    {
      name: 'update',
      path: '/update'
    },
    {
      name: 'remove',
      path: '/remove'
    }
  ]
};

const bearerToken = () => {
  return {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('_token')
    }
  };
};

const setURL = point => {
  let baseURL = endPoints.baseURL;
  let urlAPI = endPoints.urlAPI;
  let url = null;
  for (let i = 0; i < endPoints.points.length; i++) {
    if (endPoints.points[i].name == point) {
      url = endPoints.points[i].path;
      break;
    }
  }
  return baseURL + urlAPI + url;
};

const accessRegisterAPI = {
  /** @register  */
  create: data => {
    let url = setURL('create');
    return axios
      .post(url, data, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  searchRegister: id => {
    let url = setURL('show');
    return axios
      .get(url + '/' + id, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
  getRegisters: () => {
    let url = setURL('alls');
    return axios
      .get(url, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
  updateRegister: (id, data) => {
    let url = setURL('update');
    return axios
      .put(url + '/' + id, data, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
  removeRegister: id => {
    let url = setURL('remove');
    return axios
      .delete(url + '/' + id, bearerToken())
      .then(response => {
        //console.log(response);
        //const value = response.data;
        return response;
      })
      .catch(err => Promise.reject(err.message));
  }
};

export default accessRegisterAPI;
