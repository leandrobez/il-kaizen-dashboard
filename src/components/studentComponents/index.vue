<template>
<div class="il-student">
    <div class="il-student--content">
        <ilAlert :has="message ? true : false" :msg="message" />
        <h3 class="il-color--darkblue">Controle de Alunos</h3>
        <p class="il-color--light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit, provident ab quis error quidem ducimus distinctio saepe dolorum deserunt delectus? Culpa nihil voluptatem ratione earum.</p>
        <div class="il-sub--menu">
            <router-link :to="{name:'student.create'}" class="il-btn il-btn--submit" title="Novo Aluno">
                <i class="mdi mdi-24px mdi-account"></i><span>Novo</span>
            </router-link>
            <a href="#!" class="il-btn il-btn--submit" @click.prevent="printDoc" v-if="showBtnImp"><i class="mdi mdi-24px mdi-printer il-color--darkblue" title="Imprimir lista"></i>Imprimir</a>
            <a href="#!" class="il-btn il-btn--submit" @click.prevent="populate" v-if="showBtnPop"><i class="mdi mdi-24px mdi-cloud-upload il-color--darkblue" title="Popular o banco de dados"></i>Popular Banco</a>
            <a href="#!" class="il-btn il-btn--submit" @click.prevent="remove"><i class="mdi mdi-24px mdi-cloud-upload il-color--darkblue" title="Eliminar todos os alunos"></i><span>Remover</span></a>
        </div>
        <ilListStudent :students="students" :payments="paymentStudents" @delete="deleteStudent" @setAddress="setAddressCurrent" v-if="hasStudents" />
        <div class="il-student--address" v-if="hasAddress">
            <a href="#!" class="il-close il-close--address" @click.prevent="close"><i class="mdi mdi-close medi-12px"></i></a>
            <ilAddress :addressCurrent="addressCurrent" />
        </div>
    </div>
</div>
</template>

<script>
import months from '../../common/months.js';
import accessStudentAPI from '../../common/apiStudent.js';
import accessPaymentAPI from '../../common/apiPayment.js';
import ilListStudent from './includes/list';
import ilAlert from '@/components/includes/alerts.vue';
import ilAddress from './includes/address.vue';
const populateDB = require('../../db/seed');
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'indexStudent',
  components: {
    ilListStudent,
    ilAddress,
    ilAlert
  },
  data() {
    return {
      monthCurrent: null,
      students: [],
      addressCurrent: null,
      paymentStudents: [],
      message: null,
      showAddress: false
    };
  },
  computed: {
    ...mapGetters('admin', {
      getToken: 'getToken'
    }),
    showBtnPop() {
      if (this.students.length == 0) {
        return true;
      }
      return false;
    },
    showBtnImp() {
      if (this.students.length > 0) {
        return true;
      }
      return false;
    },
    hasStudents() {
      if (this.students.length > 0) {
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
    this.setToday();
    this.getPayment();
    this.setStudents();
  },
  methods: {
    ...mapActions('payment', {
      setPayments: 'setPayments'
    }),
    printDoc() {
      window.print();
    },
    setToday() {
      let today = new Date();
      let month = today.getMonth();
      this.monthCurrent = months[month].abr;
    },
    setStudents() {
      accessStudentAPI
        .getStudents()
        .then(response => {
          if (response.error === null && response.student.length > 0) {
            this.students = response.student;
            this.students.forEach((student, index) => {
              student.valor = this.getDesc(index);
            });
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
            message:
              'Você não tem permisssão para acessar essa página! ' +
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
    populate() {
      let confirm = window.confirm(
        'Realmente deseja realizar esse procedimento agora?'
      );
      if (!confirm) return;
      let newStudent = populateDB.populateStudent();
      //!Call API to make seed
      if (!newStudent.error) {
        let data = newStudent.data;
        let vm = this;
        //accessStudentAPI.createMultiple(data)
        data.forEach(s => {
          accessStudentAPI
            .createMultiple(s)
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
    remove() {
      let confirm = window.confirm(
        'Realmente deseja realizar esse procedimento agora?'
      );
      if (!confirm) return;
      let remove = [];
      this.students.forEach(student => {
        let ID = student._id;
        accessStudentAPI
          .removeStudent(ID)
          .then(res => {
            remove.push({
              ID: res
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
      console.log(remove);
    },
    getPayment() {
      accessPaymentAPI
        .searchPaymentMonth(this.monthCurrent)
        .then(response => {
          if (response.data.error == null && response.data.payment.length > 0) {
            this.paymentStudents = response.data.payment[0].students;
            this.setPayments(this.paymentStudents);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    setAlert(obj) {
      this.message = obj;
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
    createStudent() {
      this.$router.push({
        path: 'students/create'
      });
    },
    deleteStudent(id, index) {
      let confirm = window.confirm(
        'Realmente deseja eliminar ' + this.students[index].name + ' ?'
      );
      if (confirm) {
        accessStudentAPI
          .removeStudent(id)
          .then(response => {
            if (!response.error) {
              this.students.splice(index);
              this.setAlert({
                type: response.message.type,
                message: response.message.value
              });
            }
          })
          .catch(err => {
            this.setAlert({
              type: 'danger',
              message:
                'Você não tem permisssão para acessar essa página! ' +
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

    setAddressCurrent(key) {
      const formatDate = () => {
        let data = this.students[key].dnasc.split('T');
        let dn = data[0].split('-');
        return `${dn[2]}/${dn[1]}/${dn[0]}`;
      };
      this.addressCurrent = this.students[key].address;
      this.addressCurrent.name = this.students[key].name;
      this.addressCurrent.email = this.students[key].email;
      this.addressCurrent.dnasc = formatDate();
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
