<template>
<table>
    <thead>
        <tr>
            <th>Nr</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Plano</th>
            <th>Pgmto</th>
            <th>Ação</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(list,index) in students" :key="index" :class="list.ativo ? 'il-active' : 'il-inactive'">
            <td>{{index+1}}</td>
            <td>
                <ul>
                    <li class="name">{{list.name}}</li>
                    <li class="nasc">Dt Nasc: {{formatDate(index)}}</li>
                    <li class="email">email: {{list.email}}</li>
                </ul>
            </td>
            <td>{{list.cpf}}</td>
            <td>
                <ul>
                    <li>Vezes: {{list.vezes}}</li>
                    <li>Valor: {{list.valor}}</li>
                </ul>
            </td>
            <td :class="checkClassPayment(list._id)">{{checkStatusPayment(list._id)}}</td>
            <td>
                <i class="mdi mdi-12px mdi-delete il-color--light-green" title="Eliminar cliente" @click="deleteStudent(list._id,index)"></i> |
                <i class="mdi mdi-12px mdi-account-edit il-color--orange" title="Editar conta" @click="editStudent(list._id)"></i> <span v-if="!getStatusPayment(list._id)">|</span>
                <i v-if="!getStatusPayment(list._id)" class="mdi mdi-12px mdi-script il-color--yellow" title="Receber pagamento do cliente com cheque" @click.prevent="makePayment(index,list._id,'check')"></i> <span v-if="!getStatusPayment(list._id)">|</span>
                <i v-if="!getStatusPayment(list._id)" class="mdi mdi-12px mdi-square-inc-cash il-color--dark" title="Receber pagamento do cliente com dinheiro" @click.prevent="makePayment(index,list._id,'money')"></i> |
                <i class="mdi mdi-12px mdi-account-location il-color--green" title="Ver o Endereço do cliente" @click.prevent="address(index)"></i>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    name: 'listStudent',
    props: {
        students: Array,
        payments: Array
    },
    methods: {
        formatDate(index) {
            let data = this.students[index].dnasc.split('T');
            let dn = data[0].split('-');
            return `${dn[2]}/${dn[1]}/${dn[0]}`;
        },
        checkClassPayment(id) {
            let check = this.payments.filter(payment => payment.studentID == id);
            console.log(check);
            if (check.length > 0) {
                if (check[0].formPayment == 'check') {
                    return 'il-background--gradient-great-whale ';
                } else {
                    return 'il-background--dark il-color--light';
                }
            } else {
                return '';
            }
        },
        checkStatusPayment(id) {
            let check = this.payments.filter(payment => payment.studentID == id);
            if (check.length > 0) {
                return `Pgmto feito - ${check[0].formPayment}`;
            } else {
                return 'Aguardando pagamento';
            }
        },
        getStatusPayment(id) {
            let check = this.payments.filter(payment => payment.studentID == id);
            if (check.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        deleteStudent(id, index) {
            this.$emit('delete', (id, index));
        },
        editStudent(id) {
            this.$router.push({
                name: 'student.edit',
                params: {
                    id: id
                }
            });
        },
        makePayment(key, id, type) {
            let student = JSON.stringify({
                name: this.students[key].name,
                valor: this.students[key].valor
            });
            window.localStorage.setItem('student', student);
            this.$router.push({
                name: 'payment',
                params: {
                    id,
                    type
                }
            });
        }
    }
};
</script>
