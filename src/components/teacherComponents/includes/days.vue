<template>
<div class="il-week--day">
    <span v-for="d in days" :key="d.abr">{{d.default}}</span>
</div>
</template>

<script>
export default {
  name: 'days',
  data() {
    return {
      days: [
        {
          abr: 'seg',
          default: 'Seg',
          full: 'Segunda'
        },
        {
          abr: 'ter',
          default: 'Ter',
          full: 'Terça'
        },
        {
          abr: 'qua',
          default: 'Qua',
          full: 'Quarta'
        },
        {
          abr: 'qui',
          default: 'Quin',
          full: 'Quinta'
        },
        {
          abr: 'sex',
          default: 'Sex',
          full: 'Sexta'
        },
        {
          abr: 'sab',
          default: 'Sab',
          full: 'Sábado'
        },
        {
          abr: 'dom',
          default: 'Dom',
          full: 'Domingo'
        }
      ]
    };
  }
};
</script>

<style>
</style>
