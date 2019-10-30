<template>
<div class="il-config">
    <ilAlert :has="checkAlert" :msg="message" />
    <div class="il-config--content" v-if="checkAssigned">
        <h3 class="il-color--light">Área de Administração</h3>
        <div class="il-config--wrapper">
            <div class="il-config--aside">
                <ul class="il-menu il-color--light">
                    <li class="il-submenu">
                        <span>Cadastros</span>
                        <ul>
                            <li>
                                <router-link :to="{name: 'config.student'}">Alunos</router-link>
                            </li>
                            <li>
                                <router-link :to="{name: 'config.admims'}">Admins</router-link>
                            </li>
                            <li>Matrículas</li>
                            <li>Avaliações</li>
                            <li>
                                <router-link :to="{name: 'config.teacher'}">Professores</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="il-submenu">
                        <span>Financeiro</span>
                        <ul>
                            <li>Mensalidades</li>
                            <li>Contas</li>
                            <li>
                                <router-link :to="{name: 'config.comission'}">Comissões</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="il-submenu">
                        <span>Agendamentos</span>
                        <ul>
                            <li>
                                <router-link :to="{name: 'config.schedule'}">do professor</router-link>
                            </li>
                            <li>
                                <router-link :to="{name: 'config.experimental'}">aulas experimentais</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="il-submenu">
                        <span>Configurações</span>
                        <ul>
                            <li>
                                <router-link :to="{name: 'config.kaizen'}">kaizen</router-link>
                            </li>
                            <li>Personalizações</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="il-config--main">
                <RouterView />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
export default {
    name: 'configIndex',
    components: {
        ilAlert
    },
    data() {
        return {
            message: null,
            assigned: false
        };
    },
    computed: {
        checkAssigned() {
            if (this.assigned || window.localStorage.getItem('_token')) {
                return true;
            }
            return false;
        },
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
