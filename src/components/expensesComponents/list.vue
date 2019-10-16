<template>
<div class="il-lists" v-if="verifyExpenses">
    <ul class="il-list--header">
        <li>Dta</li>
        <li>Tipo</li>
        <li>Conta</li>
        <li>Valor</li>
        <li>Situação</li>
        <li>Ações</li>
    </ul>
    <ul class="il-list--items" v-for="(item,index) in getFixedExpenses" :key="index">
        <li>{{item.date}}</li>
        <li>Fixas</li>
        <li>{{item.name}}</li>
        <li>{{item.valor}}</li>
        <li>{{item.executed ? 'paga' : 'a pagar'}}</li>
        <li>
            <ul class="il-list--actions">
                <li>
                    <a href="#" @click.prevent="doAction(index)" :title="item.executed ? 'Conta paga' : 'Confirmar pgmto'">{{item.executed ? 'Conta paga' : 'Confirmar pgmto'}}</a>
                </li>
            </ul>
        </li>
    </ul>
    <ul class="il-list--items" v-for="(item,index) in getExtraExpenses" :key="index">
        <li>{{item.date}}</li>
        <li>Extras</li>
        <li>{{item.name}}</li>
        <li>{{item.valor}}</li>
        <li>{{item.executed ? 'paga' : 'a pagar'}}</li>
        <li>
            <ul class="il-list--actions">
                <li>
                    <a href="#" @click.prevent="doAction(index)" :title="item.executed ? 'Conta paga' : 'Confirmar pgmto'">{{item.executed ? 'Conta paga' : 'Confirmar pgmto'}}</a>
                </li>
            </ul>
        </li>
    </ul>
    <ul class="il-list--items" v-for="(item,index) in getVariableExpenses" :key="index">
        <li>{{item.date}}</li>
        <li>Extras</li>
        <li>{{item.name}}</li>
        <li>{{item.valor}}</li>
        <li>{{item.executed ? 'paga' : 'a pagar'}}</li>
        <li>
            <ul class="il-list--actions">
                <li>
                    <a href="#" @click.prevent="doAction(index)" :title="item.executed ? 'Conta paga' : 'Confirmar pgmto'">{{item.executed ? 'Conta paga' : 'Confirmar pgmto'}}</a>
                </li>
            </ul>
        </li>
    </ul>
</div>
<div class="il-lists" v-else>
    <h3 class="il-color--light">Listagem das despesas do mês</h3>
    <ilAlert :has="checkAlert" :msg="message" />
    <p class="il-color--light">Não hás contas registradas</p>
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
      hasExpenses: {
        fixed: false,
        variable: false,
        extra: false
      },
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
    verifyExpenses() {
      if (this.expenses[0].fixed && this.expenses[0].fixed.length > 0) {
        this.setStatusExpenses('fixed');
      }
      if (this.expenses[0].extra && this.expenses[0].extra.length > 0) {
        this.setStatusExpenses('extra');
      }
      if (this.expenses[0].variable && this.expenses[0].variable.length > 0) {
        this.setStatusExpenses('variable');
      }
      if (
        this.hasExpenses.fixed ||
        this.hasExpenses.extra ||
        this.hasExpenses.variable
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
    setStatusExpenses(expense) {
      switch (expense) {
        case 'fixed':
          this.hasExpenses.fixed = true;
          break;
        case 'variable':
          this.hasExpenses.variable = true;
          break;
        case 'extra':
          this.hasExpenses.extra = true;
          break;
      }
    },
    setAlert(obj) {
      this.message = {
        type: obj.status,
        message: obj.value
      };
    },
    setExpenses() {
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
    doAction(key) {
      console.log(key);
      return;
    }
  }
};
</script>
