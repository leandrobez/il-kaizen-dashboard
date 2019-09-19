<template>
    <table>
        <thead>
            <tr>
                <th>Nr</th>
                <th>Nome</th>
                <th>Formação</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="(list,index) in teachers" :key="index" :class="list.ativo ? 'il-active' : 'il-inactive'">
                <td>{{index+1}}</td>
                <td>{{list.name}}</td>
                <td>Formação</td>
                <td>o que fazer</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  name: 'listTeacher',
  props: {
    teachers: Array
  }
};
</script>
