'use strict';

import axios from 'axios';

import enviroment from './enviroment';

const endPoints = {
  urlAPI: '/admin',
  baseURL: enviroment.base_url,
  points: [
    {
      name: 'login',
      path: '/authenticate/login'
    },
    {
      name: 'logout',
      path: '/authenticate/logout'
    },
    {
      name: 'register',
      path: '/register'
    },
    {
      name: 'show',
      path: '/show'
    },
    {
      name: 'alls',
      path: '/alls'
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
  console.log(enviroment)
  let baseURL = endPoints.baseURL;
  let urlAPI = enviroment.api_url + endPoints.urlAPI;
  let url = null;
  for (let i = 0; i < endPoints.points.length; i++) {
    if (endPoints.points[i].name == point) {
      url = endPoints.points[i].path;
      break;
    }
  }
  if (point == 'login' || point == 'logout') {
    return baseURL + '/kaizen/api' + url;
  }
  return baseURL + urlAPI + url;
};

const accessAdminAPI = {
  /** @admins */
  login: async data => {
    let url = setURL('login');

    return axios
      .post(url, data)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  logout: async () => {
    let url = setURL('logout');
    return axios
      .get(url)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  register: data => {
    let url = setURL('register');
    return axios
      .post(url, data, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  searchAdmin: id => {
    let url = setURL('show');
    return axios
      .get(url + '/' + id, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
  getAdmin: () => {
    let url = setURL('alls');
    return axios
      .get(url, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
  updateAdmin: (id, data) => {
    let url = setURL('update');
    return axios
      .put(url + '/' + id, data, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
  removeAdmin: id => {
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

export default accessAdminAPI;
