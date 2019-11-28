<template>
<div class="il-dashboard--budget">
    <ilAlert :has="checkAlert" :msg="message" />
    <h4 class="il-color--darkblue">Despesas</h4>
    <p class="il-color--light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, corporis.</p>
    
    <ilMonths :months="months" @choice="choiceMonth" />
    <div class="il-expenses--content">
        <ul class="il-box--expenses">
            <li>
                <a href="#1" class="il-nav--link"><i class="mdi mdi-account-star mdi-36px"></i>
                    <h5>Fixas</h5>
                </a>
            </li>
            <li>
                <a href="#1" class="il-nav--link"><i class="mdi mdi-clipboard-account mdi-36px"></i>
                    <h5>Variáveis</h5>
                </a>
            </li>
            <li>
                <a href="#1" class="il-nav--link"><i class="mdi mdi-clipboard-account mdi-36px"></i>
                    <h5>Extras</h5>
                </a>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import ilMonths from '@/components/includes/months.vue';
import ilAlert from '@/components/includes/alerts.vue';

import allMonths from '../../../common/months.js';
export default {
  name: 'dashboardBudget',
  components: {
    ilAlert,
    ilMonths
  },
  data() {
    return {
      message: null,
      months: [],
      month: null
    };
  },
  computed: {
    checkAlert() {
      if (this.message) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.months = allMonths;
    this.month = this.months[0].label;
  },
  methods: {
    choiceMonth(key) {
      this.month = this.months[key].abr;
    }
  }
};
</script>
