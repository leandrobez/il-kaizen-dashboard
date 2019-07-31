<template>
<section class="il-section il-section--payment">
    <ilPayment  />
</section>
</template>

<script>
import ilPayment from '@/components/paymentsComponents/index.vue'
export default {
    name: 'payments',
    components: {
        ilPayment
    },
}
</script>
