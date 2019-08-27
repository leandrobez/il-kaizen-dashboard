<template>
<div>
    <h4>Contas variaveis</h4>
    <form class="il-form" @submit.prevent="doPayment">
        <div class="il-form--field">
            <label class="il-label--expenses" for="dt">Data de pgmto</label>
            <input type="date" v-model="variable.data" class="il-input--dn" placeholder="Data de Pagamento" id="dn" />
        </div>
         <div class="il-form--field">
            <label class="il-label--expenses" for="desc">Conta</label>
            <select ref="description" v-model="variable.description" class="il-select" id="desc">
                <option selected>Escolha uma conta</option>
                <option v-for="(desc,index) in variableExpenses" :key="index">{{desc}}</option>
            </select>
         </div>
          <div class="il-form--field">
            <label class="il-label--expenses" for="valor">Valor</label>
            <input type="number" v-model="variable.valor" class="il-add--description" placeholder="Informe o valor a pagar" id="valor" />
            <div class="il-btn--content">
                <button class="il-btn il-btn--submit" type="submit">Criar conta</button>
                <button class="il-btn il-btn--entrance" @click="listContas">Listar Contas</button>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import apiExpense from '../../../common/apiExpense.js'
export default {
    name: 'variables',
    data() {
        return {
            variable: {
                data: '',
                description: 'Escolha uma conta',
                valor: 0,
                executed: false
            },
            variableID: null,
            oldVariable: [],
            variableExpenses: ['Luz', 'Aluguel', 'Office']
        }
    },
    mounted() {
        this.setToday()
        this.checkOldVariable()
    },
    methods: {
        setToday() {
            this.variable.data = new Date().toISOString().substr(0, 10)
        },
        checkOldVariable() {
            let vm = this;
            apiExpense.accessExpensesFixedAPI.searchVariableMonth(this.$parent.month)
                .then(res => {
                    console.log(res)
                    if (res.data.error !== null) {
                        const value = res.data.error;
                        vm.$emit('msg', {
                            type: 'warning',
                            message: value
                        });

                    } else {
                        this.variableID = res.data.variable[0]._id
                        this.oldVariable = res.data.variable[0].expenses
                    }
                })
                .catch(err => {
                    vm.$emit('msg', {
                        type: 'warning',
                        message: err
                    });
                });
        },
        doPayment() {
            if (this.$parent.month == null) {
                this.$emit('alert', {
                    status: 'danger',
                    value: 'É obrigatório a escolha de um mês para efetivar o pagamento da conta.'
                })
                return false
            }
            if (
                this.variable.data === '' ||
                this.variable.description == '' ||
                this.variable.valor === ''
            ) {
                this.$emit('alert', {
                    status: 'warning',
                    value: 'Todos os campos são obrigatórios.'
                });
                return false;
            } else if (this.variable.valor == 0) {
                this.$emit('alert', {
                    status: 'warning',
                    value: 'Por favor informe um valor maior que zero.'
                });
                return false;
            } else {
                if (this.variable.description == 'Escolha uma conta') {
                    this.$emit('alert', {
                        status: 'warning',
                        value: 'Por favor escolha uma conta a ser executada.'
                    });
                    return false;
                }
                //return false
                if (this.oldVariable.length > 0) {
                    this.oldVariable.push({
                        date: this.setDate(),
                        name: this.variable.description,
                        valor: +this.variable.valor,
                        executed: this.variable.executed
                    })
                    let data = {
                        month: this.$parent.month,
                        expenses: this.oldVariable
                    }

                    //update fixed
                    apiExpense.accessExpensesVariableAPI.updateVariable(this.variableID, data).then(res => {
                        this.$emit('alert', {
                            status: 'success',
                            value: 'Conta criada com sucesso.'
                        });
                        setTimeout(() => {
                            this.$router.push({
                                name: 'contas.show'
                            })
                        }, 2000);
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    let data = {
                        month: this.$parent.month,
                        expenses: [{
                            date: this.setDate(),
                            name: this.variable.description,
                            valor: +this.variable.valor,
                            executed: this.variable.executed
                        }]
                    }

                    apiExpense.accessExpensesVariableAPI.create(data).then(res => {
                        this.$router.push({
                            name: 'contas.show'
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                }

            }
        },
        setDate() {
            const dt = this.variable.data.split("-")
            return new Date(dt[0], dt[1], dt[2]).toISOString().substr(0, 10)
        },
        listContas() {
            this.$router.push({
                name: 'contas.show'
            })
        }
    }
}
</script>
