import moment from 'moment';

const timeIsMoney = moment();
const hours = [7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19];
//set locale fr Brazil
timeIsMoney.locale('pt-br');
let configToday = {
  data: timeIsMoney.format('D') + ' de ' + timeIsMoney.format('MMMM'),
  activeDay: +timeIsMoney.format('D'),
  day: timeIsMoney.get('date'),
  month: timeIsMoney.format('MMMM'),
  weeksDay: timeIsMoney._locale._weekdaysShort,
  daysInMonth: timeIsMoney.daysInMonth(),
  firstDayMonth: timeIsMoney.startOf('month')._d.getDay(),
  lastDayMonth: timeIsMoney.endOf('month')._d.getDay()
};

const teacherSchedule = {
  makeStructure: () => {
    //alert(configToday.firstDayMonth);
    //create structure form sho days week and month
    const getWeeksZero = () => {
      const daysTotal = 7;
      let week = [],
        weeks = [];
      switch (configToday.firstDayMonth) {
        case 0:
          for (let i = 0; i < daysTotal; i++) {
            week.push(i + 1);
          }
          weeks.push(week);
          break;
        default:
          for (let i = 0; i < daysTotal; i++) {
            if (i < configToday.firstDayMonth - 1) {
              week.push('-');
            } else {
              week.push(i);
            }
          }
          /*for (let i = configToday.firstDayMonth; i < daysTotal; i++) {
            week.push(i + 1);
          }*/
          weeks.push(week);
          break;
      }
      return weeks;
    };
    const getOtherWeeks = weeks => {
      let structure = [],
        start = 0,
        pos = weeks[0][6] + 1;
      structure.push(weeks[0]);
      weeks = [];
      for (let u = pos; u < parseInt(configToday.daysInMonth); u++) {
        if (start > 6) {
          structure.push(weeks);
          weeks = [];
          weeks.push(u);
          start = 1;
        } else {
          weeks.push(u);
          start++;
        }
      }

      return structure;
    };
    const getStructure = allWeeks => {
      let totalD = allWeeks[allWeeks.length - 1][6];
      if (totalD < configToday.daysInMonth) {
        let nextDay = totalD + 1,
          weeks = [];
        for (let r = 0; r <= 6; r++) {
          if (nextDay <= configToday.daysInMonth) {
            weeks.push(nextDay);
            nextDay++;
          } else {
            weeks.push('');
          }
        }
        allWeeks.push(weeks);
      }
      return allWeeks;
    };
    let weeks = getWeeksZero(),
      allWeeks = getOtherWeeks(weeks);
    //console.log(configToday);
    return getStructure(allWeeks);
  },
  getCurrentDate: () => {
    return configToday.data;
  },
  getCurrentDay: () => {
    return configToday.day;
  },
  getCurrentMonth: () => {
    return configToday.month;
  },
  getToday: () => {
    return configToday.day;
  },
  getActiveDay: () => {
    return configToday.activeDay;
  },
  getHours: () => {
    let list = [];
    const getZero = h => {
      if (h < 10) {
        return `0${h}`;
      }
      return h;
    };
    hours.forEach(hour => {
      list.push({
        start: getZero(hour),
        end: getZero(hour + 1)
      });
    });
    return list;
  },
  setActiveDay: d => {
    configToday.activeDay = d;
    //console.log(configToday);
  }
};

export default teacherSchedule;
