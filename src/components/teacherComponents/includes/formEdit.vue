<template>
<div class="il-teacher--edit">
    <ilSnapPhoto @avatar="setPicture" v-if="showSnapShot" />
    <div class="il-snapshot--avatar" v-if="teacher.picture">
        <img :src="`data:image/jpeg;base64,/${teacher.picture}`" alt="">
    </div>
    <form class="il-form il-form--signup" @submit.prevent="doUpdate">
        <div class="il-signup">
            <div class="il-signup--content">
                <h5>Dados Pessoais</h5>
                <label for="name">Nome</label>
                <input type="text" v-model="teacher.name" class="il-add--description" placeholder="nome completo" required />
                <label for="cpf">CPF</label>
                <input type="text" v-model="teacher.cpf" class="il-input--cpf" placeholder="seu CPF" id="cpf" required />
                <label for="cr">CR</label>
                <input type="text" v-model="teacher.cr" class="il-input--cpf" placeholder="seu CR" id="cr" required />
                <label for="email">Email</label>
                <input type="email" v-model="teacher.email" class="il-add--description" placeholder="Email" id="email" />
                <label for="dn">Data Nasc</label>
                <input type="date" v-model="teacher.dnasc" class="il-input--dn" placeholder="Data de Nascimento" id="dn" />
            </div>
            <div class="il-teacher--content">
                <h5>Endereço</h5>
                <label for="cep">CEP</label>
                <input type="text" v-model="teacher.address.cep" class="il-input--cep" placeholder="CEP" id="cep" />
                <i class="mdi mdi-12px mdi-search-web" @click.prevent="getAddress"></i>
                <input type="text" v-model="teacher.address.rua_av" class="il-add--description" placeholder="Rua/Av">
                <label for="nr">Nr</label>
                <input type="text" v-model="teacher.address.nr" class="il-input--nr" placeholder="NR" id="nr">
                <label for="complemento">Complemento</label>
                <input type="text" v-model="teacher.address.complemento" class="il-add--description" placeholder="Complemento" id="complemento">
                <label for="bairro">Bairro</label>
                <input type="text" v-model="teacher.address.suburb" class="il-add--description" placeholder="Bairro" id="bairro">
                <label for="cidade">Cidade</label>
                <input type="text" v-model="teacher.address.city" class="il-add--description" placeholder="Cidade" id="cidade">
                <label for="uf">UF</label>
                <input type="text" v-model="teacher.address.UF" class="il-add--description" placeholder="UF" id="uf">
                <label for="fone">Fone</label>
                <input type="text" v-model="teacher.address.fone" class="il-add--description" placeholder="fone" id="fone">
                <label for="cel">Celular</label>
                <input type="text" v-model="teacher.address.clr" class="il-add--description" placeholder="Celular" id="cel">
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
  name: 'formTeacherEdit',
  props: {
    id: String
  },
  components: {
    ilSnapPhoto
  },
  data() {
    return {
      showSnapShot: false,
      teacher: {
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
          complemento: '',
          suburb: '',
          city: '',
          UF: '',
          fone: '',
          clr: ''
        }
      }
    };
  },
  mounted() {
    this.getTeacher();
  },
  methods: {
    getTeacher() {
      let vm = this;
      if (this.id) {
        accessTeacherAPI
          .searchTeacher(this.id)
          .then(res => {
            if (res.error == null) {
              const formatData = () => {
                let dnasc = res.teacher.dnasc; //2019-07-09T00:00:00.000Z
                const [dt, schema] = dnasc.split('T');
                const [y, m, d] = dt.split('-');
                return `${y}-${m}-${d}`;
              };
              this.teacher.name = res.teacher.name;
              this.teacher.cpf = res.teacher.cpf;
              this.teacher.cr = res.teacher.cr;
              this.teacher.picture = res.teacher.picture;
              this.teacher.dnasc = formatData();
              this.teacher.email = res.teacher.email;
              this.teacher.ativo = res.teacher.ativo;
              this.teacher.address.cep = res.teacher.address.cep;
              this.teacher.address.city = res.teacher.address.city;
              this.teacher.address.clr = res.teacher.address.clr;
              this.teacher.address.fone = res.teacher.address.fone;
              this.teacher.address.complemento =
                res.teacher.address.complemento;
              this.teacher.address.cep = res.teacher.address.cep;
              this.teacher.address.nr = res.teacher.address.nr;
              this.teacher.address.rua_av = res.teacher.address.rua_av;
              this.teacher.address.suburb = res.teacher.address.suburb;
              this.teacher.address.UF = res.teacher.address.UF;

              if (
                this.teacher.picture == '' ||
                this.teacher.picture == 'vai a foto'
              ) {
                this.showSnapShot = true;
              }
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
      }
    },
    doUpdate() {
      let vm = this;
      accessTeacherAPI
        .updateTeacher(this.id, this.teacher)
        .then(res => {
          if (res.data.error == '') {
            vm.$emit('msg', {
              type: 'success',
              message: 'O professor/a teve sua conta modificada com sucesso!'
            });
            setTimeout(() => {
              vm.$router.push({
                name: 'teachers'
              });
            }, 2500);
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
      this.teacher.picture = picture;
    },
    getAddress() {
      const urlCorreio = 'https://viacep.com.br/ws/';
      let cep = this.teacher.address.cep;
      fetch(`${urlCorreio}${cep}/json/`).then(result => {
        if (result.status == 200 && result.statusText == 'OK') {
          result.json().then(r => {
            this.teacher.address.suburb = r.bairro;
            this.teacher.address.rua_av = r.logradouro;
            this.teacher.address.city = r.localidade;
            this.teacher.address.UF = r.uf;
          });
        }
      });
    }
  }
};
</script>
