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
                <div class="il-menu--icon" @click="manageMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="il-painel--menu">
                <ul class="il-menu--list">
                    <li>
                        <router-link :to="{path: '/'}" title="Home" class="il-nav--link">
                            <i class="mdi mdi-home mdi-24px"></i>
                            <span @click="closePainel">Home</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'admin.list'}" title="Controle dos Admins" class="il-nav--link">
                            <i class="mdi mdi-account-star mdi-24px"></i>
                            <span @click="closePainel">Admins</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'students'}" title="Controle de Alunos" class="il-nav--link">
                            <i class="mdi mdi-comment-account-outline mdi-24px"></i>
                            <span @click="closePainel">Alunos</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'expenses'}" title="Controle de Contas" class="il-nav--link">
                            <i class="mdi mdi-barcode mdi-24px"></i>
                            <span @click="closePainel">Contas</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'teachers'}" title="Controle de Professores" class="il-nav--link">
                            <i class="mdi mdi-human-male-female mdi-24px"></i>
                            <span @click="closePainel">Professores</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'experimental'}" title="Agendamento de aulas experimentais" class="il-nav--link">
                            <i class="mdi mdi-timetable mdi-24px"></i>
                            <span @click="closePainel">Experimental</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/config/home'}" title="Configurar Sistema" class="il-nav--link">
                            <i class="mdi mdi-settings mdi-24px"></i>
                            <span @click="closePainel">Configurações</span>
                        </router-link>
                    </li>
                </ul>
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
            <h4 class="il-color--darkblue il-center">{{by}}</h4>
        </div>
    </footer>
</div>
</template>

<script>
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
    },
    closePainel() {
      this.manageMenu();
    }
  }
};
</script>

<style lang="scss">
@import './sass/styles.scss';
</style>
