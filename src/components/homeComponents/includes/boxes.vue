<template>
<div>
    <span v-if="getAdmin"> {{admin}} </span>
    <ul class="il-box--home">
        <li class="">
            <router-link :to="{path: '/admins'}" title="Controle dos Admins" class="il-nav--link">
                <i class="mdi mdi-account-star mdi-36px"></i>
                <h5>Admins</h5>
            </router-link>
        </li>
        <li class="">
            <router-link :to="{path: '/students'}" title="Controle de Alunos" class="il-nav--link">
                <i class="mdi mdi-clipboard-account mdi-36px"></i>
                <h5>Alunos</h5>
            </router-link>
        </li>
        <li class="">
            <router-link :to="{path: '/contas'}" title="Controle de Contas" class="il-nav--link">
                <i class="mdi mdi-clipboard-account mdi-36px"></i>
                <h5>Contas</h5>
            </router-link>
        </li>
        <li class="">
            <a href="#!" title="Encerrar a aplicação" class="il-nav--link" @click.prevent="logout">
                <i class="mdi mdi-logout mdi-36px"></i>
                <h5>Logout</h5>
            </a>
        </li>
    </ul>
</div>
</template>

<script>
import accessAdminAPI from '../../../common/apiAdmin.js';
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
      accessAdminAPI.logout().then(res => {
        //destroy token localStorage
        window.localStorage.removeItem('_token');
        window.localStorage.removeItem('admin');
        location.reload();
      });
    }
  }
};
</script>

<style>
</style>
