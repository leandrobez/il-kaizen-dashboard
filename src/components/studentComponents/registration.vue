<template>
<div class="il-student ">
    <div class="il-student--content">
        <ilAlert :has="checkAlert" :msg="message" />
        <h3 class="il-color--darkblue">Matricular aluno</h3>
        <ilStudentRegistration @msg="setAlert" :id="getID" v-if="studentID" />
    </div>
</div>
</template>

<script>
import ilStudentRegistration from './includes/formRegistration.vue';
import ilAlert from '@/components/includes/alerts.vue';
export default {
  name: 'registration',
  components: {
    ilAlert,
    ilStudentRegistration
  },
  data() {
    return {
      studentID: null,
      message: null
    };
  },
  computed: {
    checkAlert() {
      if (this.message) {
        return true;
      }
      return false;
    },
    getID() {
      if (this.studentID) {
        return this.$route.params.id;
      }
      return null;
    }
  },
  mounted() {
    this.studentID = this.$route.params.id;
  },
  methods: {
    setAlert(obj) {
      this.message = obj;
    }
  }
};
</script>

<style>
</style>
