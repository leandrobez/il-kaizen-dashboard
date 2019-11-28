<template>
<div class="il-evaliation">
    <ilAlert :has="message ? true : false" :msg="message" />
    <h3 class="il-color--darkblue">Avaliação de Aluno</h3>
    <p class="il-color--light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit, provident ab quis error quidem ducimus distinctio saepe dolorum deserunt delectus? Culpa nihil voluptatem ratione earum.</p>
    <ilParams @msg="setAlert" @next="next" />
    <ilAnthropometric v-if="showAnthropometric"/>
</div>
</template>

<script>
import months from '../../common/months.js';
import accessStudentAPI from '../../common/apiStudent.js';
import ilAlert from '@/components/includes/alerts.vue';
import ilParams from './includes/params.vue';
import ilAnthropometric from './includes/anthropometric.vue';
//import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'indexEvaliation',
  components: {
    ilAlert,
    ilParams,
    ilAnthropometric
  },
  data() {
    return {
      showSnapShot: false,
      showAnthropometric: false,
      monthCurrent: null,
      message: null,
      currentStudent: {}
    };
  },
  props: {
    studentId: String
  },
  computed: {
    checkAlert() {
      if (this.alert.message) {
        this.clearAlert();
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.setToday();
  },
  methods: {
    setToday() {
      let today = new Date();
      let month = today.getMonth();
      this.monthCurrent = months[month].abr;
    },
    setStudent() {
      let vm = this;
      if (this.studentId) {
        accessStudentAPI
          .searchStudent(this.studentId)
          .then(res => {
            if (res.error == null) {
              const formatData = () => {
                let dnasc = res.student.dnasc; //2019-07-09T00:00:00.000Z
                const [dt, schema] = dnasc.split('T');
                const [y, m, d] = dt.split('-');
                return `${y}-${m}-${d}`;
              };
              this.currentStudent = res.student;
              this.currentStudent.dnasc = formatData();
              if (this.currentStudent.picture == '') {
                this.showSnapShot = true;
              }
            } else {
              let msg = res.error.message;
              vm.$emit('msg', {
                type: msg.type,
                message: msg.value
              });
            }
          })
          .catch(err => {
            console.log('vvv', res);
            let msg = err.error;
            vm.$emit('msg', {
              type: 'danger',
              message: msg
            });
          });
      }
    },
    setAlert(obj) {
      this.message = obj;
    },
    next() {
      this.showAnthropometric = true;
    }
  }
};
</script>
