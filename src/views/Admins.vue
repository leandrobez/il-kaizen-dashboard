<template>
<section class="il-section il-section--admin">
    <ilAdminList />
</section>
</template>

<script>
import ilAdminList from '@/components/adminComponents/index.vue'
export default {
    name: 'Admin',
    components: {
        ilAdminList
    }
}
</script>
