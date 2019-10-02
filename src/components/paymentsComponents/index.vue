<template>
<div class="il-payment--content">
    <!--<ilAlert :has="message ? true : false" :msg="message" />-->
    <ilMonths :months="months" @choice="setMonth" />
    <ilFormPayment :banks="getBanks" @message="setAlert" :data="setToday" :month="getMonth" :pay="payments" />
</div>
</template>

<script>
import months from '../../common/months.js';
import { mapGetters } from 'vuex';
import ilMonths from '@/components/includes/months.vue';
import ilFormPayment from './includes/formPayment.vue';
import ilAlert from '@/components/includes/alerts.vue';
import { Banks } from '../../common/banks.js';
export default {
  name: 'indexPayment',
  components: {
    ilAlert,
    ilMonths,
    ilFormPayment
  },
  data() {
    return {
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
    }
  }
};
</script>
