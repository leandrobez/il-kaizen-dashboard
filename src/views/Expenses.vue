<template>
<section class="il-section il-section--expenses">
    <ilExpenses />
</section>
</template>

<script>
import ilExpenses from '@/components/expensesComponents';
export default {
  name: 'Expenses',
  components: {
    ilExpenses
  }
};
</script>
