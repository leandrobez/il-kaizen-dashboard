<template>
<div class="il-config">
    <ilAlert :has="checkAlert" :msg="message" />
    <div class="il-config--content" v-if="checkAssigned">
        <h3 class="il-color--light">Área de Administração</h3>
        <div class="il-config--wrapper">
            <div class="il-config--aside">
                <ul class="il-menu il-color--light">
                    <li>
                        <span>Aulas</span>
                    </li>
                    <li class="il-submenu">
                        <span>Cadastros</span>
                        <ul>
                            <li>Alunos</li>
                            <li>Matrículas</li>
                            <li>Avaliações</li>
                            <li>Professores</li>
                        </ul>
                    </li>
                    <li class="il-submenu">
                        <span>Financeiro</span>
                        <ul>
                            <li>Mensalidades</li>
                            <li>Contas</li>
                            <li>Comissões</li>
                        </ul>
                    </li>
                    <li class="il-submenu">
                        <span>Configurações</span>
                        <ul>
                            <li>Dados Kaizen</li>
                            <li>Admins</li>
                            <li>Personalizações</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="il-config--main">
                <h4 class="il-color--light">Bem vindo Leandro</h4>
                <p class="il-color--light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro molestias tempora sint tenetur adipisci sit architecto pariatur! Minima, aspernatur. Modi blanditiis saepe voluptas dolorum inventore explicabo cumque et voluptatum quibusdam?</p>
                <section class="il-section">
                    <div class="il-statistic il-color--light">
                        <div class="il-statistic--items il-backround--gradient-boxes">
                            <div class="il-header">
                                <div class="il-actives">
                                    <span>{{students.ativos}}</span>
                                    <span>Ativos</span>
                                </div>
                                <div class="il-inactives">
                                    <span>{{students.inativos}}</span>
                                    <span>Inativos</span>
                                </div>
                            </div>
                            <div class="il-body">
                                <span>Alunos</span>
                            </div>
                        </div>
                        <div class="il-statistic--items il-backround--gradient-boxes">
                            <div class="il-header">
                                <div class="il-actives">
                                    <span>{{students.totalFem}}</span>
                                    <span>Feminino</span>
                                </div>
                                <div class="il-inactives">
                                    <span>{{students.totalMale}}</span>
                                    <span>Masculino</span>
                                </div>
                            </div>
                            <div class="il-body">
                                <span>Genero</span>
                            </div>
                        </div>
                        <div class="il-statistic--items il-backround--gradient-boxes">
                            <div class="il-header">
                                <div class="il-actives">
                                    <span>45</span>
                                    <span>Ativas</span>
                                </div>
                                <div class="il-inactives">
                                    <span>5</span>
                                    <span>Canceladas</span>
                                </div>
                            </div>
                            <div class="il-body">
                                <span>Matrículas</span>
                            </div>
                        </div>
                        <div class="il-statistic--items il-backround--gradient-boxes">
                            <div class="il-header">
                                <div class="il-actives">
                                    <span>105</span>
                                    <span>Executadas</span>
                                </div>
                                <div class="il-inactives">
                                    <span>5</span>
                                    <span>Agendadas</span>
                                </div>
                            </div>
                            <div class="il-body">
                                <span>Avaliações</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="il-section">
                    <div class="il-cards">
                        <div class="il-card--items il-background--gradient-great-whale">
                            <div class="il-card--header">
                                <span>Pagamentos</span>
                            </div>
                            <div class="il-card--body">
                                <div class="il-graph">
                                    grafico
                                </div>
                                <div class="il-info">
                                    <ul>
                                        <li>pagos</li>
                                        <li>inadiplentes</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="il-card--items il-background--gradient-great-whale">
                            <div class="il-card--header">
                                <span>Aniversariantes</span>
                            </div>
                            <div class="il-card--body">
                              <ul>
                                    <li v-for="(niver,index) in birthday" :key="index">
                                        <span>
                                            dia: {{niver.day}}<br>
                                            name: {{niver.name}}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ilAlert from '@/components/includes/alerts.vue';
import accessStudentAPI from '../../common/apiStudent.js';
export default {
  name: 'configIndex',
  components: {
    ilAlert
  },
  data() {
    return {
      message: null,
      assigned: false,
      students: {
        ativos: 0,
        inativos: 0,
        totalFem: 0,
        totalMale: 0
      },
      birthday: []
    };
  },
  computed: {
    checkAssigned() {
      if (this.assigned || window.localStorage.getItem('_token')) {
        return true;
      }
      return false;
    },
    checkAlert() {
      if (this.message) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      accessStudentAPI
        .getStudents()
        .then(response => {
          if (response.error === null && response.student.length > 0) {
            let ativos = response.student.filter(element => {
              return element.ativo;
            });
            this.students.ativos = ativos.length;
            this.students.inativos = response.student.length - ativos.length;
            let fem = response.student.filter(element => {
              return element.genre == 'FEM';
            });
            this.students.totalFem = fem.length;
            let male = response.student.filter(element => {
              return element.genre == 'MASC';
            });
            this.students.totalMale = male.length;
            const find = 'T03';
            let birthday = [];
            let today = new Date();
            let d = today.getMonth() + 1;
            response.student.forEach(element => {
              let dnascArray = element.dnasc.split(find);
              let dnasc = dnascArray[0];
              let month = dnasc.split('-' + d + '-');
              if (month.length == 2) {
                birthday.push({
                  name: element.name,
                  day: month[1]
                });
              }
            });
            this.birthday = birthday;
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
        });
    },
    setAlert(obj) {
      this.message = obj;
    }
  }
};
</script>
