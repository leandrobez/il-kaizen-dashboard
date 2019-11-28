<template>
<nav class="il-navegation">
    <ul class="il-menu--list">
        <li>
            <router-link :to="{path: '/'}" title="Home" class="il-nav--link">
                <i class="mdi mdi-home mdi-24px"></i>
                <span @click="closePainel">Home</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{name: 'admin.list'}" title="Controle dos Admins" class="il-nav--link">
                <i class="mdi mdi-account-star mdi-24px"></i>
                <span @click="closePainel">Admins</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{name: 'students'}" title="Controle de Alunos" class="il-nav--link">
                <i class="mdi mdi-comment-account-outline mdi-24px"></i>
                <span @click="closePainel">Alunos</span>
            </router-link>
        </li>        
        <li>
            <router-link :to="{name: 'teachers'}" title="Controle de Professores" class="il-nav--link">
                <i class="mdi mdi-human-male-female mdi-24px"></i>
                <span @click="closePainel">Professores</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{name: 'expenses'}" title="Controle de Contas" class="il-nav--link">
                <i class="mdi mdi-barcode mdi-24px"></i>
                <span @click="closePainel">Contas</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{name: 'experimental'}" title="Agendamento de aulas experimentais" class="il-nav--link">
                <i class="mdi mdi-timetable mdi-24px"></i>
                <span @click="closePainel">Experimental</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{path: '/config/home'}" title="Configurar Sistema" class="il-nav--link">
                <i class="mdi mdi-settings mdi-24px"></i>
                <span @click="closePainel">Configurações</span>
            </router-link>
        </li>
    </ul>
</nav>
</template>

<script>
export default {
  name: 'painel',
  data() {
    return {};
  },

  methods: {
    closePainel() {
      this.$emit('close');
    }
  }
};
</script>
