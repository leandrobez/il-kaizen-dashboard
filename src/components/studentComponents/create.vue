<template>
<div class="il-student">
    <div class="il-student--content">
        <ilAlert :has="checkAlert" :msg="message" />
        <h3 class="il-color--darkblue">Novo Aluno</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odit distinctio doloremque ratione voluptates error.</p>
        <ilStudentFormCreate @msg="setAlert" />
    </div>
</div>
</template>

<script>
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
    checkAlert() {
      if (this.message) {
        return true;
      }
      return false;
    }
  },
  methods: {
    setAlert(obj) {
      this.message = obj;
    }
  }
};
</script>
