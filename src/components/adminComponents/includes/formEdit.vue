<template>
<form class="il-form il-form--login" @submit.prevent="doUpdate">
    <div class="il-form--field">
        <label for="name">Nome Completo</label>
        <input type="text" v-model="admin.name" class="il-add--description" placeholder="Informe seu nome" id="name" />
    </div>
    <div class="il-form--field">
        <label for="email-r">Email</label>
        <input type="email" v-model="admin.email" class="il-add--description" placeholder="Informe seu email" id="email-r" />
    </div>

    <div class="il-input--info il-center">
        <button class="il-btn il-btn--entrance">
            <i class="mdi mdi-24px mdi-check"></i>
            <span>Salvar</span>
        </button>
    </div>
</form>
</template>

<script>
import accessAdminAPI from '../../../common/apiAdmin.js'
export default {
    name: 'formAdminEdit',
    props: {
        id: String
    },
    data() {
        return {
            admin: {
                name: '',
                email: ''
            },
        }
    },
    mounted() {
        this.getAdmin()
    },
    methods: {
        getAdmin() {
            if (this.id) {
                accessAdminAPI.searchAdmin(this.id).then(res => {
                    if (res) {
                        this.admin = res
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        doUpdate() {
            let vm = this
            accessAdminAPI.updateAdmin(this.id, this.admin)
                .then(res => {
                    if (res.data.error == '') {
                        vm.$emit('msg', {
                            type: 'success',
                            message: 'O present Admin teve sua conta atualizada com sucesso!'
                        })
                        setTimeout(() => {
                            vm.$router.push({
                                name: 'admins'
                            })
                        }, 2500)
                    } else {
                        const value = res.data.error;
                        vm.$emit('msg', {
                            type: 'warning',
                            message: value
                        })
                    }
                })
                .catch(err => {
                    vm.$emit('msg', {
                        type: 'warning',
                        message: err
                    })
                });
        }
    }
}
</script>
