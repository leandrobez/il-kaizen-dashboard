/**cronogram */

const state = {
  cronogram: {
    teacher: null,
    month: null,
    schedule: [
      {
        day: null,
        events: [
          {
            details: {
              timeKey: 0,
              start: '07',
              end: '08',
              class: 'corealign'
            },
            students: []
          }
        ]
      }
    ]
  }
};

const getters = {
  getCronogram: state => {
    return state.cronogram;
  },
  getSchedule: state => {
    return state.cronogram.schedule;
  }
};

const actions = {
  setCronogram({ commit }, cronogram) {
    commit('SET_CRONOGRAM', cronogram);
  }
};
const mutations = {
  SET_CRONOGRAM(state, cronogram) {
    state.cronogram = cronogram;
  }
};

export const cronogram = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
