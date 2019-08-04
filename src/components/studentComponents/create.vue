<template>
<div class="il-student il-student--content">
    <ilAlert :has="checkAlert" :msg="message" />
    <h3>Novo Aluno</h3>
    <ilStudentFormCreate @msg="setAlert" />
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
import ilStudentFormCreate from './includes/formCreate.vue';
export default {
    name: 'createStudent',
    components: {
        ilAlert,
        ilStudentFormCreate
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
    methods: {

        setAlert(obj) {
            this.message = obj;
        }
    }
};
</script>
