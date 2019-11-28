<template>
<section class="il-section il-section--evaliation">
    <ilEvaliation :studentId="studentID" />
</section>
</template>

<script>
import ilEvaliation from '@/components/evaliationComponents/index.vue';
export default {
  name: 'evaliation',
  components: {
    ilEvaliation
  },
  data() {
    return {
      studentID: null
    };
  },
  mounted() {
    this.studentID = this.$route.params.id;
  }
};
</script>
