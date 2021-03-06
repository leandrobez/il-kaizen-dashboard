'use strict';

import axios from 'axios';
import enviroment from './enviroment';

const endPoints = {
  urlAPI: '/cronogram',
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
      name: 'update',
      path: '/update'
    },
    {
      name: 'remove',
      path: '/remove'
    },
    {
      name: 'cronogram-teacher',
      path: '/cronogram/teacher'
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
  if (point == 'login' || point == 'logout') {
    return baseURL + '/kaizen/api' + url;
  }
  return baseURL + urlAPI + url;
};

const accessCronogramAPI = {
  /** @cronogram  */
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
  searchCronogram: id => {
    let url = setURL('show');
    return axios
      .get(url + '/' + id, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
  getCronogram: () => {
    let url = setURL('alls');
    return axios
      .get(url, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
  getCronogramTeacher: teacher => {
    let url = setURL('cronogram-teacher');
    return axios
      .get(url + '/' + teacher, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
  updateCronogram: (id, data) => {
    let url = setURL('update');
    return axios
      .put(url + '/' + id, data, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
  removeCronogram: id => {
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

export default accessCronogramAPI;
