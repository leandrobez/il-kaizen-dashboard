<template>
<ul class="il-box--expenses">
    <li>
        <router-link :to="{name: 'contas.fixed'}" title="Contas fixas" class="il-nav--link">
            <i class="mdi mdi-account-star mdi-36px"></i>
            <h5>Fixas</h5>
        </router-link>
    </li>
    <li>
        <router-link :to="{name: 'contas.variables'}" title="Conas variaveis" class="il-nav--link">
            <i class="mdi mdi-clipboard-account mdi-36px"></i>
            <h5>Variáveis</h5>
        </router-link>
    </li>
    <li>
        <router-link :to="{name: 'contas.extras'}" title="Contas extras" class="il-nav--link">
            <i class="mdi mdi-clipboard-account mdi-36px"></i>
            <h5>Extras</h5>
        </router-link>
    </li>
    <li>
        <router-link :to="{name: 'contas.show'}" title="Listar Contas" class="il-nav--link">
            <i class="mdi mdi-clipboard-account mdi-36px"></i>
            <h5>Listar</h5>
        </router-link>
    </li>
</ul>
</template>

<script>
export default {
  name: 'expenseMenu'
};
</script>
