<template>
<div class="il-dashboard--teacher">
    <ilAlert :has="checkAlert" :msg="message" />
    <h4 class="il-color--darkblue">Professores</h4>
    <p class="il-color--light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odit distinctio doloremque ratione voluptates error.</p>
    <table class="il-form--lists" v-if="teachers.length>0">
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
import accessTeacherAPI from '../../../common/apiTeacher.js';
import ilAlert from '@/components/includes/alerts.vue';
export default {
    name: 'listTeacher',
    components: {
        ilAlert
    },
    data() {
        return {
            teachers: []
        };
    },
    mounted() {
        this.setTeachers();
    },
    methods: {
        setTeachers() {
            accessTeacherAPI
                .getTeachers()
                .then(response => {
                    if (response.error === null && response.teacher.length > 0) {
                        this.teachers = response.teacher;
                    } else {
                        if (response.error) {
                            this.setAlert({
                                type: 'warning',
                                message: response.message.value
                            });
                        }
                    }
                })
                .catch(err => {
                    this.setAlert({
                        type: 'danger',
                        message: 'Você não tem permisssão para acessar essa página! ' +
                            err +
                            ' Você será redirecionado para página de login em 4 seg'
                    });
                    setTimeout(() => {
                        this.$router.push({
                            name: 'home'
                        });
                    }, 3000);
                });
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
