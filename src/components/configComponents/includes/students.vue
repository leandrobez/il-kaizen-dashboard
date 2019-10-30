<template>
<div class="il-dashboard--student">
    <ilAlert :has="checkAlert" :msg="message" />
    <h4 class="il-color--darkblue">Aluno</h4>
    <p class="il-color--light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odit distinctio doloremque ratione voluptates error.</p>
    <input v-model="search" @input="studentSearch()" required type="search" placeholder="Digite o nome do aluno">
    <table class="il-form--lists" v-if="result">
        <tbody>
            <tr>
                <td>Nr</td>
                <td>Nome</td>
                <td>Email</td>
                <td>Ações</td>
            </tr>
            <tr>
                <td>{{result.NR}}</td>
                <td>{{result.NOME}}</td>
                <td>{{result.CPF}}</td>
                <td>
                    <a href="#!" title="Registrar" @click.prevent="signUp()">
                        <i class="mdi mdi-24px mdi-check il-color--dark"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
import accessStudentAPI from '../../../common/apiStudent.js';
const populateDB = require('../../../db/seed');
export default {
  name: 'dashboardStudent',
  components: {
    ilAlert
  },
  data() {
    return {
      message: null,
      key: 0,
      search: '',
      result: null
    };
  },
  computed: {
    checkAlert() {
      if (this.message) {
        return true;
      }
      return false;
    }
  },
  methods: {
    setAlert(obj) {
      this.message = obj;
    },
    studentSearch() {
      let word = this.search;
      let result = null;
      if (word.length > 4) {
        let key = populateDB.search(word);
        if (key != -1) {
          result = populateDB.getStudent(key);

          if (result) {
            this.key = key;
            this.result = result;
          }
        }
      }
    },
    signUp() {
      const email = email => {
        if (email == '') {
          return `user${this.result.NR}@user.com`;
        }
        return email;
      };
      const obs = obs => {
        if (obs == '') {
          return 'Sem observação';
        }
        return obs;
      };
      const origem = origem => {
        if (origem == '') {
          return 'Sem dados a constar';
        }
        return origem;
      };
      const nasc = nasc => {
        if (nasc == '') {
          return '10/10/1966';
        }
        return nasc;
      };
      const cep = cep => {
        if (cep == '') {
          return '90900000';
        }
        return cep;
      };
      const logradouro = rua => {
        if (rua == '') {
          return 'Rua que sobe e desce e o número não aparece.';
        }
        return rua;
      };
      const nr = nr => {
        if (nr == '') {
          return '10000';
        }
        return nr;
      };
      const compl = compl => {
        if (compl == '') {
          return 'Via Láctea';
        }
        return compl;
      };
      const suburb = suburb => {
        if (suburb == '') {
          return 'Sistema solar';
        }
        return suburb;
      };
      const city = city => {
        if (city == '') {
          return 'Porto Alegre';
        }
        return city;
      };
      const uf = uf => {
        if (uf == '') {
          return 'RS';
        }
        return uf;
      };
      const fone = fone => {
        if (fone == '') {
          return '33333333';
        }
        return fone;
      };
      const cel = cel => {
        if (cel == '') {
          return '999999999';
        }
        return cel;
      };
      let register = {
        name: this.result.NOME,
        genre: this.result.SEXO,
        cpf: this.result.CPF,
        vezes: this.result.VEZES,
        valor: this.result.VALOR,
        obs: obs(this.result.OBS),
        origem: origem(this.result.ORIGEM),
        ativo: this.result.ATIVO,
        email: email(this.result.EMAIL),
        dnasc: nasc(this.result.DNASC),
        picture: '',
        desc: {
          perc: this.result.DESC.perc,
          abs: this.result.DESC.abs
        },
        address: {
          cep: cep(this.result.ADDRESS[0].CEP),
          rua_av: logradouro(this.result.ADDRESS[0].LOGRADOURO),
          nr: nr(this.result.ADDRESS[0].NR),
          complemento: compl(this.result.ADDRESS[0].COMPL),
          suburb: suburb(this.result.ADDRESS[0].BAIRRO),
          city: city(this.result.ADDRESS[0].CIDADE),
          UF: uf(this.result.ADDRESS[0].UF),
          fone: fone(this.result.ADDRESS[0].FONE),
          clr: cel(this.result.ADDRESS[0].CEL)
        }
      };

      accessStudentAPI
        .register(register)
        .then(res => {
          if (res.error == null) {
            this.$emit('msg', {
              type: 'success',
              message: 'Cliente cadastrado com sucesso!'
            });
          } else {
            let msg = res.error.message;
            this.$emit('msg', {
              type: msg.type,
              message: msg.value
            });
          }
        })
        .catch(err => {
          let msg = err.error;
          this.$emit('msg', {
            type: 'danger',
            message: msg
          });
        });
    }
  }
};
</script>
