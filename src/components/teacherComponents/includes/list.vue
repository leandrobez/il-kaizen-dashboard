<template>
<div class="il-lists">
    <table class="il-form--lists">
        <tbody>
            <tr>
                <td>Nr</td>
                <td>Foto</td>
                <td>Nome</td>
                <td>Ações</td>
            </tr>
            <tr v-for="(list,index) in teachers" :key="index" :class="list.ativo ? '' : 'il-inactive'">
                <td>{{index+1}}</td>
                <td class="il-lists--avatar"><img class="il-avatar--teacher" :src="`data:image/jpeg;base64,/${list.picture}`"></td>
                <td>
                    <ul class="il-list--info">
                        <li class="name">{{list.name}}</li>
                        <li>CT: {{list.cr}}</li>
                    </ul>
                </td>
                <td>
                    <ul class="il-list--actions">
                        <li>
                            <router-link :to="{name: 'teacher.activities', params: {id: list._id}}">
                                <i class="mdi mdi-12px mdi-clock " title="Atividades desse professor"></i>
                            </router-link>
                        </li>
                        <li>
                            <i class="mdi mdi-12px mdi-delete" title="Eliminar esse Professor" @click="deleteTeacher(list._id,index)"></i>
                        </li>
                        <li>
                            <i class="mdi mdi-12px mdi-account-edit" title="Editar conta do professor" @click="editTeacher(list._id)"></i>
                        </li>
                        <li>
                            <i class="mdi mdi-12px mdi-account-location" title="Ver o Endereço do professor" @click.prevent="address(index)"></i>
                        </li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
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
