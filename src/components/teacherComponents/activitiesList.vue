<template>
<div class="il-teacher">
    <h3 class="il-color--darkblue">Todos os eventos do professor</h3>
    <div class="il-calendar" v-if="calendar.length>0">

        <ilDays />
        <div class="il-week--row" v-for="(row,index1) in calendar" :key="`row${index1}`">
            <span v-for="(day,index2) in row" :key="`d${index2}`">
                <span :class="setClass(day)" @click="setActiveDay(day)" :id="`day${day}`">{{day}}</span>
            </span>
        </div>
        <div class="il-calendar--cronogram" v-if="times.length>0">
          <ilCronogram :times="times" :day="activeDay" @schedule="setSchedule" />
        </div>
    </div>
</div>
</template>

<script>
import teacherSchedule from '../../common/schedule.js';
import ilDays from './includes/days.vue';
import ilCronogram from './includes/cronogram.vue';
export default {
  name: 'activitiesList',
  props: {
    cronogram: Array
  },
  components: {
    ilDays,
    ilCronogram
  },
  mounted() {
    this.makeStructure();
    console.log(this.cronogram);
  },
  data() {
    return {
      calendar: [],
      times: [],
      currentMonth: null,
      currentDay: null,
      activeDay: null,
      teacher: ''
    };
  },
  methods: {
    makeStructure() {
      this.calendar = teacherSchedule.makeStructure();
      this.currentMonth = teacherSchedule.getCurrentMonth();
      this.currentDay = teacherSchedule.getCurrentDay();
      this.activeDay = teacherSchedule.getActiveDay();
      this.times = teacherSchedule.getHours();
    },
    setActiveDay(d) {
      teacherSchedule.setActiveDay(d);
      this.activeDay = d;
      //this.manageDOM();
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
    }
  }
};
</script>
