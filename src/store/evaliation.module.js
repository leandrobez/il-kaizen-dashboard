/**evaliation */

const state = {
  evaliation: [
    {
      student: null,
      contents: [
        {
          data: null,
          result: {}
        }
      ]
    }
  ],
  currentStudent: null
};

const getters = {
  getEvaliation: state => {
    return state.evaliation;
  },
  getSpecificEvaliation: state => (student, data) => {
    if (student) {
      let evaliation = [];
      let indexEvaliation = state.evaliation.findIndex(element => {
        return element.student == student;
      });
      if (indexEvaliation !== -1) {
        evaliation = state.evaliation[indexEvaliation];
        let indexContent = evaliation.contents.findIndex(ele => {
          return ele.data == data;
        });
        if (indexContent !== -1) {
          evaliation.contents =
            state.evaliation[indexEvaliation].contents[indexContent];
          return evaliation;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  getStudent: state => {
    return state.currentStudent;
  }
};

const actions = {
  setEvaliation({ commit }, evaliation) {
    commit('SET_EVALIATION', evaliation);
  },
  setCurrentStudent({ commit }, student) {
    commit('SET_STUDENT', student);
  }
};
const mutations = {
  SET_EVALIATION(state, evaliation) {
    state.evaliation = evaliation;
  },
  SET_STUDENT(state, student) {
    state.currentStudent = student;
  }
};

export const evaliation = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
