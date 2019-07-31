<template>
<div class="il-home">

    <ilAlert :has="checkAlert" :msg="message" />

    <div class="il-home--content" v-if="checkAssigned">
        <ilBoxes />
    </div>

    <ilAcess @msg="setAlert" v-else />
</div>
</template>

<script>
// @ is an alias to /src
import ilAcess from '@/components/includes/access.vue';
import ilBoxes from '@/components/homeComponents/includes/boxes.vue';
import ilAlert from '@/components/includes/alerts.vue'
export default {
    name: 'homeIndex',
    components: {
        ilAlert,
        ilBoxes,
        ilAcess
    },
    data() {
        return {
            message: null,
            assigned: false
        }
    },
    computed: {
        checkAlert() {
            if (this.message) {
                return true;
            }
            return false;
        },
        checkAssigned() {
            if (this.assigned || window.localStorage.getItem('_token')) {
                return true
            }
            return false
        }
    },
    methods: {
        setAlert(obj) {
            if (obj.type == 'success') this.assigned = true
            this.message = obj
        }
    }
};
</script>
