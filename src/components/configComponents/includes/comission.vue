<template>
<div class="il-dashboard--teacher">
    <ilAlert :has="checkAlert" :msg="message" />
    <h4 class="il-color--darkblue">Aulas professor</h4>
    <p class="il-color--light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odit distinctio doloremque ratione voluptates error.</p>
    <input v-model="word" @input="studentSearch()" required type="search" placeholder="Digite o nome do aluno">
    <table class="il-form--lists" v-if="searchs.length>0">
        <tbody>
            <tr>
                <td>Nr</td>
                <td>Nome</td>
                <td>Ações</td>
            </tr>
            <tr v-for="(list,index) in searchs" :key="index" :class="list.ativo ? '' : 'il-inactive'">
                <td>{{index+1}}</td>
                <td>{{list.name}}</td>
                <td>
                    <a href="#!" title="Escolher" @click.prevent="setChoice(index)">
                        <i class="mdi mdi-24px mdi-check il-color--dark"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>

    <table class="il-lists">
        <tbody>
            <tr>
                <th>Mês</th>
                <th>Dia</th>
                <th>Aluno</th>
                <th>Horário</th>
                <th>Aula</th>
                <th>Vezes Sem</th>
                <th>Hora/Aula</th>
                <th>Substituição</th>
                <th>Presença</th>
            </tr>
            <tr v-for="(item,index1) in cronogram" :key="index1">
                <td>
                    <select v-model="cronogram[index1].mes" id="">
                        <option :value="m" v-for="(m,index) in months" :key="`mes${index}`">{{m}}</option>
                    </select>
                </td>

                <td>
                    <select v-model="cronogram[index1].day" id="">
                        <option :value="d" v-for="(d,index) in makeDays" :key="`day${index}`">{{d}}</option>
                    </select>
                </td>
                <td>
                    {{cronogram[index1].student}}
                </td>
                <td>
                    <select v-model="cronogram[index1].hour" id="">
                        <option :value="op" v-for="(op,index) in hours" :key="`hour${index}`">{{op}}</option>
                    </select>
                </td>
                <td>
                    <select v-model="cronogram[index1].class" id="">
                        <option value="pilates">Pilates</option>
                        <option value="corealign">CoreAlign</option>
                    </select>
                </td>
                <td>
                    {{cronogram[index1].vezes}}
                </td>
                <td>
                    {{cronogram[index1].valor}}
                </td>
                <td>
                    <select v-model="cronogram[index1].substitution">
                        <option value="s">Sim</option>
                        <option value="n">Não</option>
                    </select>
                </td>
                <td>
                    <select v-model="cronogram[index1].presence" id="">
                        <option value="s">Sim</option>
                        <option value="n">Não</option>
                    </select>
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
import { mapGetters, mapActions } from 'vuex';
import ilAlert from '@/components/includes/alerts.vue';
import accessStudentAPI from '../../../common/apiStudent.js';
export default {
  name: 'dashboardComission',
  components: {
    ilAlert
  },
  data() {
    return {
      hours: [
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:30'
      ],
      months: [
        'jan',
        'fev',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez'
      ],
      message: null,
      key: 0,
      word: '',
      students: [],
      searchs: [],
      cronogram: [
        {
          student: '',
          mes: '',
          day: '',
          hour: '',
          class: '',
          vezes: 0,
          valor: 0,
          substitution: '',
          presence: ''
        }
      ]
    };
  },
  computed: {
    checkAlert() {
      if (this.message) {
        return true;
      }
      return false;
    },

    makeDays() {
      let days = [];
      for (let i = 1; i < 31; i++) {
        days.push(i);
      }
      return days;
    },
    getSum() {
      let sum = 0;
      this.cronogram.forEach(element => {
        sum += element.valor;
      });
      return sum;
    }
  },
  mounted() {
    this.getStudents();
    this.setMonth();
  },
  methods: {
    ...mapActions('cronogram', {
      set_comission: 'set_comission'
    }),

    setAlert(obj) {
      this.message = obj;
    },
    setMonth() {
      let today = new Date();
      let month = today.getMonth();
      this.cronogram[this.cronogram.length - 1].mes = this.months[month];
    },
    studentSearch() {
      let word = this.word;
      if (word.length > 4) {
        let search = this.students.filter(element => {
          return element.name.toLowerCase().includes(this.word.toLowerCase());
        });
        if (search.length > 0) {
          this.searchs = search;
          //console.log(this.searchs);
        }
      } else {
        this.searchs = [];
      }
    },
    getStudents() {
      accessStudentAPI
        .getStudents()
        .then(response => {
          if (response.error === null && response.student.length > 0) {
            this.students = response.student;
          } else {
            if (response.error) {
              this.setAlert({
                type: 'warning',
                message: response.message.value
              });
            }
          }
        })
        .catch(err => {
          this.setAlert({
            type: 'danger',
            message:
              'Você não tem permisssão para acessar essa página! ' +
              err +
              ' Você será redirecionado para página de login em 4 seg'
          });
          setTimeout(() => {
            this.$router.push({
              name: 'home'
            });
          }, 3000);
        });
    },
    setChoice(key) {
      const check = () => {
        if (
          this.cronogram[this.cronogram.length - 1].day == '' ||
          this.cronogram[this.cronogram.length - 1].hour == '' ||
          this.cronogram[this.cronogram.length - 1].class == '' ||
          this.cronogram[this.cronogram.length - 1].substitution == '' ||
          this.cronogram[this.cronogram.length - 1].presence == ''
        ) {
          alert('Por favor escolhas as opções para prosseguir');
          return false;
        }
        return true;
      };
      const valueClass = () => {
        let fator = this.searchs[key].vezes * 4;
        let vl = this.searchs[key].valor / fator;
        return vl;
      };
      if (!check()) {
        return;
      }
      let student = this.searchs[key].name;
      this.cronogram[this.cronogram.length - 1].student = student;
      this.cronogram[this.cronogram.length - 1].vezes = this.searchs[key].vezes;
      if (this.cronogram[this.cronogram.length - 1].substitution == 'n') {
        this.cronogram[this.cronogram.length - 1].valor = valueClass();
      } else {
        this.cronogram[this.cronogram.length - 1].valor = 25;
      }
      let today = new Date();
      let month = today.getMonth();
      let mes = this.months[month];
      this.cronogram.push({
        student: '',
        mes: mes,
        day: '',
        hour: '',
        class: '',
        vezes: 0,
        valor: 0,
        substitution: '',
        presence: ''
      });
      this.word = '';
      this.searchs = [];
    }
  }
};
</script>
