/**PAYMENTS */

const state = {
  payments: []
};

const getters = {
  getPayments: state => {
    return state.payments;
  }
};

const actions = {
  setPayments({ commit }, payments) {
    commit('SET_PAYMENT', payments);
  }
};
const mutations = {
  SET_PAYMENT(state, payments) {
    state.payments = payments;
  }
};

export const payment = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
