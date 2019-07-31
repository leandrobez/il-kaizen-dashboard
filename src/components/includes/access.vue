<template>
<div class="il-home--access">
    <div class="il-access--header" v-if="hasUser"><span>{{user}} logado</span></div>

    <div class="il-access--content" v-if="!hasUser">
        <ul class="il-aba">
            <li class="il-login">
                <span class="il-aba--login" :class="abas.login ? ' il-aba--active':''" @click.prevent="showAba('login')">Login</span>
            </li>
            <li class="il-register">
                <span class="il-aba--register" :class="abas.register ? ' il-aba--active':''" @click.prevent="showAba('register')">Registrar-se</span>
            </li>
        </ul>

        <nav class="il-nav--tabs">
            <div class="il-tab--contents">
                <div class="il-tab--login" :class="abas.login ? ' il-tab--active':''">
                    <h3>Já possui conta? Faça o login</h3>
                    <form class="il-form il-form--login" @submit.prevent="doLogin">

                        <div class="il-form--field">
                            <label for="email">Email</label>
                            <input type="email" v-model="login.email" class="il-add--description" placeholder="Informe seu email" id="email" />
                        </div>
                        <div class="il-form--field">
                            <label for="password">Senha</label>
                            <input type="password" v-model="login.password" class="il-add--description" placeholder="Informe a senha" id="password" autocomplete="off" />
                        </div>

                        <div class="il-input--info il-center">
                            <button class="il-btn il-btn--entrance">
                                <i class="mdi mdi-24px mdi-check"></i>
                                <span>Logar</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="il-tab--register" :class="abas.register ? ' il-tab--active':''">
                    <h3>Sem conta ainda? Crie agora</h3>
                    <form class="il-form il-form--login" @submit.prevent="doRegister">
                        <div class="il-form--field">
                            <label for="name">Nome Completo</label>
                            <input type="text" v-model="register.name" class="il-add--description" placeholder="Informe seu nome" id="name" />
                        </div>
                        <div class="il-form--field">
                            <label for="email-r">Email</label>
                            <input type="email" v-model="register.email" class="il-add--description" placeholder="Informe seu email" id="email-r" />
                        </div>
                        <div class="il-form--field">
                            <label for="password-r">Senha</label>
                            <input type="password" v-model="register.password" class="il-add--description" placeholder="Informe a senha" id="password-r" autocomplete="off" />
                        </div>
                        <div class="il-form--field">
                            <label for="confirmpwd">Repita senha</label>
                            <input type="password" v-model="register.confirmpwd" class="il-add--description" placeholder="Repita a senha" id="confirmpwd" autocomplete="off" />
                        </div>

                        <div class="il-input--info il-center">
                            <button class="il-btn il-btn--entrance">
                                <i class="mdi mdi-24px mdi-check"></i>
                                <span>Logar</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    </div>

</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import accessAdminAPI from '../../common/apiAdmin.js';
export default {
    name: 'access',
    data() {
        return {
            abas: {
                login: true,
                register: false
            },
            login: {
                email: '',
                password: ''
            },
            register: {
                name: '',
                email: '',
                password: '',
                confirmpwd: ''
            },
            user: null
        }
    },
    mounted() {
        this.checkHasUser()
    },
    computed: {
        hasUser() {
            if (this.user) {
                return true
            }
            return false
        }
    },
    methods: {
        ...mapActions('admin', {
            setUser: 'setUser',
            setToken: 'setToken'
        }),
        ...mapGetters('admin', {
            getUser: 'getUser'
        }),
        showAba(aba) {
            if (aba == 'login') {
                this.abas.login = true;
                this.abas.register = false;
            } else {
                this.abas.login = false;
                this.abas.register = true;
            }
        },
        checkHasUser() {
            let user = this.getUser()
            if (user) {
                this.user = user
            }
            return false
        },
        doLogin() {
            let vm = this
            accessAdminAPI
                .login(this.login)
                .then(res => {
                    if (res.data.error == null) {
                        const value = res.data.token;
                        this.user = res.data.user
                        window.localStorage.setItem('_token', value)
                        window.localStorage.setItem('admin', this.user)
                        this.setUser(res.data.user)
                        this.setToken(res.data.token)
                        vm.$emit('msg', {
                            type: 'success',
                            message: `Parabens ${this.user} seu token foi recebido com sucesso`
                        })

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
        },
        doRegister() {
            let vm = this
            if (this.register.password !== this.register.confirmpwd || this.register.confirmpwd == '') {
                vm.$emit('msg', {
                    type: 'danger',
                    message: 'Senha não confirmada'
                })
                return false
            }
            let register = {
                name: this.register.name,
                email: this.register.email,
                password: this.register.password
            }
            accessAdminAPI.register(register)
                .then(res => {
                    if (res.data.error == '') {
                        this.user = res.user;
                        vm.$emit('msg', {
                            type: 'success',
                            message: 'Admin cadastrado com sucesso!'
                        })

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
