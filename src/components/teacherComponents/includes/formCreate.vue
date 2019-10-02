<template>
<div class="il-teacher--edit">
    <ilSnapPhoto @avatar="setPicture" />    
    <form class="il-form il-form--signup" @submit.prevent="doSignup">
        <div class="il-signup">
            <div class="il-signup--content">
                <h5>Dados Pessoais</h5>
                <label for="name">Nome</label>
                <input type="text" v-model="signup.name" class="il-add--description" placeholder="nome completo" required />
                <label for="cpf">CPF</label>
                <input type="text" v-model="signup.cpf" class="il-input--cpf" placeholder="seu CPF" id="cpf" required />
                <label for="cr">CR</label>
                <input type="text" v-model="signup.cr" class="il-input--cpf" placeholder="seu CR" id="cr" required />
                <label for="email">Email</label>
                <input type="email" v-model="signup.email" class="il-add--description" placeholder="Email" id="email" />
                <label for="dn">Data Nasc</label>
                <input type="date" v-model="signup.dnasc" class="il-input--dn" placeholder="Data de Nascimento" id="dn" />
            </div>
            <div class="il-signup--content">
                <h5>Endereço</h5>
                <label for="cep">CEP</label>
                <input type="text" v-model="signup.address.cep" class="il-input--cep" placeholder="CEP" id="cep" />
                <i class="mdi mdi-12px mdi-search-web" @click.prevent="getAddress"></i>
                <input type="text" v-model="signup.address.rua_av" class="il-add--description" placeholder="Rua/Av">
                <label for="nr">Nr</label>
                <input type="text" v-model="signup.address.nr" class="il-input--nr" placeholder="NR" id="nr">
                <label for="complemento">Complemento</label>
                <input type="text" v-model="signup.address.complemento" class="il-add--description" placeholder="Complemento" id="complemento">
                <label for="bairro">Bairro</label>
                <input type="text" v-model="signup.address.suburb" class="il-add--description" placeholder="Bairro" id="bairro">
                <label for="cidade">Cidade</label>
                <input type="text" v-model="signup.address.city" class="il-add--description" placeholder="Cidade" id="cidade">
                <label for="uf">UF</label>
                <input type="text" v-model="signup.address.UF" class="il-add--description" placeholder="UF" id="uf">
                <label for="fone">Fone</label>
                <input type="text" v-model="signup.address.fone" class="il-add--description" placeholder="fone" id="fone">
                <label for="cel">Celular</label>
                <input type="text" v-model="signup.address.clr" class="il-add--description" placeholder="Celular" id="cel">
            </div>
        </div>
        <div class="il-input--info il-center">
            <button class="il-btn il-btn--add">
                <i class="mdi mdi-24px mdi-check"></i>
            </button>
        </div>
    </form>
</div>
</template>

<script>
import accessTeacherAPI from '../../../common/apiTeacher.js';
import ilSnapPhoto from '@/components/includes/snapShot.vue';
export default {
  name: 'formTeacherCreate',
  components: {
    ilSnapPhoto
  },
  data() {
    return {
      signup: {
        name: '',
        cpf: '',
        cr: '',
        ativo: true,
        email: '',
        dnasc: '',
        picture: '',
        address: {
          cep: '',
          rua_av: '',
          nr: '',
          complemento: 'Sem complemento',
          suburb: '',
          city: '',
          UF: '',
          fone: '',
          clr: ''
        }
      }
    };
  },
  methods: {
    doSignup() {
      let vm = this;
      accessTeacherAPI
        .create(this.signup)
        .then(res => {
          if (res.error == null) {
            vm.$emit('msg', {
              type: 'success',
              message: 'Professor cadastrado com sucesso!'
            });
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
            message: err
          });
        });
    },
    setPicture(picture) {
      this.signup.picture = picture;
    },
    getAddress() {
      const urlCorreio = 'https://viacep.com.br/ws/';
      let cep = this.signup.address.cep;
      fetch(`${urlCorreio}${cep}/json/`).then(result => {
        if (result.status == 200 && result.statusText == 'OK') {
          result.json().then(r => {
            this.signup.address.suburb = r.bairro;
            this.signup.address.rua_av = r.logradouro;
            this.signup.address.city = r.localidade;
            this.signup.address.UF = r.uf;
          });
        }
      });
    }
  }
};
</script>
