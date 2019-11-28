<template>
<div class="il-expenses">
    <ilAlert :has="checkAlert" :msg="message" />
    <h3 class="il-color--darkblue">Controle de Despesas</h3>
    <p class="il-color--light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit, provident ab quis error quidem ducimus distinctio saepe dolorum deserunt delectus? Culpa nihil voluptatem ratione earum.</p>
    <div class="il-sub--menu" v-if="months.length>0">
        <ilMonths :months="months" @choice="choiceMonth" />
    </div>
    <div class="il-expenses--content">
        <ilMenu />
        <RouterView @alert="setAlert" />
    </div>
</div>
</template>

<script>
import ilMonths from '@/components/includes/months.vue';
import ilAlert from '@/components/includes/alerts.vue';
import ilMenu from './partials/menu.vue';
import allMonths from '../../common/months.js';
export default {
    name: 'expensesIndex',
    components: {
        ilMenu,
        ilMonths,
        ilAlert
    },
    data() {
        return {
            months: [],
            month: null,
            message: null
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
