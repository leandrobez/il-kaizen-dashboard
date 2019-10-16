<template>
<section class="il-section il-section--teacher">
    <ilActivities :cronogram="cronogram" v-if="cronogram.length>0" />
</section>
</template>

<script>
import accessCronogramAPI from '../common/apiCronogram.js';
import ilActivities from '@/components/teacherComponents/activitiesList.vue';
export default {
  name: 'activities',
  data() {
    return {
      teacherId: null,
      teacher: null,
      cronogram: [],
      contents: [],
      schedule: []
    };
  },
  components: {
    ilActivities
  },
  mounted() {
    this.teacherId = this.$route.params.id;

    this.getCronogram();
  },
  methods: {
    getCronogram() {
      let id = this.teacherId;
      let cronogramTeacher = JSON.parse(
        localStorage.getItem('cronogramTeacher')
      );
      let find = cronogramTeacher.find(el => {
        return el.id == id;
      });
      
      this.teacher = find.name;
      accessCronogramAPI.getCronogram().then(response => {
        //console.log(response);
        if (response.error == null) {
          let cronogram = response.cronogram.filter(element => {
            return element.teacher == this.teacher;
          });
          this.cronogram = cronogram;          
        }
      });
    }
  }
};
</script>
