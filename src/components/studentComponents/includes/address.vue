<template>
<div class="il-lists no-shadow">
    <ul class="il-list--header__address">
        <li>CEP</li>
        <li>Rua/Av</li>
        <li>Bairro</li>
    </ul>
    <ul class="il-list--items__address">
        <li>{{addressCurrent.cep}}</li>
        <li>{{addressCurrent.rua_av}} nr {{addressCurrent.nr}}</li>
        <li>{{addressCurrent.suburb}}</li>
    </ul>
    <ul class="il-list--header__address">
        <li>Complemento</li>
        <li>Cidade/UF</li>
        <li>Fone/Clr</li>
    </ul>
    <ul class="il-list--items__address">
        <li>{{addressCurrent.complemento}}</li>
        <li>{{addressCurrent.city}}/{{addressCurrent.UF}}</li>
        <li>{{addressCurrent.fone}}/{{addressCurrent.clr}}</li>
    </ul>
</div>
</template>

<script>
export default {
  name: 'listAddress',
  props: {
    addressCurrent: Object
  }
};
</script>
