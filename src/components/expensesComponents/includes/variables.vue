<template>
<div>
    <h4>Contas variaveis</h4>
    <form class="il-form" @submit.prevent="doPayment">
        <div class="il-form-field">
            <label for="dt">Data de pgmto</label>
            <input type="date" v-model="variable.data" class="il-input--dn" placeholder="Data de Pagamento" id="dn" />
            <label for="desc">Conta</label>
            <select ref="description" v-model="variable.description" class="il-select" id="desc">
                <option selected>Escolha uma conta</option>
                <option v-for="(desc,index) in variableExpenses" :key="index">{{desc}}</option>
            </select>
            <label for="valor">Valor</label>
            <input type="number" v-model="variable.valor" class="il-add--description" placeholder="Informe o valor a pagar" id="valor" />
            <div class="il-btn--content">
                <button class="il-btn il-btn--add">
                    <i class="mdi mdi-24px mdi-check"></i>
                </button>
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
            variableExpenses: ['Luz', 'Aluguel', 'Office']
        }
    },
    mounted() {
        this.setToday()
    },
    methods: {
        setToday() {
            this.variable.data = new Date().toISOString().substr(0, 10)
        },
        doPayment() {
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
                    value: 'O valor tem que ser maior que zero.'
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
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        setDate() {
            const dt = this.fixed.data.split("-")
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
