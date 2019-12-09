'use strict';

import axios from 'axios';

import enviroment from './enviroment';

const endPoints = {
  urlAPI: '/payment',
  baseURL: enviroment.base_url,
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
      name: 'showMonth',
      path: '/show/month'
    },
    {
      name: 'update',
      path: '/update'
    },
    {
      name: 'updateMultiple',
      path: '/update/pay'
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
  let urlAPI = enviroment.api_url + endPoints.urlAPI;
  let url = null;
  for (let i = 0; i < endPoints.points.length; i++) {
    if (endPoints.points[i].name == point) {
      url = endPoints.points[i].path;
      break;
    }
  }
  return baseURL + urlAPI + url;
};

const accessPaymentAPI = {
  /** @payments */
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
  searchPayment: id => {
    let url = setURL('show');
    return axios
      .post(url + '/' + id, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  searchPaymentMonth: m => {
    let url = setURL('showMonth');
    return axios
      .get(url + '/' + m, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  getPayments: () => {
    let url = setURL('alls');
    return axios
      .get(url, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  updatePayment: (id, data) => {
    let url = setURL('update');
    return axios
      .put(url + '/' + id, data, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  updateMultiplePayment: (id, data) => {
    let url = setURL('updateMultiple');
    return axios
      .put(url + '/' + id, data, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  removePayment: id => {
    let url = setURL('remove');
    return axios
      .delete(url + '/' + id, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  }
};

export default accessPaymentAPI;
