/**ALERTS */

const state = {
    type: null,
    message: null
};

const actions = {
    success({ commit }, message) {
        commit('SUCCESS', message);
    },
    warning({ commit }, message) {
        commit('WARNING', message);
    },
    danger({ commit }, message) {
        commit('DANGER', message);
    },
    clear({ commit }, message) {
        commit('CLEAR', message);
    }
};

const mutations = {
    SUCCESS(state, message) {
        state.type = 'il-alert--success';
        state.message = message;
    },
    WARNING(state, message) {
        state.type = 'il-alert--warning';
        state.message = message;
    },
    DANGER(state, message) {
        state.type = 'il-alert--danger';
        state.message = message;
    },
    CLEAR(state) {
        setTimeout(() => {
            state.type = null;
            state.message = null;
        }, 4500);
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};
