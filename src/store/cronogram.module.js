/**cronogram */

const state = {
  cronogram: [
    {
      teacher: null,
      contents: [
        {
          month: null,
          schedule: []
        }
      ]
    }
  ],
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
  getCronogram: state => {
    return state.cronogram;
  },
  getComission: state => {
    return state.comission;
  },
  getSchedule: state => {
    return state.cronogram.schedule;
  },
  getSpecificCronogram: state => (teacher, month, day) => {
    if (teacher) {
      let cronogram = [];
      let indexCronogram = state.cronogram.findIndex(element => {
        return element.teacher == teacher;
      });
      if (indexCronogram !== -1) {
        cronogram[0] = {
          teacher: teacher,
          contents: []
        };
        let indexContent = state.cronogram[indexCronogram].contents.findIndex(
          ele => {
            return ele.month == month;
          }
        );
        if (indexContent !== -1) {
          cronogram[0].contents[0] = {
            month: month,
            schedule: []
          };
          let indexSchedule = state.cronogram[indexCronogram].contents[
            indexContent
          ].schedule.findIndex(el => {
            return el.day == day;
          });
          if (indexSchedule !== -1) {
            cronogram[0].contents[0].schedule[0] = {
              day: day,
              events:
                state.cronogram[indexCronogram].contents[indexContent].schedule[
                  indexSchedule
                ]
            };
          }
        }
      }
      if (cronogram.length > 0) {
        return cronogram;
      }
      return [
        {
          teacher: null,
          contents: [
            {
              month: null,
              schedule: []
            }
          ]
        }
      ];
    } else {
      return [
        {
          teacher: null,
          contents: [
            {
              month: null,
              schedule: []
            }
          ]
        }
      ];
    }
  }
};

const actions = {
  setCronogram({ commit }, cronogram) {
    commit('SET_CRONOGRAM', cronogram);
  },
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
  },
  SET_CRONOGRAM(state, cronogram) {
    if (state.cronogram.length == 1) {
      if (state.cronogram[0].teacher === null) {
        //first insertion
        state.cronogram[0] = cronogram[0];
      } else {
        //check teacher
        if (state.cronogram[0].teacher == cronogram[0].teacher) {
          //same teacher
          state.cronogram[0].contents = cronogram[0].contents;
        } else {
          //other teacher
          let newCronogram = cronogram[0];
          state.cronogram.push(newCronogram);
        }
      }
    } else {
      //search teacher
      let indexCronogram = state.cronogram.findIndex(element => {
        return element.teacher == cronogram[0].teacher;
      });
      if (indexCronogram) {
        //same teacher
        state.cronogram[indexCronogram].contents = cronogram[0].contents;
      } else {
        //other teacher
        let newCronogram = cronogram[0];
        state.cronogram.push(newCronogram);
      }
    }
  }
};

export const cronogram = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
