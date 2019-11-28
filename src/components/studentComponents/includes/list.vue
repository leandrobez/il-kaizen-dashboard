<template>
<div class="il-lists">
    <div class="il-search--student">
        <input v-model="word" @input="studentSearch()" required type="search" placeholder="Digite o nome do aluno">
        <div class="il-search--result" v-if="searchs.length>0">
          <table>
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
                  <a :href="`#student${list._id}`" title="Mais sobre esse aluno" class="il-link--search">Ver</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    <table class="il-form--lists">
        <tbody>
            <tr>
                <td>Nr</td>
                <td>Nome</td>
                <td>Plano</td>
                <td>Pagamentos</td>
                <td>Ações</td>
            </tr>
            <tr v-for="(list,index) in students" :key="index" :class="list.ativo ? '' : 'il-inactive'" :id="`student${list._id}`">
                <td>{{index+1}}</td>
                <td>
                    <ul class="il-list--info">
                        <li class="name">{{list.name}}</li>
                    </ul>
                </td>
                <td>
                    <ul class="il-list--plan">
                        <li class="plus">Vezes: {{list.vezes}}</li>
                        <li class="value">Valor: {{list.valor}}</li>
                    </ul>
                </td>
                <td>{{checkStatusPayment(list._id)}}</td>
                <td>
                    <ul class="il-list--actions">
                        <li>
                            <a href="!#" @click.prevent="deleteStudent(list._id,index)">
                                <i class="mdi mdi-12px mdi-delete" title="Eliminar cliente"></i>
                            </a>
                        </li>
                        <li>
                            <a href="!#" @click.prevent="editStudent(list._id)">
                                <i class="mdi mdi-12px mdi-account-edit" title="Editar conta"></i>
                            </a>
                        </li>
                        <li>
                            <router-link :to="{name:'student.register',params: {id: list._id}}">
                                <i class="mdi mdi-12px mdi-receipt" title=" Matricular o aluno"></i>
                            </router-link>
                        </li>
                        <li>
                            <a href="!#" @click.prevent="makePayment(index,list._id,'check')">
                                <i v-if="!getStatusPayment(list._id)" class="mdi mdi-12px mdi-script" title="Receber pagamento do cliente com cheque"></i>
                            </a>
                        </li>
                        <li>
                            <a href="!#" @click.prevent="makePayment(index,list._id,'money')">
                                <i v-if="!getStatusPayment(list._id)" class="mdi mdi-12px mdi-square-inc-cash" title="Receber pagamento do cliente com dinheiro"></i>
                            </a>
                        </li>
                        <li>
                            <router-link :to="{name:'evaliation', params: {
                              id:list._id
                            }}"><i class="mdi mdi-12px mdi-chart-line" title="Criar avaliação"></i></router-link>
                        </li>
                        <li>
                            <a href="!#" @click.prevent="getAddress(index)">
                                <i class="mdi mdi-12px mdi-account-location" title="Ver o Endereço"></i>
                            </a>
                        </li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'listStudent',
  props: {
    students: Array,
    payments: Array
  },
  data() {
    return {
      word: '',
      searchs: []
    };
  },
  mounted() {
    if (this.word == '') {
      this.searchs = [];
    }
  },
  methods: {
    ...mapActions('evaliation', {
      setCurrentStudent: 'setCurrentStudent'
    }),
    studentSearch() {
      let word = this.word;
      if (word.length > 4) {
        let search = this.students.filter(element => {
          return element.name.toLowerCase().includes(this.word.toLowerCase());
        });
        if (search.length > 0) {
          this.searchs = search;
        }
      } else {
        this.searchs = [];
      }
    },
    checkClassPayment(id) {
      let check = this.payments.filter(payment => payment.studentID == id);
      if (check.length > 0) {
        if (check[0].formPayment == 'check') {
          return 'il-background--gradient-great-whale ';
        } else {
          return 'il-background--dark il-color--light';
        }
      } else {
        return '';
      }
    },
    checkStatusPayment(id) {
      let check = this.payments.filter(payment => payment.studentID == id);
      if (check.length > 0) {
        return `OK - ${check[0].formPayment}`;
      } else {
        return 'Sem registro';
      }
    },
    getStatusPayment(id) {
      let check = this.payments.filter(payment => payment.studentID == id);
      if (check.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    deleteStudent(id, index) {
      this.$emit('delete', (id, index));
    },
    editStudent(id) {
      this.$router.push({
        name: 'student.edit',
        params: {
          id: id
        }
      });
    },
    makePayment(key, id, type) {
      let student = JSON.stringify({
        name: this.students[key].name,
        valor: this.students[key].valor
      });
      window.localStorage.setItem('student', student);
      this.$router.push({
        name: 'payment',
        params: {
          id,
          type
        }
      });
    },
    getAddress(key) {
      this.$emit('setAddress', key);
    }
  }
};
</script>
