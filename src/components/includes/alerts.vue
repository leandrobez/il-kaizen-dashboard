<template>
<div v-if="checkAlert" :class="this.alert.message ? 'il-alert '+alert.type+' il-alert--show' : ''">
    <p>{{alert.message}}</p>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'alerts',
  props: {
    has: Boolean,
    msg: Object
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    }),
    checkAlert() {
      if (this.has) {
        this.setAlert();
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
    setAlert() {
      let type = this.msg.type,
        message = this.msg.message;
      setTimeout(() => {
        this.$parent.message = null
      }, 4000);
      if (message) {
        switch (type) {
          case 'warning':
            this.warning(message);
            break;
          case 'success':
            this.success(message);
            break;
          case 'danger':
            this.danger(message);
            break;
        }
      }
    }
  }
};
</script>
