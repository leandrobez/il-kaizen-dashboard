<template>
<div id="app" class="il-container">
    <header>
        <h1 class="il-center il-color--medium-light">{{title}} - {{subTitle}}</h1>
        <ilNav v-if="checkRouter" />
    </header>

    <main :class="getBackground()">
        <div class="il-container--wrapper">
            <RouterView />
        </div>
    </main>

    <footer class="il-background--gradient-blue">
        <div class="il-container--wrapper">
            <h4 class="il-color--darkblue il-center">{{by}}</h4>
        </div>
    </footer>
</div>
</template>

<script>
import ilNav from '@/components/includes/navegation.vue';
export default {
    name: 'App',
    data() {
        return {
            title: 'KAIZEN',
            subTitle: 'CONTROLE FINANCEIRO',
            by: 'InternetLojas.com'
        };
    },
    components: {
        ilNav
    },
    computed: {
        checkRouter() {
            if (this.$route.name == 'home') {
                return false
            }
            return true
        }
    },
    methods: {
        getBackground() {
            let path = this.$route.name;
            let back = '';
            switch (path) {
                case 'home':
                    back = 'il-background--light';
                    break;
                case 'students.list':
                    back = 'il-background--students';
                    break;
                case 'entradas.cheques':
                    back = 'il-background--ligth-red';
                    break;
                case 'expenses.fixed':
                    back = 'il-background--light-sky';
                    break;
                case 'summary':
                    back = 'il-background--summary';
                    break;
                case 'entradas.especies':
                    back = 'il-background--orange';
                    break;
                case 'students.signup':
                    back = 'il-background--signup';
                    break;
                default:
                    back = 'il-background--light-sky'
                    break
            }
            return back;
        }
    }
};
</script>

<style lang="scss">
@import './sass/styles.scss';
</style>
