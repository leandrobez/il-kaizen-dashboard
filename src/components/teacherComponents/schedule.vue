<template>
<div class="il-teacher">
    <h3 class="il-color--darkblue">Agenda para {{currentMonth}}</h3>
    <div class="il-calendar" v-if="calendar.length>0">
        <ilTeacherHeader :teachers="teachers" @cronogram="getCronogram" />
        <ilDays />
        <div class="il-week--row" v-for="(row,index1) in calendar" :key="`row${index1}`">
            <span v-for="(day,index2) in row" :key="`d${index2}`">
                <span :class="setClass(day)" @click="setActiveDay(day)" :id="`day${day}`">{{day}}</span>
            </span>
        </div>
        <div class="il-calendar--header">
            <div class="il-header--teacher">
                <p class="il-teacher--active">{{splitName(teacher)}}</p>
            </div>
            <div class="il-header--details">
                <p>{{getActiveDay}} de {{currentMonth}}</p>
            </div>
        </div>
        <div class="il-calendar--cronogram" v-if="times.length>0">
            <ilCronogram :times="times" :day="activeDay" @schedule="setSchedule" />
            <div class="il-cronogram--footer" v-if="showBtnAgenda">
                <button class="il-btn il-btn--schedule" @click.prevent="confirm()">Salvar Agenda</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import teacherSchedule from '../../common/schedule.js';
import accessStudentAPI from '../../common/apiStudent.js';
import accessTeacherAPI from '../../common/apiTeacher.js';
import ilDays from './includes/days.vue';
import ilTeacherHeader from './includes/teacherHeader.vue';
import { mapActions, mapGetters } from 'vuex';
import ilCronogram from './includes/cronogram.vue';
export default {
  name: 'schedule',
  components: {
    ilDays,
    ilTeacherHeader,
    ilCronogram
  },
  data() {
    return {
      showBtnAgenda: false,
      calendar: [],
      times: [],
      currentMonth: null,
      currentDay: null,
      activeDay: null,
      keySchedule: 0,
      teacher: 'Claudia Mariko Muraguti Bezerra',
      cronogram: [
        {
          teacher: null,
          contents: []
        }
      ],
      contents: [
        {
          month: null,
          schedule: []
        }
      ],
      schedule: [
        {
          day: null,
          events: []
        }
      ],
      students: [],
      teachers: [],
      search: [],
      wordSearch: []
    };
  },
  computed: {
    getActiveDay() {
      return this.activeDay;
    }
  },
  mounted() {
    this.setStudents();
    this.setTeachers();
    this.makeStructure();
    this.getCronogramStore();
  },
  methods: {
    splitName(str) {
      let name = str.split(' ');
      return name[0];
    },
    setStudents() {
      accessStudentAPI
        .getStudents()
        .then(res => {
          if (res.error == null) {
            return res.student;
          }
          return [];
        })
        .then(value => {
          if (value.length > 0) {
            value.forEach(item => {
              this.students.push({
                id: item._id,
                name: item.name,
                listed: false
              });
            });
          }
        });
    },
    setTeachers() {
      accessTeacherAPI
        .getTeachers()
        .then(res => {
          if (res.error == null) {
            return res.teacher;
          }
          return [];
        })
        .then(value => {
          if (value.length > 0) {
            value.forEach(item => {
              let picture = null;
              if (item.picture !== 'vai a foto') {
                picture = item.picture;
              } else {
                picture = 'other-avatar.svg';
              }

              this.teachers.push({
                id: item._id,
                name: item.name,
                picture: picture
              });
            });
          }
        });
    },
    setClass(day) {
      this.currentDay = teacherSchedule.getToday();
      let cl = '';
      if (day == '') {
        cl = 'no-border';
      } else {
        cl = 'with-border';
        if (day == this.currentDay) {
          cl += ' il-daycurrent';
        }
      }
      return cl;
    },
    manageDOM() {
      const formEvent = document.querySelectorAll('.il-events--students'),
        cronogram = document.querySelectorAll('.il-cronogram--events'),
        spanDays = document.querySelectorAll('.with-border'),
        spanDay = document.getElementById('day' + this.activeDay);

      formEvent.forEach(event => {
        event.classList.remove('il-hidden');
      });

      cronogram.forEach(cron => {
        cron.classList.remove('il-show');
      });

      spanDays.forEach(element => {
        element.classList.remove('il-dayActive');
      });

      spanDay.classList.add('il-dayActive');
      return;
    },
    setActiveDay(d) {
      teacherSchedule.setActiveDay(d);
      this.activeDay = d;
      this.manageDOM();
    },
    reloadStructure() {
      this.manageDOM();
    },
    makeStructure() {
      this.calendar = teacherSchedule.makeStructure();
      this.currentMonth = teacherSchedule.getCurrentMonth();
      this.currentDay = teacherSchedule.getCurrentDay();
      this.activeDay = teacherSchedule.getActiveDay();
      this.times = teacherSchedule.getHours();
    },
    setSchedule(schedule) {
      this.schedule = schedule;
      this.showBtnAgenda = true;
    },
    confirm() {
      let confirm = window.confirm(
        'Deseja salvar a agenda para o dia ' +
          this.activeDay +
          ' de ' +
          this.currentMonth +
          ' para a professora ' +
          this.teacher +
          ' ?'
      );
      if (confirm) {
        this.saveContent();
      } else {
        return;
      }
    },
    saveContent() {
      //step 1 - verify teacher and contents for teacher
      const checkMonth = () => {
        //need find day
        return this.contents.findIndex(element => {
          return element.month == this.currentMonth;
        });
      };
      const addNewContent = () => {
        //other day
        let newContents = {
          month: this.currentMonth,
          schedule: this.schedule
        };
        this.contents.push(newContents);
        return;
      };
      let count = this.contents.length;
      if (count > 1) {
        let contentsIndex = checkMonth();
        if (contentsIndex && contentsIndex != undefined) {
          this.contents[contentsIndex].schedule = this.schedule;
        } else {
          //other month
          addNewContent();
        }
      } else {
        if (this.contents[0].month === null) {
          //first insertion
          this.contents[0].month = this.currentMonth;
          this.contents[0].schedule = this.schedule;
        } else {
          //other month
          addNewContent();
        }
      }
      this.saveCronogram();
    },
    saveCronogram() {
      //step2 - create cronogram
      const addNewCronogram = () => {
        let newCronogram = {
          teacher: this.teacher,
          contents: this.contents
        };
        this.cronogram.push(newCronogram);
      };
      if (this.cronogram.length > 1) {
        let indexCronogram = this.cronogram.findIndex(element => {
          return element.teacher == this.teacher;
        });
        if (indexCronogram) {
          //same teacher
          this.cronogram[indexCronogram].contents = this.contents;
        } else {
          //other teacher
          addNewCronogram();
        }
      } else {
        //check teacher
        if (this.cronogram[0].teacher === null) {
          //first insertion
          this.cronogram[0].teacher = this.teacher;
          this.cronogram[0].contents = this.contents;
        } else {
          if (this.cronogram[0].teacher !== this.teacher) {
            addNewCronogram();
          } else {
            this.cronogram[0].contents = this.contents;
          }
        }
      }
      this.saveDataCronogram();
      /**/
    },
    saveDataCronogram() {
      let cronogram = this.cronogram[0];
      const finalise = () => {
        //this.setCronogram(this.cronogram);
        this.contents = [
          {
            month: null,
            schedule: []
          }
        ];
        const formEvent = document.querySelectorAll('.il-events--students'),
          cronogram = document.querySelectorAll('.il-cronogram--events'),
          spanDays = document.querySelectorAll('.with-border'),
          spanDay = document.getElementById('day' + this.activeDay);

        formEvent.forEach(event => {
          event.classList.remove('il-hidden');
        });
        this.showBtnAgenda = false;
        alert('Agenda salva com sucesso!');
      };
      accessCronogramAPI
        .create(cronogram)
        .then(res => {
          if (res.error == null) {
            finalise();
            vm.$emit('msg', {
              type: 'success',
              message: 'Cronogram cadastrado com sucesso!'
            });
          } else {
            let msg = res.error.message;
            vm.$emit('msg', {
              type: msg.type,
              message: msg.value
            });
          }
        })
        .catch(err => {
          let msg = err.error;
          vm.$emit('msg', {
            type: 'danger',
            message: err
          });
        });
    },
    getCronogramStore() {
      const formEvent = document.querySelectorAll('.il-events--students'),
        cronogram = document.querySelectorAll('.il-cronogram--events');
      let store = this.getSpecificCronogram()(
        this.teacher,
        this.currentMonth,
        this.activeDay
      );
      if (store.lenght > 0) {
        cronogram.forEach(cron => {
          cron.classList.remove('il-show');
        });
      }
      this.cronogram = store;
    },
    getCronogram(teacher) {
      const formEvent = document.querySelectorAll('.il-events--students'),
        cronogram = document.querySelectorAll('.il-cronogram--events');
      this.teacher = teacher;
      let store = this.getSpecificCronogram()(
        teacher,
        this.currentMonth,
        this.activeDay
      );
      if (store.lenght > 0) {
        cronogram.forEach(cron => {
          cron.classList.remove('il-show');
        });
      }
      this.cronogram = store;
    },
    ...mapGetters('cronogram', {
      getSpecificCronogram: 'getSpecificCronogram'
    }),
    ...mapActions('cronogram', {
      setCronogram: 'setCronogram'
    })
  }
};
</script>
