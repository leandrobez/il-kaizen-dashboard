<template>
<nav class="il-navegation">
    <div class="il-container--wrapper">
        <ul class="il-nav--slice">
            <li>
                <router-link :to="{path: '/admins'}" title="Controle dos Admins" class="il-nav--link" :class="checkActive('home')">
                    <i class="mdi mdi-account-star mdi-12px"></i>
                    <span>Admins</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{path: '/students'}" title="Controle de Alunos" class="il-nav--link" :class="checkActive('home')">
                    <i class="mdi mdi-clipboard-account mdi-12px"></i>
                    <span>Alunos</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{path: '/contas'}" title="Controle de Contas" class="il-nav--link" :class="checkActive('home')">
                    <i class="mdi mdi-clipboard-account mdi-12px"></i>
                    <span>Contas</span>
                </router-link>
            </li>
            <li>
                <a href="#!" title="Encerrar a aplicação" class="il-nav--link" @click.prevent="logout">
                    <i class="mdi mdi-logout mdi-12px"></i>
                    <span>Logout</span>
                </a></li>
        </ul>
    </div>
</nav>
</template>

<script>
import accessAdminAPI from '../../common/apiAdmin.js';
export default {
    name: 'navegation',
    data() {
        return {
            admin: ''
        };
    },
    mounted() {
        this.admin = window.localStorage.getItem('admin') || '';
    },
    methods: {
        checkActive(link) {
            let path = this.$route.name;
            if (link == path) {
                return 'il-active';
            }
            return '';
        },
        logout() {
            accessAdminAPI.logout().then(res => {
                //destroy token localStorage
                window.localStorage.removeItem('_token');
                window.localStorage.removeItem('admin');
                location.reload();
            });
        }
    }
};
</script>
