<template>
<form class="il-form il-form--payment" @submit.prevent="setFormPost()">
    <div class="il-payment">
        <h5>Pagamento de Alunos</h5>
        <div class="il-form--field">
            <label class="il-label--expenses" for="dt">Data de pgmto</label>
            <input type="date" v-model="dataPayment.data" class="il-input--dn" placeholder="Data de Pagamento" id="dn" />
        </div>
        <div class="il-form--field">
            <label class="il-label--expenses" for="name">Nome</label>
            <input type="text" v-model="dataPayment.name" class="il-add--description" placeholder="Informe o nome do aluno" id="name" />
        </div>
        <div class="il-payment--type" v-if="verifyTypeCheck">
            <div class="il-form--field">
                <label class="il-label--expenses" for="type">Saque/Depósito</label>
                <select v-model="dataPayment.form.check.type" class="il-select" id="type">
                    <option>depósito</option>
                    <option>saque</option>
                </select>
            </div>
            <div class="il-form--field">
                <label class="il-label--expenses" for="bank">Banco</label>
                <select ref="bank" v-model="dataPayment.form.check.bank" class="il-select" id="bank">
                    <option v-for="bank in banks" :key="bank.code">{{bank.name}}</option>
                </select>
            </div>
        </div>
        <div class="il-form--field">
            <label class="il-label--expenses" for="valor">Valor</label>
            <input type="number" v-model="dataPayment.valor" step="0.01" class="il-add--description" placeholder="Informe o valor do pagamento" id="valor" />
        </div>
        <div class="il-field--check">
            <input type="checkbox" id="checkMsg" v-model="dataPayment.sendMessage">
            <label class="il-label--expenses" for="checkMsg">Enviar mensagem</label>

            <input type="checkbox" id="checkRc" v-model="dataPayment.sendReceipt">
            <label class="il-label--expenses" for="checkRc">Enviar recibo</label>
        </div>
        <div class="il-btn--content">
            <button class="il-btn il-btn--submit il-btn--center">
                <i class="mdi mdi-24px mdi-check"></i>Receber
            </button>
        </div>

    </div>
</form>
</template>

<script>
import axios from 'axios';
import accessPaymentAPI from '../../../common/apiPayment.js';
import accessStudentAPI from '../../../common/apiStudent.js';
export default {
  name: 'formPayment',
  props: {
    banks: Array,
    data: String,
    month: String,
    pay: Array
  },
  data() {
    return {
      type: '',
      id: '',
      currentMonth: null,
      dataPaymentID: null,
      dataPayment: {
        data: '',
        name: '',
        valor: '',
        sendMessage: false,
        sendReceipt: false,
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
      },
      dataOldPayment: [],
      formPost: 'create'
    };
  },
  computed: {
    verifyTypeCheck() {
      if (this.type == 'check') {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;
    this.currentMonth = window.localStorage.getItem('monthCurrent');
    this.setData();
    this.getStudent();
    this.verifyCreteOrUpdate();
  },
  methods: {
    setData() {
      this.dataPayment.data = this.data;
    },
    setFormPost() {
      if (this.formPost == 'update') {
        this.updatePayment();
      } else {
        this.createPayment();
      }
    },
    getStudent() {
      if (this.type == 'check') {
        this.dataPayment.form.check.recebido = true;
        this.dataPayment.form.check.type = 'depósito';
        this.dataPayment.form.check.bank = this.banks[0].name;
      }
      let student = JSON.parse(window.localStorage.getItem('student'));
      this.dataPayment.name = student.name;
      this.dataPayment.valor = student.valor;
    },
    verifyCreteOrUpdate() {
      accessPaymentAPI.searchPaymentMonth(this.month).then(res => {
        if (res.data.error == null && res.data.payment.length > 0) {
          this.dataPaymentID = res.data.payment[0]._id;

          this.dataOldPayment = res.data.payment[0].students;
          this.formPost = 'update';
        } else if (res.data.payment.length == 0) {
          this.dataPaymentID = res.data.payment._id;
        }
      });
    },
    getFormData() {
      return {
        month: this.month,
        students: [
          {
            studentID: this.id,
            studentName: this.dataPayment.name,
            datePayment: this.dataPayment.data,
            amountPayment: this.dataPayment.valor,
            formPayment: this.type,
            sendMessage: this.dataPayment.sendMessage,
            sendReceipt: this.dataPayment.sendReceipt
          }
        ]
      };
    },
    updatePayment() {
      let data = this.getFormData();
      this.dataOldPayment.push(data.students[0]);
      accessPaymentAPI
        .updateMultiplePayment(this.dataPaymentID, this.dataOldPayment)
        .then(res => {
          if (res.error === false) {
            this.$emit('message', res.message);
            setTimeout(() => {
              this.$router.push({
                name: 'students'
              });
            }, 4000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    createPayment() {
      let data = this.getFormData();
      accessPaymentAPI
        .create(data)
        .then(res => {
          if (res.data.error == null) {
            alert(res.data.message);
          } else {
            data = res.data.payment;
            this.updatePayment(data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    /*sendMessage() {
                    const url = 'https://www.waboxapp.com/api/send/chat'
                    const token = 'c318841cd87f553162d1f91b716390955d4c0c1430f4f'
                    let uid = '55999767179'
                    let to = '55993015930'
                    let custom_uid  = 'msg-kaizen--01'
                    let text = 'Teste de envio de mensagem'
                    let urlTeste = 'https://www.waboxapp.com/api/send/chat?token=c318841cd87f553162d1f91b716390955d4c0c1430f4f&uid=55999767179&to=55993015930&custom_uid=msg0001&text=Hello+dude'
                    axios.get(urlTeste).then(response => {
                        console.log(response)
                    })
                }*/
  }
};
</script>
