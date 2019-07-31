<template>
<div class="il-months">
    <div class="il-months--box" v-for="(m,index) in months" :key="m.abr">
        <span @click.prevent="choiceMonth(index)">{{m.label}}</span>
    </div>
</div>
</template>

<script>
export default {
  name: 'monthGrid',
  props: {
    months: Array
  },
  methods: {
    choiceMonth(index) {
      this.$emit('choice', index);
    }
  }
};
</script>