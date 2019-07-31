/**STUDENTS */

const state = {
    students: [],
    token: ''
  };
  
  const getters = {
    getStudents: state => {
      return state.students;
    },
    getToken: () => {
      return state.token;
    }
  };
  
  const actions = {
    setStudent({ commit }, user) {
      commit('SET_STUDENT', user);
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    }
  };
  const mutations = {
    SET_STUDENT(state, students) {
      state.students = students;
    },
    SET_TOKEN(state, token) {
      state.token = token || localStorage.getItem('_token');
    }
  };
  
  export const student = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
  };
  