<template>
<div class="il-admin il-admin--content">
    <ilAlert :has="message ? true : false" :msg="message" />
    <h3>Editar conta do Administrador</h3>
    <ilAdminFormEdit @msg="setAlert" :id="getID" />
</div>
</template>

<script>
import ilAdminFormEdit from './includes/formEdit.vue'
export default {
    name: 'editAdmin',
    components: {
        ilAdminFormEdit,
        ilAlert
    },
    data() {
        return {
            adminID: null,
            message: null
        }
    },
    computed: {

        checkAlert() {
            if (this.alert.message) {

                return true;
            }
            return false;
        },
        getID() {
            if (this.adminID) {
                return this.adminID
            }
            return null
        }
    },
    mounted() {
        this.adminID = this.$route.params.id

    },
    methods: {

        setAlert(obj) {
            this.message = obj
        }
    },
}
</script>
