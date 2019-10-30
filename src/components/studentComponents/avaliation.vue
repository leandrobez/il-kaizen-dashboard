<template>
<div class="il-student il-student--content">
    <div class="il-student--content">
        <ilAlert :has="checkAlert" :msg="message" />
        <h3 class="il-color--darkblue">Nova avaliação </h3>
        <ilStudentParams @msg="setAlert" @next="calculate" :id="getID" v-if="showParams" />
        <ilAnthropometric v-if="showAnthropometric" />
    </div>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
import ilStudentParams from './includes/avaliation/params.vue';
import ilAnthropometric from './includes/avaliation/anthropometric.vue';
export default {
    name: 'avaliationStudent',
    components: {
        ilStudentParams,
        ilAnthropometric,
        ilAlert
    },
    data() {
        return {
            studentID: null,
            message: null,
            showParams: true,
            showAnthropometric: false
        };
    },
    computed: {
        checkAlert() {
            if (this.message) {
                return true;
            }
            return false;
        },
        getID() {
            if (this.studentID) {
                return this.$route.params.id;
            }
            return null;
        }
    },
    mounted() {
        this.studentID = this.$route.params.id;
    },
    methods: {
        setAlert(obj) {
            this.message = obj;
        },
        calculate() {
            this.showAnthropometric = true;
            this.showParams = false;
        }
    }
};
</script>
