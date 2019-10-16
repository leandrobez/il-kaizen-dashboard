<template>
<div class="il-registration">
    <div class="il-registration--avatar" v-if="registration.picture">
        <img :src="`data:image/jpeg;base64,/${registration.picture}`" alt="">
    </div>
    <div class="il-registration--data">
        <form class="il-form il-form--registration" @submit.prevent="register">
            <div class="il-registration--content">
                <label for="name">Nome</label>
                <input type="text" v-model="registration.name" class="il-add--description" placeholder="nome completo" id="name" disabled />
                <label for="email">Email</label>
                <input type="email" v-model="registration.email" class="il-add--description" disabled id="email" />
                <label for="obs">Obs</label>
                <input type="text" v-model="registration.obs" class="il-input--obs" placeholder="Observação" id="obs" />
                <div class="il-field--select">
                    <div>
                        <label>Aula</label>
                        <select v-model="registration.class" :change="setValor()" class="il-select">
                            <option>Pilates</option>
                            <option>Corealign</option>
                            <option>Mixto</option>
                        </select>
                    </div>
                    <div>
                        <label>Professor</label>
                        <select v-model="registration.teacher" :change="setValor()" class="il-select">
                            <option>Claudia</option>
                            <option>Juliana</option>
                            <option>Munique</option>
                        </select>
                    </div>
                </div>
                <div class="il-field--select">
                    <div>
                        <label for="vezes">Vezes</label>
                        <select ref="vezes" v-model="registration.vezes" :change="setValor()" class="il-select" id="vezes">
                            <option v-for="(vez,index) in vezes" :key="index">{{vez}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="valor">Valor</label>
                        <select ref="valor" v-model="registration.valor" class="il-select" id="valor">
                            <option v-for="(valor,index) in valors" :key="index">{{valor}}</option>
                        </select>
                    </div>
                </div>
                <label>Conceder desconto?</label>
                <div class="il-field--radio">
                    <label for="noDesc">Sem Desc</label>
                    <input type="radio" v-model="desc" id="noDesc" value="0" checked @click="showDesc('no')">
                    <label for="perc">Desc em %</label>
                    <input type="radio" v-model="desc" id="perc" value="perc" @click="showDesc('perc')">
                    <label for="abs">Desc em valor</label>
                    <input type="radio" v-model="desc" id="abs" value="abs" @click="showDesc('abs')">
                </div>
                <div class="il-field--info" v-if="showPerc || showAbs">
                    <label for="perc" v-if="showPerc">Percentual</label>
                    <input type="text" v-model="registration.desc.perc" class="il-add--description" placeholder="Desconto em percentual ex: 10" v-if="showPerc" id="perc" />
                    <label for="abs" v-if="showAbs">Valor Absoluto</label>
                    <input type="text" v-model="registration.desc.abs" class="il-add--description" placeholder="Desconto em valor absoluto Ex: 20" v-if="showAbs" id="abs" />
                </div>
                <label for="">Avisar sobre vencimento</label>
                <div class="il-field--radio">
                    <label for="yes">Sim</label>
                    <input type="radio" v-model="sendmsg" id="yes" value="y">
                    <label for="no">Não</label>
                    <input type="radio" v-model="sendmsg" id="no" value="n" checked>
                </div>
            </div>
        </form>
    </div>
    <h4 class="il-color--light">Dias de aulas</h4>
    <div class="il-registration--card" v-if="schedule.length > 0">
        <div class="il-registration--day">
            <div class="il-registration--box">
                <div class="il-field--checkboxes">
                    <input type="checkbox" id="seg" value="Segunda" v-model="registration.schedule">
                    <label for="seg">Segunda</label>
                </div>
                <div class="il-clock--start">
                    <i class="mdi mdi-24px mdi-clock"></i>
                    <select v-model="schedule[0].start">
                        <option value="">Início</option>
                        <option v-for="(op,index1) in hours" :key="index1">{{op}}:00</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="il-registration--day">
            <div class="il-registration--box">
                <div class="il-field--checkboxes">
                    <input type="checkbox" id="ter" value="Terça" v-model="registration.schedule">
                    <label for="ter">Terça</label>
                </div>
                <div class="il-clock--start">
                    <i class="mdi mdi-24px mdi-clock"></i>
                    <select v-model="schedule[1].start">
                        <option value="">Início</option>
                        <option v-for="(op,index1) in hours" :key="index1">{{op}}:00</option>
                    </select>
                    
                </div>
            </div>
        </div>
        <div class="il-registration--day">
            <div class="il-registration--box">
                <div class="il-field--checkboxes">
                    <input type="checkbox" id="qua" value="Quarta" v-model="registration.schedule">
                    <label for="qua">Quarta</label>
                </div>
                <div class="il-clock--start">
                    <i class="mdi mdi-24px mdi-clock"></i>
                    <select v-model="schedule[2].start">
                        <option value="">Início</option>
                        <option v-for="(op,index1) in hours" :key="index1">{{op}}:00</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="il-registration--day">
            <div class="il-registration--box">
                <div class="il-field--checkboxes">
                    <input type="checkbox" id="qui" value="Quinta" v-model="registration.schedule">
                    <label for="qui">Quinta</label>
                </div>
                <div class="il-clock--start">
                    <i class="mdi mdi-24px mdi-clock"></i>
                    <select v-model="schedule[3].start">
                        <option value="">Início</option>
                        <option v-for="(op,index1) in hours" :key="index1">{{op}}:00</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="il-registration--day">
            <div class="il-registration--box">
                <div class="il-field--checkboxes">
                    <input type="checkbox" id="sex" value="Sexta" v-model="registration.schedule">
                    <label for="sex">Sexta</label>
                </div>
                <div class="il-clock--start">
                    <i class="mdi mdi-24px mdi-clock"></i>
                    <select v-model="schedule[4].start">
                        <option value="">Início</option>
                        <option v-for="(op,index1) in hours" :key="index1">{{op}}:00</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="il-registration--button">
        <button class="il-btn ">
            <i class="mdi mdi-24px mdi-check"></i>
            <span>Salvar</span>
        </button>
    </div>
</div>
</template>

<script>
import accessRegisterAPI from '../../../common/apiRegister.js';
import accessStudentAPI from '../../../common/apiStudent.js';
export default {
  name: 'formRegister',
  props: {
    id: String
  },
  data() {
    return {
      sendmsg: 'n',
      showSnapShot: false,
      vezes: [1, 2, 3],
      valors: [245, 460, 595],
      desc: 0,
      showPerc: false,
      showAbs: false,
      registration: {
        name: '',
        vezes: 1,
        valor: '',
        class: 'Pilates',
        teacher: 'Claudia',
        obs: 'Sem observação',
        email: '',
        picture: '',
        desc: {
          perc: 0,
          abs: 0
        },
        schedule: []
      },
      schedule: [],
      dayWeeks: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      hours: [7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19]
    };
  },
  mounted() {
    this.scheduleStructure();
    this.getStudent();
  },
  computed: {},
  methods: {
    scheduleStructure() {
      let days = [];
      this.dayWeeks.forEach(element => {
        days.push({
          day: element,
          start: '',
          end: ''
        });
      });
      this.schedule = days;
    },
    getStudent() {
      let vm = this;
      if (this.id) {
        accessStudentAPI
          .searchStudent(this.id)
          .then(res => {
            if (res.error == null) {
              /*const formatData = () => {
                              let dnasc = res.student.dnasc; //2019-07-09T00:00:00.000Z
                              const [dt, schema] = dnasc.split('T');
                              const [y, m, d] = dt.split('-');
                              return `${y}-${m}-${d}`;
                            };*/
              this.registration.name = res.student.name;
              this.registration.obs = res.student.obs;
              this.registration.email = res.student.email;
              this.registration.valor = res.student.valor;
              this.registration.vezes = res.student.vezes;
              this.registration.picture = ''; //this.registration.desc.abs = res.student.desc.abs;
              this.registration.desc.perc = res.student.desc.perc;

              if (this.registration.picture == '') {
                this.showSnapShot = true;
              }
            } else {
              let msg = res.error.message;
              vm.$emit('msg', {
                type: msg.type,
                message: msg.value
              });
            }
          })
          .catch(err => {
            let msg = err.error;
            vm.$emit('msg', {
              type: 'danger',
              message: msg
            });
          });
      }
    },
    register() {
      let vm = this;
      accessRegisterAPI
        .create(this.id, this.registration)
        .then(res => {
          if (res.data.error == '') {
            vm.$emit('msg', {
              type: 'success',
              message: 'O aluno/s foi matriculado com sucesso!'
            });
            setTimeout(() => {
              vm.$router.push({
                name: 'students'
              });
            }, 2500);
          } else {
            const value = res.data.error;
            vm.$emit('msg', {
              type: 'warning',
              message: value
            });
          }
        })
        .catch(err => {
          vm.$emit('msg', {
            type: 'danger',
            message: err
          });
        });
    },
    showDesc(whoo) {
      if (whoo == 'perc') {
        this.showAbs = false;
        this.showPerc = true;
      } else {
        if (whoo == 'abs') {
          this.showAbs = true;
          this.showPerc = false;
        } else {
          this.showAbs = false;
          this.showPerc = false;
        }
      }
    },
    setValor() {
      let vz = this.registration.vezes;
      let valor = this.valors[vz - 1];
      this.registration.valor = valor;
      if (this.registration.desc.abs) {
        this.registration.valor = valor - this.registration.desc.abs;
      } else {
        if (this.registration.desc.perc) {
          let desc = this.registration.desc.perc / 100 * valor;
          this.registration.valor = valor - desc;
        }
      }
      this.valors[vz - 1] = this.registration.valor;
    },
    setPicture(picture) {
      this.registration.picture = picture;
    }
  }
};
</script>
