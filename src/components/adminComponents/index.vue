<template>
<div class="il-admin">
    <div class="il-admin--content">
        <ilAlert :has="message ? true : false" :msg="message" />
        <h3>Controle de Administradores</h3>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Dt Criação</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody v-if="hasAdmins">
                <tr v-for="admin in admins" :key="admin._id">
                    <td>{{admin.name}}</td>
                    <td>{{admin.email}}</td>
                    <td>{{admin.date}}</td>
                    <td>
                        <i class="mdi mdi-24px mdi-delete il-color--red" title="Eliminar admin" @click="deleteAdmin(admin._id)"></i> | <i class="mdi mdi-24px mdi-account-edit il-color--orange" title="Editar conta" @click="editAdmin(admin._id)"></i>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="!hasAdmins">
                <tr>
                    <td colspan="5">
                        <span>Não há Admin criado ainda</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button class="il-btn il-btn--entrance" @click="createAdmin">Novo Admin</button>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue'
import accessAdminAPI from '../../common/apiAdmin.js';
export default {
    name: 'AdminIndex',
    components: {
        ilAlert
    },
    data() {
        return {
            admins: [],
            message: null
        }
    },
    computed: {
        hasAdmins() {
            if (this.admins.length > 0) {
                return true
            }
            return false
        },
        checkAlert() {
            if (this.alert.message) {
                this.clearAlert();
                return true;
            }
            return false;
        }
    },
    mounted() {
        this.setAdmins()
    },
    methods: {
        setAlert(obj) {
            this.message = obj
        },
        setAdmins() {
            accessAdminAPI
                .getAdmin()
                .then(response => {
                    if (response.error == null && response.userNoPwd.length > 0) {
                        this.admins = response.userNoPwd
                    }
                }).catch(err => {

                    this.setAlert({
                        type: 'danger',
                        message: 'Você não tem permisssão para acessar essa página! ' +
                            err +
                            ' Você será redirecionado para página de login em 4 seg'
                    });
                    setTimeout(() => {
                        this.$router.push({
                            name: 'home'
                        })
                    }, 4000)
                })
        },
        createAdmin() {
            this.$router.push({
                path: 'admins/create'
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
            let confirm = window.confirm('Realmente deseja eliminar esse administrador?')
            if (confirm) {
                accessAdminAPI.removeAdmin(id).then(response => {
                    this.admins = response
                    this.setAlert({
                        type: 'success',
                        message: "Admin removido com sucesso da base de dados."
                    })
                }).catch(err => {
                    this.setAlert({
                        type: 'danger',
                        message: "Você não tem permisssão para acessar essa página! " + err + " Você será redirecionado para página de login em 4 seg"
                    })
                    setTimeout(() => {
                        this.$router.push({
                            name: 'home'
                        })
                    }, 4000)
                })
            }
            return
        }
    }
}
</script>
