'use strict';

import axios from 'axios';
const dotenv = require('dotenv');

dotenv.config();
let base_url = '';
if (process.env.NODE_ENV !== 'production') {
  base_url = 'http://localhost:3000';
}

const endPoints = {
  urlAPI: '/kaizen/api/expenses',
  baseURL: base_url
};

const bearerToken = () => {
  return {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('_token')
    }
  };
};

const setURL = (point, type) => {
  let baseURL = endPoints.baseURL;
  let urlAPI = endPoints.urlAPI;
  let url = `/${type}/${point}`;
  return baseURL + urlAPI + url;
};

const accessExpensesFixedAPI = {
  /** @create */
  create: data => {
    let url = setURL('create', 'fixed');
    return axios
      .post(url, data, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  searchFixed: id => {
    let url = setURL('show', 'fixed');
    return axios
      .get(url + '/' + id, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  getFixed: () => {
    let url = setURL('alls', 'fixed');
    return axios
      .get(url, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  searchFixedMonth: m => {
    let url = setURL('show/month', 'fixed');
    return axios
      .get(url + '/' + m, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  updateFixed: (id, data) => {
    let url = setURL('update','fixed');
    return axios
      .put(url + '/' + id, data, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
};

const accessExpensesVariableAPI = {
  /** @create */
  create: data => {
    let url = setURL('create', 'variable');
    return axios
      .post(url, data, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  searchVariable: id => {
    let url = setURL('show', 'variable');
    return axios
      .get(url + '/' + id, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  getVariable: () => {
    let url = setURL('alls', 'variable');
    return axios
      .get(url, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  searchVariableMonth: m => {
    let url = setURL('show/month', 'variable');
    return axios
      .get(url + '/' + m, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  updateVariable: (id, data) => {
    let url = setURL('update','variable');
    return axios
      .put(url + '/' + id, data, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
};

const accessExpensesExtraAPI = {
  /** @create */
  create: data => {
    let url = setURL('create', 'extra');
    return axios
      .post(url, data, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  searchExtra: id => {
    let url = setURL('show', 'extra');
    return axios
      .get(url + '/' + id, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  getExtra: () => {
    let url = setURL('alls', 'extra');
    return axios
      .get(url, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  searchExtraMonth: m => {
    let url = setURL('show/month', 'extra');
    return axios
      .get(url + '/' + m, bearerToken())
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err.message);
      });
  },
  updateExtra: (id, data) => {
    let url = setURL('update','extra');
    return axios
      .put(url + '/' + id, data, bearerToken())
      .then(response => {
        const value = response.data;
        return value;
      })
      .catch(err => Promise.reject(err.message));
  },
};

const apiExpense = {
  accessExpensesFixedAPI,
  accessExpensesVariableAPI,
  accessExpensesExtraAPI
};
export default apiExpense;
