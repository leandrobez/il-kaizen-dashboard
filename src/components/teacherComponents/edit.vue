<template>
<div class="il-teacher">
    <div class="il-teacher--content">
        <ilAlert :has="checkAlert" :msg="message" />
        <h3 class="il-color--darkblue">Editar conta </h3>
        <ilTeacherFormEdit @msg="setAlert" :id="getID" v-if="teacherID" />
    </div>
</div>
</template>

<script>
import ilTeacherFormEdit from './includes/formEdit.vue';
import ilAlert from '@/components/includes/alerts.vue';
export default {
  name: 'editTeacher',
  components: {
    ilTeacherFormEdit,
    ilAlert
  },
  data() {
    return {
      teacherID: null,
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
      if (this.teacherID) {
        return this.$route.params.id;
      }
      return null;
    }
  },
  mounted() {
    this.teacherID = this.$route.params.id;
  },
  methods: {
    setAlert(obj) {
      this.message = obj;
    }
  }
};
</script>
