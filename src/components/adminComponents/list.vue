<template>
<div>
    <div class="il-sub--menu">
        <router-link :to="{name:'admin.create'}" class="il-btn il-btn--submit" title="Novo Admin">
            <i class="mdi mdi-24px mdi-account-multiple"></i><span>Novo</span>
        </router-link>
    </div>
    <div class="il-lists" v-if="hasAdmins">
        
        <table class="il-form--lists">
            <tbody>
                <tr>
                    <td>Id</td>
                    <td>Nome</td>
                    <td>Email</td>
                    <td>Ações</td>
                </tr>
                <tr v-for="(list,index) in admins" :key="list._id">
                    <td>{{index+1}}</td>
                    <td>{{list.name}}</td>
                    <td>{{list.email}}</td>
                    <td>
                        <router-link :to="{name:'admin.edit', params:{id:list._id}}" title="Editar Admin">
                            <i class="mdi mdi-24px mdi-account-edit"></i>
                        </router-link>
                         <i class="mdi mdi-24px mdi-delete il-color--dark" title="Eliminar admin" @click="deleteAdmin(list._id)"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <h3 v-else>Não há admins registrados</h3>
</div>
</template>

<script>
import accessAdminAPI from '../../common/apiAdmin.js';
export default {
  name: 'listAdmin',
  data() {
    return {
      admins: []
    };
  },
  computed: {
    hasAdmins() {
      if (this.admins.length > 0) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.setAdmins();
  },
  methods: {
    setAdmins() {
      accessAdminAPI
        .getAdmin()
        .then(response => {
          if (response.error == null && response.userNoPwd.length > 0) {
            this.admins = response.userNoPwd;
          }
        })
        .catch(err => {
          this.$parent.setAlert({
            type: 'danger',
            message:
              'Você não tem permisssão para acessar essa página! ' +
              err +
              ' Você será redirecionado para página de login em 4 seg'
          });
          setTimeout(() => {
            this.$router.push({
              name: 'home'
            });
          }, 4000);
        });
    },

    deleteAdmin(id) {
      let confirm = window.confirm(
        'Realmente deseja eliminar esse administrador?'
      );
      if (confirm) {
        accessAdminAPI
          .removeAdmin(id)
          .then(response => {
            this.admins = response;
            this.$parent.setAlert({
              type: 'success',
              message: 'Admin removido com sucesso da base de dados.'
            });
          })
          .catch(err => {
            this.$parent.setAlert({
              type: 'danger',
              message:
                'Você não tem permisssão para acessar essa página! ' +
                err +
                ' Você será redirecionado para página de login em 4 seg'
            });
            setTimeout(() => {
              this.$router.push({
                name: 'home'
              });
            }, 4000);
          });
      }
      return;
    }
  }
};
</script>

<style>
</style>
