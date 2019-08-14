<template>
<div class="il-student">
    <div class="il-student--content">
        <ilAlert :has="message ? true : false" :msg="message" />
        <h3>Controle de Alunos</h3>
        <a href="#!" class="il-btn il-print il-btn--center" @click.prevent="printDoc">Imprimir</a>
        <a href="#!" class="il-btn il-btn--submit il-btn--center" @click.prevent="populate">
            <i class="mdi mdi-12px mdi-account-multiple il-color--orange" title="Popular o banco de dados" ></i>Popular Banco</a>
        <div id="listStudent">
            <table>
                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Plano</th>
                        <!--<th>Situação</th>-->
                        <th>Pgmto</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody v-if="hasStudents">
                    <tr v-for="(list,index) in students" :key="index" :class="list.ativo ? 'il-active' : 'il-inactive'">
                        <td>{{index+1}}</td>
                        <td>
                            <ul>
                                <li>{{list.name}}</li>
                                <li>email: {{list.email}}</li>
                            </ul>
                        </td>
                        <td>{{list.cpf}}</td>
                        <td>
                            <ul>
                                <li>Vezes: {{list.vezes}}</li>
                                <li>Valor: {{list.valor}}</li>
                            </ul>
                        </td>

                        <!--<td>{{list.ativo ? 'Ativo' : 'Inativo'}}</td>-->
                        <td :class="paymentStatus[index].class" v-if="paymentStatus.length > 0"><span><i class="mdi mdi-24px" :class="paymentStatus[index].icons" :title="paymentStatus[index].type"></i></span></td>
                        <td v-else>sem pagamento</td>
                        <td>
                            <i class="mdi mdi-12px mdi-delete il-color--red" title="Eliminar cliente" @click="deleteStudent(list._id)"></i> |
                            <i class="mdi mdi-12px mdi-account-edit il-color--orange" title="Editar conta" @click="editStudent(list._id)"></i> |
                            <i class="mdi mdi-12px mdi-script il-color--yellow" title="Receber pagamento do cliente com cheque" @click.prevent="makePayment(index,list._id,'check')"></i> |
                            <i class="mdi mdi-12px mdi-square-inc-cash il-color--dark" title="Receber pagamento do cliente com dinheiro" @click.prevent="makePayment(index,list._id,'money')"></i> |
                            <i class="mdi mdi-12px mdi-account-location il-color--green" title="Ver o Endereço do cliente" @click.prevent="address(index)"></i>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="7">
                            <span>Não existem alunos cadastrado até o presente momento!</span>
                        </td>
                        <td><i class="mdi mdi-12px mdi-account-multiple il-color--orange" title="Popular o banco de dados" @click.prevent="populate()"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <button class="il-btn il-btn--entrance" @click="createStudent">Novo Aluno</button>
    <!--<button class="il-btn il-btn--entrance" @click="populate">Complementar Carregamento de Alunos</button>-->
    <div class="il-student--address" v-if="hasAddress">
        <a href="#!" class="il-close il-close--address" @click.prevent="close"><i class="mdi mdi-close medi-12px"></i></a>
        <table>
            <thead>
                <tr>
                    <th>CEP</th>
                    <th>Rua/Av</th>
                    <th>Bairro</th>
                    <th>Complemento</th>
                    <th>Cidade/UF</th>
                    <th>Fone/Clr</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{addressCurrent.cep}}</td>
                    <td>{{addressCurrent.rua_av}} nr {{addressCurrent.nr}}</td>
                    <td>{{addressCurrent.suburb}}</td>
                    <td>{{addressCurrent.complemento}}</td>
                    <td>{{addressCurrent.city}}/{{addressCurrent.UF}}</td>
                    <td>{{addressCurrent.fone}}/{{addressCurrent.clr}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import accessStudentAPI from '../../common/apiStudent.js';
import accessPaymentAPI from '../../common/apiPayment.js';
import ilAlert from '@/components/includes/alerts.vue';

const populate = require('../../db/seed');
import {
    mapGetters
} from 'vuex';
export default {
    name: 'indexStudent',
    components: {
        ilAlert
    },
    data() {
        return {
            months: [{
                    abr: 'Jan',
                    label: 'Janeiro'
                },
                {
                    abr: 'Fev',
                    label: 'Feveiro'
                },
                {
                    abr: 'Mar',
                    label: 'Março'
                },
                {
                    abr: 'Abr',
                    label: 'Abril'
                },
                {
                    abr: 'Mai',
                    label: 'Maio'
                },
                {
                    abr: 'Jun',
                    label: 'Junho'
                },
                {
                    abr: 'Jul',
                    label: 'Julho'
                },
                {
                    abr: 'Ago',
                    label: 'Agosto'
                },
                {
                    abr: 'Set',
                    label: 'Setembro'
                },
                {
                    abr: 'Out',
                    label: 'Outubro'
                },
                {
                    abr: 'Nov',
                    label: 'Novembro'
                },
                {
                    abr: 'Dez',
                    label: 'Dezembro'
                }
            ],
            monthCurrent: null,
            students: [],
            addressCurrent: null,
            paymentStudents: [],
            paymentStatus: [],
            message: null,
            showAddress: false
        };
    },
    computed: {
        ...mapGetters('admin', {
            getToken: 'getToken'
        }),
        hasStudents() {
            if (this.students.length > 0) {
                this.getPayment();
                return true;
            }
            return false;
        },
        checkAlert() {
            if (this.alert.message) {
                this.clearAlert();
                return true;
            }
            return false;
        },
        hasAddress() {
            if (this.showAddress) {
                return true;
            }
            return false;
        }
    },
    mounted() {
        this.setToday()
        this.setStudents();
    },
    methods: {
        printDoc() {
            window.print()
        },
        setToday() {
            let today = new Date()
            let month = today.getMonth()
            this.monthCurrent = this.months[month].abr
        },
        populate() {
            let confirm = window.confirm(
                'Realmente deseja realizar esse procedimento agora?'
            );
            if (!confirm) return;
            let newStudent = populate.populateStudent();
            //!Call API to make seed
            if (!newStudent.error) {
                let data = newStudent.data;
                let vm = this;
                data.forEach(s => {
                    accessStudentAPI
                        .create(s)
                        .then(res => {
                            if (res.data.error == '') {
                                vm.setAlert({
                                    type: 'success',
                                    message: 'Cliente cadastrado com sucesso!'
                                });
                            } else {
                                const value = res.data.error;
                                vm.setAlert({
                                    type: 'warning',
                                    message: value
                                });
                            }
                        })
                        .catch(err => {
                            vm.setAlert({
                                type: 'warning',
                                message: err
                            });
                        });
                });
            } else {
                this.setAlert({
                    type: newStudent.message.status,
                    message: newStudent.message.value
                });
            }
        },
        getPayment() {
            if (this.students.length == 0) return;
            let monthCurrent = this.monthCurrent
            if (monthCurrent) {
                accessPaymentAPI
                    .searchPaymentMonth(monthCurrent)
                    .then(response => {
                        console.log(response)
                        if (response.data.error == null && response.data.payment.length > 0) {
                            this.paymentStudents = response.data.payment[0].students;
                            this.statusPayment();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        setAlert(obj) {
            this.message = obj;
        },
        setStudents() {
            accessStudentAPI
                .getStudents()
                .then(response => {

                    if (response.error == null && response.student.length > 0) {
                        this.students = response.student;
                        this.students.forEach((student, index) => {
                            student.valor = this.getDesc(index);
                        });
                    } else {
                        if (response.error) {
                            this.setAlert({
                                type: 'warning',
                                message: response.error
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
        getDesc(id) {
            let valor = this.students[id].valor;
            let perc = this.students[id].desc.perc;
            if (perc != 0) {
                return valor - valor * perc / 100;
            }
            let abs = this.students[id].desc.abs;
            if (abs != 0) {
                return valor - abs;
            }
            return valor;
        },
        statusPayment() {
            this.students.forEach((item, index) => {
                let check = this.paymentStudents.filter(
                    student => student.studentName == item.name
                );
                if (check.length > 0) {
                    console.log(check);
                    if (check[0].formPayment == 'check') {
                        this.paymentStatus.push({
                            id: index,
                            type: 'check',
                            icons: 'mdi-script',
                            status: 'ok',
                            class: 'il-color--green'
                        });
                    } else if (check.formPayment == 'Dinheiro') {
                        this.paymentStatus.push({
                            id: index,
                            type: 'dinheiro',
                            icons: 'mdi-cash',
                            status: 'ok',
                            class: 'il-color--dark'
                        });
                    }
                } else {
                    this.paymentStatus.push({
                        id: index,
                        type: 'aguardando',
                        icons: 'mdi-alert',
                        status: 'no',
                        class: 'il-color--red'
                    });
                }
            });
        },
        createStudent() {
            this.$router.push({
                path: 'students/create'
            });
        },
        editStudent(id) {
            this.$router.push({
                name: 'student.edit',
                params: {
                    id: id
                }
            });
        },
        deleteStudent(id) {
            let confirm = window.confirm('Realmente deseja eleiminar esse aluno?');
            if (confirm) {
                accessStudentAPI
                    .removeStudent(id)
                    .then(response => {
                        this.students = response;
                        this.setAlert({
                            type: 'success',
                            message: 'Aluno removido com sucesso da base de dados.'
                        });
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
                        }, 4000);
                    });
            }
        },
        makePayment(key, id, type) {
            let student = JSON.stringify({
                name: this.students[key].name,
                valor: this.students[key].valor
            })
            console.log(student)
            window.localStorage.setItem(
                'student', student
            );
            this.$router.push({
                name: 'payment',
                params: {
                    id,
                    type
                }
            });
        },
        address(key) {
            this.addressCurrent = this.students[key].address;
            this.showAddress = true;
        },
        close() {
            this.addressCurrent = null;
            this.showAddress = false;
        }
    }
};
</script>

<style scoped>
a.il-print {
    display: block;
    width: 40%;
    margin: 0 auto;
    text-align: center;
    padding: 10px;
    border-radius: 3px;
    text-transform: uppercase;
    color: indigo;
    background: lightskyblue;
    border: 1px solid rgb(89, 89, 207);
}

a:hover {
    background: lightgrey;
}
</style>
