<template>
<div class="il-teacher">
    <div class="il-teacher--content">
        <ilAlert :has="checkAlert" :msg="message" />
        <h3 class="il-color--darkblue">Novo Professor</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odit distinctio doloremque ratione voluptates error.</p>
        <ilTeacherFormCreate @msg="setAlert" />
    </div>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
import ilTeacherFormCreate from './includes/formCreate.vue';
export default {
  name: 'createTeacher',
  components: {
    ilAlert,
    ilTeacherFormCreate
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
