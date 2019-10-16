<template>
<div class="il-lists il-list--students">
    <ul class="il-list--header">
        <li>Nr</li>
        <li>Foto</li>
        <li>Nome</li>
        <li>Ações</li>
    </ul>
    <ul class="il-list--items" v-for="(list,index) in teachers" :key="index" :class="list.ativo ? '' : 'il-inactive'">
        <li>{{index+1}}</li>
        <li class="il-avatar">
            <img class="il-avatar--teacher" :src="`data:image/jpeg;base64,/${list.picture}`">
        </li>
        <li>
            <ul class="il-list--info">
                <li>Nome: {{list.name}}</li>
                <li>CT: {{list.cr}}</li>
            </ul>
        </li>
        <li>
            <ul class="il-list--actions">
                <li>
                    <router-link :to="{name: 'teacher.activities', params: {id: list._id}}">
                        <i class="mdi mdi-24px mdi-clock il-color--dark" title="Atividades desse professor"></i>
                    </router-link>
                </li>
                <li>
                    <i class="mdi mdi-24px mdi-delete il-color--dark" title="Eliminar esse Professor" @click="deleteTeacher(list._id,index)"></i>
                </li>
                <li>
                    <i class="mdi mdi-24px mdi-account-edit il-color--dark" title="Editar conta do professor" @click="editTeacher(list._id)"></i>
                </li>
                <li>
                    <i class="mdi mdi-24px mdi-account-location il-color--dark" title="Ver o Endereço do professor" @click.prevent="address(index)"></i>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script>
export default {
  name: 'listTeacher',
  props: {
    teachers: Array
  },
  mounted() {
    this.setTeachers();
  },
  methods: {
    setTeachers() {
      let cronogramTeacher = [];
      this.teachers.forEach(element => {
        cronogramTeacher.push({
          id: element._id,
          name: element.name
        });
      });
      localStorage.setItem(
        'cronogramTeacher',
        JSON.stringify(cronogramTeacher)
      );
    },
    deleteTeacher(id, index) {
      this.$emit('delete', (id, index));
    },
    editTeacher(id) {
      this.$router.push({
        name: 'teacher.edit',
        params: {
          id: id
        }
      });
    }
  }
};
</script>
