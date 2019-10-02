<template>
<div class="il-calendar--teachers">
    <div class="il-teachers--choices" v-for="teacher in getTeachers" :key="teacher.id">
        <img :src="getPhoto(teacher.picture)" alt="">
        <div class="il-teacher--name">
            <label :for="teacher.name.trim().toLowerCase()">{{teacher.name}}</label>
            <input type="radio" v-model="active" :id="teacher.name.trim().toLowerCase()" :value="teacher.name" @click="checkCronogram(teacher.name)">
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'teachersList',
  props: {
    teachers: Array
  },
  computed: {
    getTeachers() {
      if (this.teachers.length > 0) {
        return this.teachers;
      }
    }
  },
  data() {
    return {
      active: ''
    };
  },
  methods: {
    getPhoto(picture) {
      if (picture && picture !== 'other-avatar.svg') {
        return `data:image/jpeg;base64,/${picture}`;
      }
      return `/images/avatar/${picture}`;
    },
    checkCronogram(name) {
      this.$emit('cronogram', name);
    }
  }
};
</script>
