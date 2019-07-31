/**ADMIN */

const state = {
  admin: null,
  token: ''
};

const getters = {
  getUser: state => {
    return state.admin;
  },
  getToken: () => {
    //return state.token;
    return state.token;
  }
};

const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
  setToken({ commit }, token) {
    commit('SET_TOKEN', token);
  }
};
const mutations = {
  SET_USER(state, user) {
    state.admin = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  }
};

export const admin = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
