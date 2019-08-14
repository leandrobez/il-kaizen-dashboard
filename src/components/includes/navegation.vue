<template>
<nav class="il-nav il-background--dark">
    <div class="il-container--wrapper">
        <ul>
            <li>
                <router-link :to="{name: 'home'}" title="link" class="il-nav--link" :class="checkActive('home')"><i class="mdi mdi-home mdi-24px"></i><span>Home</span></router-link>
            </li>
            <li>
                <router-link :to="{path: '/admins'}" title="link" class="il-nav--link" :class="checkActive('admins')"><i class="mdi mdi-account-box-outline mdi-24px"></i><span>Admins</span></router-link>
            </li>
            <li>
                <router-link :to="{path: '/students'}" title="link" class="il-nav--link" :class="checkActive('alunos')"><i class="mdi mdi-account-multiple mdi-24px"></i><span>Alunos</span></router-link>
            </li>
            <li>
                <router-link :to="{path: '/contas'}" title="link" class="il-nav--link" :class="checkActive('contas')"><i class="mdi mdi-coin mdi-24px"></i><span>Contas</span></router-link>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
export default {
    name: 'navegation',
    methods: {
        checkActive(link) {
            let path = this.$route.name
            if (link == path) {
                return 'il-active'
            }
            return ''
        }
    }
};
</script>
