<template>
<ul class="il-box--home">
    <li v-if="getAdmin">
        <a href="#!" class="il-nav--link">
            <img src="/images/avatar/claudia-avatar.svg" class="il-boxes--avatar" :alt="admin">
            <span class="il-color--light">{{admin}}</span>
        </a>
    </li>
    <li>
        <router-link :to="{name: 'admin.list'}" title="Controle dos Admins" class="il-nav--link">
            <i class="mdi mdi-account-star mdi-36px il-color--light il-color--light"></i>
            <h5 class="il-color--light">Admins</h5>
        </router-link>
    </li>
    <li>
        <router-link :to="{name: 'students'}" title="Controle de Alunos" class="il-nav--link">
            <i class="mdi mdi-comment-account-outline mdi-36px il-color--light"></i>
            <h5 class="il-color--light">Alunos</h5>
        </router-link>
    </li>
    <li>
        <router-link :to="{name: 'expenses'}" title="Controle de Contas" class="il-nav--link">
            <i class="mdi mdi-barcode mdi-36px il-color--light"></i>
            <h5 class="il-color--light">Contas</h5>
        </router-link>
    </li>
    <li>
        <router-link :to="{name: 'teachers'}" title="Controle de Professores" class="il-nav--link">
            <i class="mdi mdi-human-male-female mdi-36px il-color--light"></i>
            <h5 class="il-color--light">Professores</h5>
        </router-link>
    </li>
    <li>
        <router-link :to="{name: 'dashboard'}" title="Configurar o sistema" class="il-nav--link">
            <i class="mdi mdi-settings mdi-36px il-color--light"></i>
            <h5 class="il-color--light">Dashboard</h5>
        </router-link>
    </li>
    <li>
        <a href="#!" title="Encerrar a aplicação com segurança" class="il-nav--link" @click.prevent="logout">
            <i class="mdi mdi-logout mdi-36px il-color--light"></i>
            <h5 class="il-color--light">Logout</h5>
        </a>
    </li>
</ul>
</template>

<script>
export default {
  name: 'boxes',
  data() {
    return {
      admin: ''
    };
  },
  computed: {
    getAdmin() {
      if (this.admin) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.admin = window.localStorage.getItem('admin') || '';
  },
  methods: {
    logout() {
      //destroy token localStorage
      window.localStorage.removeItem('_token');
      window.localStorage.removeItem('admin');
      location.reload();
    }
  }
};
</script>

<style scoped>
</style>
