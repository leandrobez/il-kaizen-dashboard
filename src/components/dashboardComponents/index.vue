<template>
<div class="il-config">
    <ilAlert :has="checkAlert" :msg="message" />
    <div class="il-config--content" v-if="checkAssigned">
        <h3 class="il-color--light">Área de Administração</h3>
        <div class="il-config--wrapper">
            <ilAside />
            <div class="il-config--main">
                <RouterView />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
import ilAside from './partials/menu.vue';
export default {
  name: 'configIndex',
  components: {
    ilAlert,
    ilAside
  },
  data() {
    return {
      message: null,
      assigned: false
    };
  },
  computed: {
    checkAssigned() {
      if (this.assigned || window.localStorage.getItem('_token')) {
        return true;
      }
      return false;
    },
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
