<template>
<div id="app" class="il-container">
    <header>
        <div class="il-header--content">
          <div class="il-brand">
            <img :src="getLogo()" alt="logo">
        </div>
        <div class="il-title">
            <h1 class="il-center il-color--light-blue">{{title}} - {{subTitle}}</h1>
        </div>
        <div class="il-menu">
            <div class="il-menu--icon" @click="openMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="il-painel--menu">
            <ul class="il-menu--list">
              <li>
                    <router-link :to="{path: '/'}" title="Home" class="il-nav--link">
                        <i class="mdi mdi-home mdi-12px"></i>
                        <span @click="closePainel">Home</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path: '/admins'}" title="Controle dos Admins" class="il-nav--link">
                        <i class="mdi mdi-account-star mdi-12px"></i>
                        <span @click="closePainel">Admins</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path: '/students'}" title="Controle de Alunos" class="il-nav--link">
                        <i class="mdi mdi-comment-account-outline mdi-12px"></i>
                        <span @click="closePainel">Alunos</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path: '/contas'}" title="Controle de Contas" class="il-nav--link">
                        <i class="mdi mdi-barcode mdi-12px"></i>
                        <span @click="closePainel">Contas</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path: 'teachers'}" title="Controle de Professores" class="il-nav--link">
                        <i class="mdi mdi-human-male-female mdi-12px"></i>
                        <span @click="closePainel">Professores</span>
                    </router-link>
                </li>

            </ul>
        </div>
        </div>
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
      subTitle: 'ADMINISTRAÇÃO GERAL',
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
    getLogo() {
      return '/images/theme/logo.png';
    },
    getBackground() {
      let path = this.$route.name;
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
    },
    openMenu() {
      const painel = document.querySelector('.il-painel--menu');
      painel.classList.add('il-open');
    },
    closePainel() {
      const painel = document.querySelector('.il-painel--menu');
      painel.classList.remove('il-open');
    }
  }
};
</script>

<style lang="scss">
@import './sass/styles.scss';
</style>
