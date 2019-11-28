<template>
<div class="il-admin">
    <div class="il-admin--content">
        <ilAlert :has="checkAlert" :msg="message" />
        <h3 class="il-color--light">Controle de Administradores</h3>
        <p class="il-color--light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio deleniti incidunt, alias dolorem quidem animi atque neque dolorum, repellat eum eaque eveniet, excepturi debitis nisi.</p>
        <div class="il-sub--menu">
            <router-link :to="{name:'admin.create'}" class="il-btn il-btn--submit" title="Novo Admin">
                <i class="mdi mdi-24px mdi-account-multiple"></i><span>Novo</span>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
export default {
    name: 'AdminIndex',
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
        }
    },
    methods: {
        setAlert(obj) {
            this.message = obj;
        }
    }
};
</script>
