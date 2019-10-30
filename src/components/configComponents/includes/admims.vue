<template>
<div class="il-dashboard--admim">
    <p class="il-color--light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, corporis.</p>
    <table class="il-form--lists">
        <tbody>
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
            </tr>
            <tr v-for="(list,index) in admins" :key="list._id">
                <td>{{index+1}}</td>
                <td>{{list.name}}</td>
                <td>{{list.email}}</td>
                <td>
                    <i class="mdi mdi-24px mdi-delete il-color--dark" title="Eliminar admin" @click="deleteAdmin(list._id)"></i>
                    <i class="mdi mdi-24px mdi-account-edit il-color--dark" title="Editar Admin" @click="editAdmin(list._id)"></i>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import accessAdminAPI from '../../../common/apiAdmin.js';
export default {
  name: 'dashboardAdmims',
  data() {
    return {
      admins: []
    };
  },
  mounted() {
    this.setAdmins();
  },
  methods: {
    setAdmins() {
      accessAdminAPI.getAdmin().then(response => {
        if (response.error == null && response.userNoPwd.length > 0) {
          this.admins = response.userNoPwd;
        }
      });
    },
    editAdmin(id) {
      this.$router.push({
        name: 'admin.edit',
        params: {
          id: id
        }
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
            this.setAlert({
              type: 'success',
              message: 'Admin removido com sucesso da base de dados.'
            });
          })
          .catch(err => {
            this.setAlert({
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
