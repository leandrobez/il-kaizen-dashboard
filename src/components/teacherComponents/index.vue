<template>
<div class="il-teacher">
    <div class="il-teacher--content">
        <ilAlert :has="message ? true : false" :msg="message" />
        <h3 class="il-color--darkblue">Controle de Professores</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit, provident ab quis error quidem ducimus distinctio saepe dolorum deserunt delectus? Culpa nihil voluptatem ratione earum.</p>
        <div class="il-sub--menu">
            <a href="#!" class="il-btn il-btn--submit" @click.prevent="createTeacher"><i class="mdi mdi-24px mdi-basecamp" title="Novo Professor"></i><span>Novo Professor</span></a> |
            <a href="#!" class="il-btn il-btn--submit" @click.prevent="createSchedule"><i class="mdi mdi-24px mdi-calendar-clock" title="Controlar agenda do professor"></i><span>Controlar Agenda</span></a>
        </div>
        <ilListTeachers :teachers="teachers" v-if="hasTeachers" />
    </div>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
import accessTeacherAPI from '../../common/apiTeacher.js';
import ilListTeachers from './includes/list';
export default {
  name: 'indexTeacher',
  components: {
    ilAlert,
    ilListTeachers
  },
  data() {
    return {
      teachers: [],
      message: null,
      showAddress: false
    };
  },
  computed: {
    hasTeachers() {
      if (this.teachers.length > 0) {
        return true;
      }
      return false;
    },
    checkAlert() {
      if (this.alert.message) {
        this.clearAlert();
        return true;
      }
      return false;
    },
    hasAddress() {
      if (this.showAddress) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.setTeachers();
  },
  methods: {
    setAlert(obj) {
      this.message = obj;
    },
    setTeachers() {
      accessTeacherAPI
        .getTeachers()
        .then(response => {
          if (response.error === null && response.teacher.length > 0) {
            this.teachers = response.teacher;
            this.teachers.forEach((teacher, index) => {
              teacher.valor = this.getDesc(index);
            });
          } else {
            if (response.error) {
              this.setAlert({
                type: 'warning',
                message: response.message.value
              });
            }
          }
        })
        .catch(err => {
          this.setAlert({
            type: 'danger',
            message:
              'Você não tem permisssão para acessar essa página! ' +
              err +
              ' Você será redirecionado para página de login em 4 seg'
          });
          setTimeout(() => {
            this.$router.push({
              name: 'home'
            });
          }, 3000);
        });
    },
    createTeacher() {
      this.$router.push({
        path: 'teachers/create'
      });
    },
    createSchedule() {
      this.$router.push({
        path: 'teachers/schedule'
      });
    }
  }
};
</script>
