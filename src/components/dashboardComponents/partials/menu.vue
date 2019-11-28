<template>
<div class="il-config--aside">
    <ul class="il-menu il-color--light">
        <li class="il-submenu">
            <span>Cadastros</span>
            <ul>
                <li>
                    <router-link :to="{name: 'dashboard.student'}">Alunos</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'dashboard.admims'}">Admins</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'dashboard.register'}">Matrículas</router-link>
                </li>
                <li>Avaliações</li>
                <li>
                    <router-link :to="{name: 'dashboard.teacher'}">Professores</router-link>
                </li>
            </ul>
        </li>
        <li class="il-submenu">
            <span>Financeiro</span>
            <ul>
                <li>Mensalidades</li>
                <li>
                    <router-link :to="{name: 'dashboard.budgets'}">Despesas</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'dashboard.comission'}">Comissões</router-link>
                </li>
            </ul>
        </li>
        <li class="il-submenu">
            <span>Agendamentos</span>
            <ul>
                <li>
                    <router-link :to="{name: 'dashboard.schedule'}">do professor</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'dashboard.experimental'}">aulas experimentais</router-link>
                </li>
            </ul>
        </li>
        <li class="il-submenu">
            <span>Configurações</span>
            <ul>
                <li>
                    <router-link :to="{name: 'dashboard.kaizen'}">kaizen</router-link>
                </li>
                <li>Personalizações</li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script>
export default {
  name: 'dashboardMenu'
};
</script>

