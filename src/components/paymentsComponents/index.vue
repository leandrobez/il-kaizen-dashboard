<template>
<div class="il-payment--content">
    <ilAlert :has="message ? true : false" :msg="message" />
    <ilMonths :months="months" @choice="setMonth" />
    <ilFormPayment :banks="getBanks" @message="setAlert" :data="setToday" :month="getMonth" :pay="payments" @receipt="setReceipt" />
    <div class="il-receipt--modal" >
    <ilReceipt :student="student" :data="setToday" :month="getMonthFull()" v-if="hasStudent"/>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import months from '../../common/months.js';
import ilMonths from '@/components/includes/months.vue';
import ilFormPayment from './includes/formPayment.vue';
import ilReceipt from './includes/receipt.vue';
import ilAlert from '@/components/includes/alerts.vue';
import { Banks } from '../../common/banks.js';
export default {
  name: 'indexPayment',
  components: {
    ilReceipt,
    ilAlert,
    ilMonths,
    ilFormPayment
  },
  data() {
    return {
      student: null,
      payments: [],
      months: [],
      month: null,
      message: null
    };
  },
  computed: {
    setToday() {
      return new Date().toISOString().substr(0, 10);
    },
    getBanks() {
      return Banks();
    },
    checkAlert() {
      if (this.message) {
        return true;
      }
      return false;
    },
    getMonth() {
      let today = new Date();
      let keyMonth = today.getMonth();

      return this.months[keyMonth].abr;
    },
    hasStudent() {
      if (this.student) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.months = months;
    this.payments = this.getPayments();
  },
  methods: {
    ...mapGetters('payment', {
      getPayments: 'getPayments'
    }),
    setMonth(index) {
      localStorage.setItem('monthCurrent', this.months[index].abr);
    },
    setAlert(obj) {
      this.message = {
        type: obj.status,
        message: obj.value
      };
    },
    setReceipt(obj) {
      console.log(obj);
      this.student = obj;
      const modal = document.querySelector('.il-receipt--modal');
      modal.classList.add('il-modal--open');
    },
    getMonthFull() {
      let today = new Date();
      let keyMonth = today.getMonth();

      return this.months[keyMonth].label;
    }
  }
};
</script>

<style lang="scss" scoped>
.il-payment--content {
  position: relative;
  .il-receipt--modal {
    position: absolute;
    background: rgb(131, 117, 117);
    position: absolute;
    top: 0;
    left: -150%;

    width: 100%;
    min-width: 600px;
    background: #fefefe;
    border: 1px solid #d6ebf5;
    &.il-modal--open {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
