<template>
<nav class="il-nav il-background--dark">
    <div class="il-container--wrapper">
        <ul>
            <li>
                <router-link :to="{name: 'home'}" title="link" class="il-nav--link" :class="checkActive('home')">Home</router-link>
            </li>
            <li>
                <router-link :to="{path: '/students'}" title="link" class="il-nav--link" :class="checkActive('alunos')">Alunos</router-link>
            </li>
            <li>
                <router-link :to="{path: '/admins'}" title="link" class="il-nav--link" :class="checkActive('admins')">Contas</router-link>
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
