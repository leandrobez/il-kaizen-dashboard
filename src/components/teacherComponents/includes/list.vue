<template>
    <table>
        <thead>
            <tr>
                <th>Nr</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>CR</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="(list,index) in teachers" :key="index" :class="list.ativo ? 'il-active' : 'il-inactive'">
                <td>{{index+1}}</td>
                <td><img class="il-avatar" :src="`data:image/jpeg;base64,/${list.picture}`" ></td>
                <td>{{list.name}}</td>
                <td>{{list.cr}}</td>                
                <td>
                  <i class="mdi mdi-12px mdi-account-edit il-color--orange" title="Editar conta" @click="editTeacher(list._id)"></i>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  name: 'listTeacher',
  props: {
    teachers: Array
  },
  methods: {
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

<style scoped>
img.il-avatar {
  width: 100%;
  max-width: 100px;
  border-radius: 50%;
}
</style>
