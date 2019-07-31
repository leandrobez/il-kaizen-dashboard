<template>
<div class="il-student il-student--content">
    <ilAlert :has="message ? true : false" :msg="message" />
    <h3>Novo Aluno</h3>
    <ilStudentFormCreate @msg="setAlert" />
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ilAlert from '@/components/includes/alerts.vue';
import ilStudentFormCreate from './includes/formCreate.vue';
export default {
  name: 'createStudent',
  components: {
    ilAlert,
    ilStudentFormCreate
  },
  data() {
    return {
      message: null
    };
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    }),
    checkAlert() {
      if (this.alert.message) {
        this.clearAlert();
        return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions('alert', {
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      clearAlert: 'clear'
    }),
    setAlert(obj) {
      this.message = obj;
    }
  }
};
</script>
