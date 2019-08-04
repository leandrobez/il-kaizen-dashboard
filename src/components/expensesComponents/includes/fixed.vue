<template>
<div>
    <h4>Contas fixas</h4>
    <form class="il-form" @submit.prevent="doPayment">
        <div class="il-form-field">
            <label for="dt">Data de pgmto</label>
            <input type="date" v-model="fixed.data" class="il-input--dn" placeholder="Data de Pagamento" id="dn" />
            <label for="desc">Conta</label>
            <select ref="description" v-model="fixed.description" class="il-select" id="desc">
                <option selected>Escolha uma conta</option>
                <option v-for="(desc,index) in fixedExpenses" :key="index">{{desc}}</option>
            </select>
            <label for="valor">Valor</label>
            <input type="number" v-model="fixed.valor" class="il-add--description" placeholder="Informe o valor a pagar" id="valor" />
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
    name: 'fixed',
    data() {
        return {
            fixed: {
                data: '',
                description: 'Escolha uma conta',
                valor: 0,
                executed: false
            },
            fixedExpenses: ['Net', 'Aluguel', 'PhisioPilates']
        }
    },
    mounted() {
        this.setToday()
    },
    methods: {
        setToday() {
            this.fixed.data = new Date().toISOString().substr(0, 10)

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
                this.fixed.data === '' ||
                this.fixed.description == '' ||
                this.fixed.valor === ''
            ) {
                this.$emit('alert', {
                    status: 'warning',
                    value: 'Todos os campos são obrigatórios.'
                });
                return false;
            } else if (this.fixed.valor == 0) {
                this.$emit('alert', {
                    status: 'warning',
                    value: 'O valor tem que ser maior que zero.'
                });
                return false;
            } else {
                if (this.fixed.description == 'Escolha uma conta') {
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
                        name: this.fixed.description,
                        valor: +this.fixed.valor,
                        executed: this.fixed.executed
                    }]
                }

                apiExpense.accessExpensesFixedAPI.create(data).then(res => {
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
