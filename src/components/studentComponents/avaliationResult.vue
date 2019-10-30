<template>
<div class="il-student il-student--content">
    <div class="il-student--content">
        <ilAlert :has="checkAlert" :msg="message" />
        <h3 class="il-color--darkblue">Dados antropométricos </h3>
        
    </div>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
export default {
    name: 'avaliationResultStudent',
    components: {
        ilAlert
    },
    data() {
        return {
            message: null
        };
    },
    computed: {
        checkAlert() {
            if (this.message) {
                return true;
            }
            return false;
        },
    },
    mounted() {
        
    },
    methods: {
        setAlert(obj) {
            this.message = obj;
        }
    }
};
</script>
