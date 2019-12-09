<template>
  <div id="app" class="il-container">
    <header>
      <div class="il-header--content">
        <div class="il-brand">
          <img :src="getLogo()" alt="logo" />
        </div>
        <div class="il-title">
          <h1 class="il-center il-color--light-blue">
            {{ title }} - {{ subTitle }}
          </h1>
        </div>
        <div class="il-menu">
          <div class="il-menu--icon" @click="manageMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="il-painel--menu">
          <ilPainel @close="manageMenu" />
        </div>
      </div>
    </header>

    <main>
      <div class="il-top"></div>
      <div class="il-back"></div>
      <div class="il-container--wrapper">
       
        <RouterView />
      </div>
    </main>

    <footer class="il-background--gradient-blue">
      <div class="il-container--wrapper">
        <h4 class="il-color--darkblue il-center">{{ by }}</h4>
      </div>
    </footer>
  </div>
</template>

<script>
import ilPainel from '@/components/includes/painel.vue';
export default {
  name: 'App',
  data() {
    return {
      showMenu: false,
      title: 'KAIZEN',
      subTitle: 'ADMINISTRAÇÃO GERAL',
      by: 'InternetLojas.com'
    };
  },
  components: {
    ilPainel
  },
  computed: {
    checkRouter() {
      if (this.$route.name == 'home') {
        return false;
      }
      return true;
    }
  },
  methods: {
    getLogo() {
      return '/images/theme/logo.png';
    },
    manageMenu() {
      const painel = document.querySelector('.il-painel--menu');
      this.showMenu = !this.showMenu;
      if (this.showMenu) {
        painel.classList.add('il-open');
      } else {
        painel.classList.remove('il-open');
      }
    }
  }
};
</script>

<style lang="scss">
@import './sass/styles.scss';
</style>
