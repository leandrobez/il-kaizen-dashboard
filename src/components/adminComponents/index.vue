<template>
<div class="il-admin">
    <div class="il-admin--content">
        <ilAlert :has="checkAlert" :msg="message" />
        <h3 class="il-color--light">Controle de Administradores</h3>
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
export default {
  name: 'AdminIndex',
  components: {
    ilAlert
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
