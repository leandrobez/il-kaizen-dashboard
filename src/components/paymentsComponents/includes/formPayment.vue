<template>
<form class="il-form il-form--payment" @submit.prevent="doPayment()">
    <div class="il-payment">
        <h5>Pagamento de Alunos</h5>
        <label for="dt">Data de pgmto</label>
        <input type="date" v-model="dataPayment.data" class="il-input--dn" placeholder="Data de Pagamento" id="dn" />
        <label for="name">Nome</label>
        <input type="text" v-model="dataPayment.name" class="il-add--description" placeholder="Informe o nome do aluno" id="name" />
        <div class="il-payment--type" v-if="verifyTypeCheck">
            <label for="type">Saque/Depósito</label>
            <select v-model="dataPayment.form.check.type" class="il-select" id="type">
                <option>depósito</option>
                <option>saque</option>
            </select>
            <label for="bank">Banco</label>
            <select ref="bank" v-model="dataPayment.form.check.bank" class="il-select" id="bank">
                <option v-for="bank in banks" :key="bank.code">{{bank.name}}</option>
            </select>
        </div>
        <label for="valor">Valor</label>
        <input type="number" v-model="dataPayment.valor" step="0.01" class="il-add--description" placeholder="Informe o valor do pagamento" id="valor" />
        <div class="il-btn--content">
            <button class="il-btn il-btn--add">
                <i class="mdi mdi-24px mdi-check"></i>
            </button>
        </div>

    </div>
</form>
</template>

<script>
import accessPaymentAPI from '../../../common/apiPayment.js';
export default {
    name: 'formPayment',
    props: {
        type: String,
        id: String,
        banks: Array,
        data: String
    },
    data() {
        return {
            currentMonth: null,
            dataPayment: {
                data: '',
                name: '',
                valor: '',
                form: {
                    check: {
                        recebido: false,
                        bank: '',
                        type: ''
                    },
                    money: {
                        recebido: false,
                        type: ''
                    }
                }
            }
        }
    },
    computed: {
        verifyTypeCheck() {
            if (this.type == 'check') {
                return true
            }
            return false
        }
    },
    mounted() {
        this.currentMonth = +window.localStorage.getItem('monthCurrent');
        this.setData()
        this.getStudent()
    },
    methods: {
        setData() {
            const dt = this.data.split("-")
            this.dataPayment.data = new Date(dt[0], dt[1], dt[2]).toISOString().substr(0, 10)
        },
        getStudent() {
            if (this.type == 'check') {
                this.dataPayment.form.check.recebido = true
                this.dataPayment.form.check.type = 'depósito'
                this.dataPayment.form.check.bank = this.banks[0].name
            }
            let student = JSON.parse(window.localStorage.getItem('student'))

            this.dataPayment.name = student.name
            this.dataPayment.valor = student.valor
        },
        doPayment() {
            let data = {
                month: localStorage.getItem('monthCurrent'),
                students: [{
                    studentID: this.id,
                    studentName: this.dataPayment.name,
                    datePayment: this.dataPayment.data,
                    amountPayment: this.dataPayment.valor,
                    formPayment: this.type,
                    sendMessage: false,
                    sendRecibo: false
                }]
            }
            accessPaymentAPI.create(data).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
