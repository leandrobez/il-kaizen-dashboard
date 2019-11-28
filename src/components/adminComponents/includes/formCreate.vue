<template>
<form class="il-form il-form--login" @submit.prevent="doRegister">
    <div class="il-form--field">
        <label class="il-color--light" for="name">Nome Completo</label>
        <input type="text" v-model="register.name" class="il-add--description" placeholder="Informe seu nome" id="name" />
    </div>
    <div class="il-form--field">
        <label class="il-color--light" for="email-r">Email</label>
        <input type="email" v-model="register.email" class="il-add--description" placeholder="Informe seu email" id="email-r" />
    </div>
    <div class="il-form--field">
        <label class="il-color--light" for="password-r">Senha</label>
        <input type="password" v-model="register.password" class="il-add--description" placeholder="Informe a senha" id="password-r" autocomplete="off" />
    </div>
    <div class="il-form--field">
        <label class="il-color--light" for="confirmpwd">Repita senha</label>
        <input type="password" v-model="register.confirmpwd" class="il-add--description" placeholder="Repita a senha" id="confirmpwd" autocomplete="off" />
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
  name: 'formAdminCreate',
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
        confirmpwd: ''
      }
    };
  },
  methods: {
    doRegister() {
      let vm = this;
      if (
        this.register.password !== this.register.confirmpwd ||
        this.register.confirmpwd == ''
      ) {
        vm.$emit('msg', {
          type: 'danger',
          message: 'Senha não confirmada'
        });
        return false;
      }
      let register = {
        name: this.register.name,
        email: this.register.email,
        password: this.register.password
      };
      accessAdminAPI
        .register(register)
        .then(res => {
          if (res.data.error == '') {
            this.user = res.user;
            vm.$emit('msg', {
              type: 'success',
              message: 'Admin cadastrado com sucesso!'
            });
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
