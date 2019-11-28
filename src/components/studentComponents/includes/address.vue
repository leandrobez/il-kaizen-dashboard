<template>
<div class="il-lists no-shadow">
    <table class="il-form--lists">
        <tbody>
            <tr>
                <td>Aluno</td>
                <td>Logradouro</td>
                <td>Detalhes</td>
            </tr>
            <tr>
                <td>
                    <ul class="il-list--items__address">
                        <li>{{addressCurrent.name}}</li>
                        <li>{{addressCurrent.email}} </li>
                        <li> {{addressCurrent.dnasc}}</li>
                    </ul>
                </td>
                <td>
                    <ul class="il-list--items__address">
                        <li>{{addressCurrent.cep}}</li>
                        <li>{{addressCurrent.rua_av}} nr {{addressCurrent.nr}}</li>
                        <li>{{addressCurrent.suburb}}</li>
                    </ul>
                </td>
                <td>
                    <ul class="il-list--items__address">
                        <li>{{addressCurrent.complemento}}</li>
                        <li>{{addressCurrent.city}}/{{addressCurrent.UF}}</li>
                        <li>{{addressCurrent.fone}}/{{addressCurrent.clr}}</li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
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
