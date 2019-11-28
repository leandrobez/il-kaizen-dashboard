<template>
<form class="il-form il-form--login" @submit.prevent="doUpdate">
    <div class="il-form--field">
        <label class="il-color--light" for="name">Nome Completo</label>
        <input type="text" v-model="admin.name" class="il-add--description" placeholder="Informe seu nome" id="name" />
    </div>
    <div class="il-form--field">
        <label class="il-color--light" for="email-r">Email</label>
        <input type="email" v-model="admin.email" class="il-add--description" placeholder="Informe seu email" id="email-r" />
    </div>
    <div class="il-field--button">
        <button class="il-btn il-btn--submit il-btn--center">
            Cadastrar
        </button>
        <button class="il-btn il-btn--return il-btn--center" @click="$router.back()">
            Retornar
        </button>

    </div>
</form>
</template>

<script>
import accessAdminAPI from '../../../common/apiAdmin.js';
export default {
    name: 'formAdminEdit',
    props: {
        adminID: String
    },
    data() {
        return {
            admin: {
                name: '',
                email: ''
            }
        };
    },
    mounted() {
        this.getAdmin();
    },
    methods: {
        getAdmin() {
            let vm = this;
            if (this.adminID) {
                accessAdminAPI
                    .searchAdmin(this.adminID)
                    .then(res => {
                        if (res.error == null) {
                            this.admin.name = res.user.name;
                            this.admin.email = res.user.email;
                        } else {
                            let msg = res.error.message;
                            vm.$emit('msg', {
                                type: msg.type,
                                message: msg.value
                            });
                        }
                    })
                    .catch(err => {
                        let msg = err.error;
                        vm.$emit('msg', {
                            type: 'danger',
                            message: msg
                        });
                    });
            }
        },
        doUpdate() {
            let vm = this;
            accessAdminAPI
                .updateAdmin(this.id, this.admin)
                .then(res => {
                    if (res.data.error == '') {
                        vm.$emit('msg', {
                            type: 'success',
                            message: 'O present Admin teve sua conta atualizada com sucesso!'
                        });
                        setTimeout(() => {
                            vm.$router.push({
                                name: 'admins'
                            });
                        }, 2500);
                    } else {
                        const value = res.data.error;
                        vm.$emit('msg', {
                            type: 'warning',
                            message: value
                        });
                    }
                })
                .catch(err => {
                    vm.$emit('msg', {
                        type: 'warning',
                        message: err
                    });
                });
        }
    }
};
</script>
