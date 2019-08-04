<template>
<section class="il-section il-section--home">
    <ilExpenses />
</section>
</template>

<script>
import ilExpenses from '@/components/expensesComponents'
export default {
    name: 'Expenses',
    components: {
        ilExpenses
    }
}
</script>
