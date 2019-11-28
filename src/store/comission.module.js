/**comission */

const state = {
  comission: [
    {
      teacher: null,
      contents: [
        {
          month: null,
          schedule: []
        }
      ]
    }
  ]
};

const getters = {
  getComission: state => {
    return state.comission;
  }
};

const actions = {
  setComission({ commit }, comission) {
    commit('SET_COMISSION', comission);
  }
};

const mutations = {
  SET_COMISSION(state, comission) {
    if (state.comission.length == 1) {
      if (state.comission[0].teacher === null) {
        //first insertion
        state.comission[0] = comission[0];
      } else {
        //check teacher
        if (state.comission[0].teacher == comission[0].teacher) {
          //same teacher
          state.comission[0].contents = comission[0].contents;
        } else {
          //other teacher
          let newComission = comission[0];
          state.comission.push(newComission);
        }
      }
    } else {
      //search teacher
      let indexComission = state.comission.findIndex(element => {
        return element.teacher == comission[0].teacher;
      });
      if (indexComission) {
        //same teacher
        state.comission[indexComission].contents = comission[0].contents;
      } else {
        //other teacher
        let newComission = comission[0];
        state.comission.push(newComission);
      }
    }
  }
};

export const comission = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
