<template>
<div class="il-expenses">
    <ilMonths :months="months" @choice="choiceMonth" />
    <ilAlert :has="checkAlert" :msg="message" />
    <div class="il-expenses--content">
        <h3>Controle de Despesas</h3>
        <ul class="il-box--expenses">
            <li class="il-background--gradient--grey-sky">
                <router-link :to="{name: 'contas.fixed'}" title="Contas fixas" class="il-nav--link il-color--darkblue">
                    <i class="mdi mdi-account-star mdi-36px"></i>
                    <h5>Fixas</h5>
                </router-link>
            </li>
            <li class="il-background--gradient--grey-sky">
                <router-link :to="{name: 'contas.variables'}" title="Conas variaveis" class="il-nav--link il-color--darkblue">
                    <i class="mdi mdi-clipboard-account mdi-36px"></i>
                    <h5>Variáveis</h5>
                </router-link>
            </li>
            <li class="il-background--gradient--grey-sky">
                <router-link :to="{name: 'contas.extras'}" title="Contas extras" class="il-nav--link il-color--darkblue">
                    <i class="mdi mdi-clipboard-account mdi-36px"></i>
                    <h5>Extras</h5>
                </router-link>
            </li>
            <li class="il-background--gradient--grey-sky">
                <router-link :to="{name: 'contas.show'}" title="Listar Contas" class="il-nav--link il-color--darkblue">
                    <i class="mdi mdi-clipboard-account mdi-36px"></i>
                    <h5>Listar</h5>
                </router-link>
            </li>
        </ul>

        <RouterView @alert="setAlert" />
    </div>
</div>
</template>

<script>
import ilMonths from '@/components/includes/months.vue'
import ilAlert from '@/components/includes/alerts.vue'
export default {
    name: 'expensesIndex',
    components: {
        ilMonths,
        ilAlert
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
            month: null,
            message: null
        }
    },
    computed: {
        checkAlert() {
            if (this.message) {
                return true;
            }
            return false;
        }
    },
    methods: {
        choiceMonth(key) {
            this.month = this.months[key].abr
        },
        setAlert(obj) {
            console.log(obj)
            this.message = {
                type: obj.status,
                message: obj.value
            }
        }
    }
}
</script>
