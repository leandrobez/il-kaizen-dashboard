<template>
<div id="app" class="il-container">
    <header>
        <!--
        <ilNav v-if="checkRouter" />-->
        <div class="il-brand">
            <img src="images/theme/logo.png" alt="logo">
        </div>
        <div class="il-title">
            <h1 class="il-center il-color--dark">{{title}} - {{subTitle}}</h1>
        </div>
        <div class="il-menu">
            <div class="il-menu--icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <!--<ilNav />-->
    </header>

    <main>
        <div class="il-top"></div>
        <!--<div class="il-big--image"></div>-->
        <div class="il-container--wrapper">
            <RouterView />
        </div>
    </main>

    <footer class="il-background--gradient-blue">
        <div class="il-container--wrapper">
            <h4 class="il-color--darkblue il-center">{{by}}</h4>
        </div>
    </footer>
</div>
</template>

<script>
import ilNav from '@/components/includes/navegation.vue';
export default {
  name: 'App',
  data() {
    return {
      title: 'KAIZEN',
      subTitle: 'CONTROLE FINANCEIRO',
      by: 'InternetLojas.com'
    };
  },
  components: {
    ilNav
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
    getBackground() {
      let path = this.$route.name;
      console.log(path);
      let back = '';
      switch (path) {
        case 'home':
          back = "background-image: url('../images/back-home.jpg')";
          break;
        case 'students.list':
          back = 'il-background--students';
          break;
        case 'entradas.cheques':
          back = 'il-background--ligth-red';
          break;
        case 'expenses':
          back = "background-image: url('../images/back-home.jpg')";
          break;
        case 'contas.fixed':
          back = "background-image: url('../images/back-home.jpg')";
          break;
        case 'contas.extras':
          back = "background-image: url('../images/back-home.jpg')";
          break;
        case 'contas.variables':
          back = "background-image: url('../images/back-home.jpg')";
          break;
        case 'contas.show':
          back = "background-image: url('../images/back-home.jpg')";
          break;
        case 'summary':
          back = 'il-background--summary';
          break;
        case 'entradas.especies':
          back = 'il-background--orange';
          break;
        case 'students.signup':
          back = 'il-background--signup';
          break;
        default:
          back = 'il-background--light-sky';
          break;
      }
      return back;
    }
  }
};
</script>

<style lang="scss">
@import './sass/styles.scss';
</style>
