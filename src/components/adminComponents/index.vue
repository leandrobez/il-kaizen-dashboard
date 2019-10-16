<template>
<div class="il-admin">
    <div class="il-admin--content">
        <ilAlert :has="checkAlert" :msg="message" />
        <h3 class="il-color--light">Controle de Administradores</h3>
        <div class="il-sub--menu">
            <a href="#!" class="il-btn il-btn--submit" @click.prevent="createAdmin"><i class="mdi mdi-24px mdi-account-multiple" title="Novo Admin"></i><span>Novo</span></a>
        </div>
        <div class="il-lists" v-if="hasAdmins">
            <ul class="il-list--header">
                <li>Id</li>
                <li>Nome</li>
                <li>Email</li>
                <li>Ações</li>
            </ul>
            <ul class="il-list--items" v-for="(list,index) in admins" :key="list._id">
                <li>{{index+1}}</li>
                <li>{{list.name}}</li>
                <li>{{list.email}}</li>
                <li>
                    <ul class="il-list--actions">
                        <li>
                            <i class="mdi mdi-24px mdi-delete il-color--dark" title="Eliminar admin" @click="deleteAdmin(list._id)"></i>
                        </li>
                        <li>
                            <i class="mdi mdi-24px mdi-account-edit il-color--dark" title="Editar Admin" @click="editAdmin(list._id)"></i>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <h3 v-else>Não há admins registrados</h3>
    </div>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
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
        };
    },
    computed: {
        hasAdmins() {
            if (this.admins.length > 0) {
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
    mounted() {
        this.setAdmins();
    },
    methods: {
        setAlert(obj) {
            this.message = obj;
        },
        setAdmins() {
            accessAdminAPI
                .getAdmin()
                .then(response => {
                    if (response.error == null && response.userNoPwd.length > 0) {
                        this.admins = response.userNoPwd;
                    }
                })
                .catch(err => {
                    this.setAlert({
                        type: 'danger',
                        message: 'Você não tem permisssão para acessar essa página! ' +
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
                            message: 'Você não tem permisssão para acessar essa página! ' +
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
