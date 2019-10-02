<template>
<div class="il-student il-student--content">
    <div class="il-student--content">
        <ilAlert :has="checkAlert" :msg="message" />
        <h3 class="il-color--darkblue">Editar conta </h3>
        <ilStudentFormEdit @msg="setAlert" :id="getID" v-if="studentID" />
    </div>
</div>
</template>

<script>
import ilStudentFormEdit from './includes/formEdit.vue';
import ilAlert from '@/components/includes/alerts.vue';
export default {
    name: 'editStudent',
    components: {
        ilStudentFormEdit,
        ilAlert
    },
    data() {
        return {
            studentID: null,
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
        }
    }
};
</script>
