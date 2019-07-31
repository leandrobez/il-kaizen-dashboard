<template>
<div class="il-payment">
    <ilAlert :has="message ? true : false" :msg="message" />
    <ilMonths :months="months" @choice="setMonth" />
    <ilFormPayment :banks="getBanks" :type="getType" :id="getID" @message="setMessage" :data="setToday" />
</div>
</template>

<script>
import ilMonths from '@/components/includes/months.vue';
import ilFormPayment from './includes/formPayment.vue';
import ilAlert from '@/components/includes/alerts.vue'
import {
    Banks
} from '../../common/banks.js';
export default {
    name: 'indexPayment',
    components: {
        ilAlert,
        ilMonths,
        ilFormPayment,
    },
    data() {
        return {
            months: [{
                    abr: 'Jan',
                    label: 'Janeiro'
                },
                {
                    abr: 'Fev',
                    label: 'Feveiro'
                },
                {
                    abr: 'Mar',
                    label: 'Março'
                },
                {
                    abr: 'Abr',
                    label: 'Abril'
                },
                {
                    abr: 'Mai',
                    label: 'Maio'
                },
                {
                    abr: 'Jun',
                    label: 'Junho'
                },
                {
                    abr: 'Jul',
                    label: 'Julho'
                },
                {
                    abr: 'Ago',
                    label: 'Agosto'
                },
                {
                    abr: 'Set',
                    label: 'Setembro'
                },
                {
                    abr: 'Out',
                    label: 'Outubro'
                },
                {
                    abr: 'Nov',
                    label: 'Novembro'
                }, {
                    abr: 'Dez',
                    label: 'Dezembro'
                }
            ],
            message: null
        }
    },
    computed: {
        setToday() {
            return new Date().toISOString().substr(0, 10);
        },
        getBanks() {
            return Banks()
        },
        getType() {
            return this.$route.params.type
        },
        getID() {
            return this.$route.params.id
        },
        getMonth() {
            return 'jul';
        },
        checkAlert() {
            if (this.alert.message) {
                this.clearAlert();
                return true;
            }
            return false;
        }
    },
    methods: {
        setMonth(index) {
            localStorage.setItem('monthCurrent', this.months[index].abr);
        },
        setMessage(obj) {
            this.message = obj
        }
    }
}
</script>
