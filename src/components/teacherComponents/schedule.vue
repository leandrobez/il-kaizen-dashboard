<template>
<div class="il-teacher">
    <h3 class="il-color--darkblue">Agenda para {{currentMonth}}</h3>
    <div class="il-calendar" v-if="calendar.length>0">
      <div class="il-calendar--teachers">
            <div class="il-teachers--choices">
                <img src="/images/avatar/claudia.jpg" alt="claudia">
                <div class="il-teacher--name">
                    <label for="teacher1">Claudia</label>
                    <input type="radio" v-model="teacher" value="Claudia">
                    </div>
            </div>
            <div class="il-teachers--choices">
                <img src="/images/avatar/claudia.jpg" alt="claudia">
                <div class="il-teacher--name">
                    <label for="teacher1">Eduardo</label>
                    <input type="radio" v-model="teacher" value="Eduardo">
                    </div>
            </div>
            <div class="il-teachers--choices">
                <img src="/images/avatar/claudia.jpg" alt="claudia">
                <div class="il-teacher--name">
                    <label for="teacher1">Juliana</label>
                    <input type="radio" v-model="teacher" value="Juliana">
                    </div>
            </div>
        </div>
        <ilDays />
        <div class="il-week--row" v-for="(row,index1) in calendar" :key="`row${index1}`">
            <span v-for="(dia,index2) in row" :key="`d${index2}`">
                <span :class="setClass(dia)" @click="setActiveDay(dia)" :id="`day${dia}`">{{dia}}</span>
            </span>
        </div>
        
        <div class="il-calendar--header">
            <div class="il-calendar--teacher">
                <p>{{teacher}}</p>
            </div>
            <div class="il-header--details">
                <p>{{getActiveDay}} de {{currentMonth}}</p>
            </div>
        </div>
        <div class="il-calendar--cronogram" v-if="times.length>0">

            <div class="il-cronogram--body">
                <div class="il-list--hours" v-for="(time,index) in times" :key="`t${index}`">
                    <div class="il-hours">
                        <span>{{time.start}}:00h</span>
                        <span>{{time.end}}:00h</span>
                    </div>
                    <div class="il-cronogram--events" :id="`cronogram${activeDay}_${index}`">
                        <ul>
                            <li>Aula: <span>{{events[index].details.class}}</span></li>
                            <li>Alunos: <span>{{events[index].students[0]}}, {{events[index].students[1]}}, {{events[index].students[2]}}</span></li>
                        </ul>
                    </div>
                    <div class="il-events">
                        <div class="il-events--students" :id="`event${activeDay}_${index}`">
                            <div class="il-form--fields">
                                <input v-model="wordSearch[index].word" @input="studentSearch(index)" required type="text" placeholder="Busque o aluno">
                                <div class="il-checks">
                                    <label for="">P</label>
                                    <input type="radio" v-model="events[index].details.class" value="pilates">
                                    <label for="">C</label>
                                    <input type="radio" v-model="events[index].details.class" value="corealign">
                                </div>
                            </div>
                            <div class="il-list--student" v-for="(student,index1) in search[index]" :key="student._id">
                                <div class="il-list--check">
                                    <span>{{student.name}}</span>
                                    <button @click="choiceStudent(index,index1)">
                                        <i class="mdi mdi-12px mdi-check"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="il-listed--students" v-if="events[index].students.length>0">
                                <h5>Agendados</h5>
                                <ul class="il-listed">
                                    <li v-for="(listed,key) in events[index].students" :key="`event_${key}`"><span>{{listed}}</span></li>
                                </ul>
                            </div>
                        </div>
                        <button class="il-btn il-btn--schedule" @click.prevent="addEventToSchedule(activeDay,index)">Salvar</button>
                    </div>
                </div>
            </div>
            <div class="il-cronogram--footer" v-if="showBtnAgenda">
                <button class="il-btn il-btn--schedule" @click.prevent="saveConfirm()">Salvar Agenda</button>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import teacherSchedule from '../../common/schedule.js';
import accessStudentAPI from '../../common/apiStudent.js';
import ilDays from './includes/days.vue';
import { mapActions } from 'vuex';
export default {
  name: 'schedule',
  components: {
    ilDays
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
      teacher: 'Claudia',
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
      schedule: [
        {
          day: null,
          events: []
        }
      ],
      events: [],
      students: [],
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
    this.makeStructure();
    this.makeEvents();
  },
  methods: {
    studentSearch(key) {
      let word = this.wordSearch[key].word;

      if (word.length > 4) {
        let search = this.students.filter(element => {
          return element.name
            .toLowerCase()
            .includes(this.wordSearch[key].word.toLowerCase());
        });
        this.search[key] = search;
      }
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
    choiceStudent(key, key1) {
      if (this.events[key].students.length == 3) {
        alert('Você pode agendar no máximo 3 alunos por horário');
      } else {
        this.events[key].students.push(this.search[key][key1].name);
        this.wordSearch[key].word = '';
        this.search = [];
      }
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
      this.makeEvents();
      this.manageDOM();
    },
    makeStructure() {
      this.calendar = teacherSchedule.makeStructure();
      this.currentMonth = teacherSchedule.getCurrentMonth();
      this.currentDay = teacherSchedule.getCurrentDay();
      this.activeDay = teacherSchedule.getActiveDay();
      this.times = teacherSchedule.getHours();
    },
    makeEvents() {
      this.times.forEach((time, index) => {
        this.events.push({
          students: [],
          details: {
            timeKey: index,
            start: time.start,
            end: time.end,
            class: ''
          }
        });
        this.wordSearch.push({
          key: index,
          word: ''
        });
      });
    },
    addEventToSchedule(day, key) {
      //this.events[key].details.class = 'pilates';
      let event = this.events[key];
      if (event.students.length == 0) {
        alert('Por favor informe pelo menos um aluno por horário');
        return;
      }
      if (event.details.class == '') {
        alert('Por favor informe qual o tipo de aula - pilates ou corealign');
        return;
      }
      this.showBtnAgenda = true;
      const checkDays = () => {
        //need find day
        return this.schedule.findIndex(element => {
          return element.day == this.activeDay;
        });
      };
      const addEvent = () => {
        let schedule = this.schedule[0];
        if (schedule.day == null) {
          //first insertion
          schedule.day = this.activeDay;
          schedule.events.push(event);
          this.schedule[0] = schedule;
        } else {
          //verify day whith active day
          if (schedule.day == this.activeDay) {
            //same day
            schedule.events.push(event);
            this.schedule[0] = schedule;
          } else {
            //other day
            let newSchedule = {
              day: this.activeDay,
              events: [event]
            };
            this.schedule.push(newSchedule);
          }
        }
      };
      let count = this.schedule.length;
      if (count > 1) {
        let eventIndex = checkDays();
        if (eventIndex && eventIndex != undefined) {
          this.schedule[eventIndex].events.push(event);
        } else {
          //other day
          let newSchedule = {
            day: this.activeDay,
            events: [event]
          };
          this.schedule.push(newSchedule);
        }
        //events.push(event);
      } else {
        addEvent();
      }
      //show event
      const formEvent = document.getElementById('event' + day + '_' + key);
      formEvent.classList.add('il-hidden');
      const cronogram = document.getElementById('cronogram' + day + '_' + key);
      cronogram.classList.add('il-show');
    },
    saveConfirm() {
      let confirm = window.confirm(
        'Deseja salvar a agenda para o dia ' +
          this.activeDay +
          ' de ' +
          this.currentMonth +
          ' para a professora Claudia?'
      );
      if (confirm) {
        this.saveSchedule();
      } else {
        return;
      }
    },
    saveSchedule() {},
    ...mapActions('cronogram', {
      setCronogram: 'setCronogram'
    })
  }
};
</script>
