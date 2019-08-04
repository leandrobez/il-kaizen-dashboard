<template>
<div class="il-student il-student--content">
    <ilAlert :has="checkAlert" :msg="message" />
    <h3>Editar conta do aluno</h3>
    <ilStudentFormEdit @msg="setAlert" :id="getID" v-if="studentID" />
</div>
</template>

<script>
import ilStudentFormEdit from './includes/formEdit.vue'
import ilAlert from '@/components/includes/alerts.vue'
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
        }
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
                return this.studentID
            }
            return null
        }
    },
    mounted() {
        this.studentID = this.$route.params.id
    },
    methods: {
        setAlert(obj) {
            this.message = obj
        }
    }
}
</script>
