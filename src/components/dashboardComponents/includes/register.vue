<template>
<div class="il-dashboard--register">
    <ilAlert :has="checkAlert" :msg="message" />
    <h4 class="il-color--darkblue">Matrículas</h4>
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
                    <span>oi</span>
                </td>
            </tr>
        </tbody>
    </table>

    <table class="il-lists">
        <tbody>
            <tr>
                <td>Nome</td>
                <td>Aula</td>
                <td>Professor</td>
                <td>Conta</td>
                <td>Horários</td>
            </tr>
            <tr v-for="(item,index1) in register" :key="index1">
                <td>{{item.name}}</td>
                <td>{{item.class}}</td>
                <td>{{item.teacher}}</td>
                <td>
                    <span>vezes: {{item.vezes}}</span>
                    <span>valor: {{item.valor}}</span>
                </td>
                <td>
                  <ul>
                    <li v-for="(hour,index2) in item.schedule" :key="`${index1}${index2}`">
                      <span>Dia: {{hour.day}}</span>
                      <span>Hora: {{hour.start}}</span>
                    </li>
                  </ul>
                </td>
            </tr>
            <tr>
                <td colspan="7">total</td>
                <td colspan="8">{{getSum}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
import accessRegisterAPI from '../../../common/apiRegister.js';
export default {
  name: 'dashboardRegister',
  components: {
    ilAlert
  },
  data() {
    return {
      message: null,
      key: 0,
      search: '',
      result: null,
      register: []
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
  mounted() {
    this.listRegister();
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
    listRegister() {
      accessRegisterAPI.getRegisters().then(response => {
        if (response.error == null) {
          this.register = response.register;
        }
      });
    }
  }
};
</script>
