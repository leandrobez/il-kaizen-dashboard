<template>
<div class="il-expenses">
    <h3>Listagem das despesas do mês</h3>
    <ilAlert :has="checkAlert" :msg="message" />
    <table v-if="checkExpences">
        <thead>
            <tr>
                <th>Dta</th>
                <th>Tipo</th>
                <th>Conta</th>
                <th>Valor</th>
                <th>Situação</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in getFixedExpenses" :key="index">
                <td>{{item.date}}</td>
                <td>Fixas</td>
                <td>{{item.name}}</td>
                <td>{{item.valor}}</td>
                <td>{{item.executed ? 'paga' : 'a pagar'}}</td>
                <td><a href="#" @click.prevent="doAction(index)" :title="item.executed ? 'Conta paga' : 'Confirmar pgmto'">{{item.executed ? 'Conta paga' : 'Confirmar pgmto'}}</a></td>
            </tr>
            <tr v-for="(item,index) in getExtraExpenses" :key="index">
                <td>{{item.date}}</td>
                <td>Extras</td>
                <td>{{item.name}}</td>
                <td>{{item.valor}}</td>
                <td>{{item.executed ? 'paga' : 'a pagar'}}</td>
                <td><a href="#" @click.prevent="doAction(index)" :title="item.executed ? 'Conta paga' : 'Confirmar pgmto'">{{item.executed ? 'Conta paga' : 'Confirmar pgmto'}}</a></td>
            </tr>
            <tr v-for="(item,index) in getVariableExpenses" :key="index">
                <td>{{item.date}}</td>
                <td>Variaveis</td>
                <td>{{item.name}}</td>
                <td>{{item.valor}}</td>
                <td>{{item.executed ? 'paga' : 'a pagar'}}</td>
                <td><a href="#" @click.prevent="doAction(index)" :title="item.executed ? 'Conta paga' : 'Confirmar pgmto'">{{item.executed ? 'Conta paga' : 'Confirmar pgmto'}}</a></td>
            </tr>
        </tbody>
    </table>
    <p v-else>Não hás conas registradas</p>
</div>
</template>

<script>
import apiExpense from '../../common/apiExpense.js';

import ilAlert from '@/components/includes/alerts.vue';
export default {
  name: 'listFixed',
  components: {
    ilAlert
  },
  data() {
    return {
      expenses: [
        {
          fixed: []
        },
        {
          extra: []
        },
        {
          variable: []
        }
      ],
      list: {
        do: false
      },
      message: null
    };
  },
  mounted() {
    this.setExpenses();
  },
  computed: {
    checkAlert() {
      if (this.message) {
        return true;
      }
      return false;
    },
    checkExpences() {
      if (
        (this.expenses[0].fixed && this.expenses[0].fixed.length > 0) ||
        (this.expenses[0].extra && this.expenses[0].extra.length > 0) ||
        (this.expenses[0].variable && this.expenses[0].variable.length > 0)
      ) {
        return true;
      }
      return false;
    },
    getExpenses() {
      return this.expenses;
    },
    getFixedExpenses() {
      return this.expenses[0].fixed;
    },
    getExtraExpenses() {
      return this.expenses[0].extra;
    },
    getVariableExpenses() {
      return this.expenses[0].variable;
    }
  },
  methods: {
    setAlert(obj) {
      this.message = {
        type: obj.status,
        message: obj.value
      };
    },
    setExpenses() {
      //this.fixedID = this.$router.params.id;
      apiExpense.accessExpensesFixedAPI
        .getFixed()
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.statusText == 'OK') {
            if (res.data.error) {
              this.setAlert({
                status: 'warning',
                value: res.data.message.value
              });
            } else {
              if (res.data.fixed.length > 0) {
                //console.log('fixed',res.data.fixed[0])
                this.expenses[0].fixed = res.data.fixed[0].expenses;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      apiExpense.accessExpensesExtraAPI
        .getExtra()
        .then(res => {
          if (res.status == 200 && res.statusText == 'OK') {
            if (res.data.error) {
              this.setAlert({
                status: 'warning',
                value: res.data.message.value
              });
            } else {
              if (res.data.extra.length > 0) {
                this.expenses[0].extra = res.data.extra[0].expenses;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      apiExpense.accessExpensesVariableAPI
        .getVariable()
        .then(res => {
          if (res.status == 200 && res.statusText == 'OK') {
            if (res.data.error) {
              this.setAlert({
                status: 'warning',
                value: res.data.message.value
              });
            } else {
              if (res.data.variable.length > 0) {
                this.expenses[0].variable = res.data.variable[0].expenses;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    doAction(ID) {
      return;
    }
  }
};
</script>

<style>
</style>
