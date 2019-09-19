<template>
<div class="il-admin il-admin--content">
    <ilAlert :has="checkAlert" :msg="message" />
    <h3 class="il-color--darkblue">Novo Administrador</h3>
    <ilAdminFormCreate @msg="setAlert" />
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex';
import ilAlert from '@/components/includes/alerts.vue';
import ilAdminFormCreate from './includes/formCreate.vue';
export default {
    name: 'createAdmin',
    components: {
        ilAlert,
        ilAdminFormCreate
    },
    data() {
        return {
            message: null
        };
    },
    computed: {
        ...mapState({
            alert: state => state.alert
        }),
        checkAlert() {
            if (this.message) {
                return true;
            }
            return false;
        },
    },
    methods: {
        ...mapActions('alert', {
            success: 'success',
            warning: 'warning',
            danger: 'danger',
            clearAlert: 'clear'
        }),
        setAlert(obj) {
            this.message = obj;
        }
    }
};
</script>
