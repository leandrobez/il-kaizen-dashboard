<template>
<div class="il-teacher--content">
    <ilAlert :has="message ? true : false" :msg="message" />
    <h3 class="il-color--darkblue">Controle de Professores</h3>
    <div class="il-sub--menu">
        <a href="#!" class="il-btn il-btn--submit" @click.prevent="createTeacher"><i class="mdi mdi-24px mdi-account-multiple" title="Novo Admin"></i><span>Novo Professor</span></a> |
        <a href="#!" class="il-btn il-btn--submit" @click.prevent="controlPayment"><i class="mdi mdi-24px mdi-account-multiple" title="Novo Admin"></i><span>Controlar Pagamento</span></a>
    </div>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
import accessTeacherAPI from '../../common/apiTeacher.js';
export default {
  name: 'indexTeacher',
  components: {
    ilAlert
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
    }
  }
};
</script>
