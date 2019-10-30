<template>
<div class="il-dashboard--home">
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
                        <span>{{students.emptyCPF.erro}}</span>
                        <span>Sem CPF</span>
                    </div>
                    <div class="il-inactives">
                        <span>{{students.emptyCPF.ok}}</span>
                        <span>Com CPF</span>
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
                  <table>
                    <thead>
                      <tr>
                        <th>Dia</th>
                        <th>Nome</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(niver,index) in birthday" :key="index">
                        <td>{{niver.day}}</td>
                        <td>{{niver.name}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import accessStudentAPI from '../../../common/apiStudent.js';
export default {
  name: 'dashboardHome',
  data() {
    return {
      allStudents: [],
      students: {
        ativos: 0,
        inativos: 0,
        totalFem: 0,
        totalMale: 0,
        emptyCPF: 0
      },
      birthday: []
    };
  },
  mounted() {
    this.getAllStudents();
  },
  methods: {
    getAllStudents() {
      accessStudentAPI
        .getStudents()
        .then(response => {
          if (response.error === null && response.student.length > 0) {
            this.allStudents = response.student;
            this.setStudents();
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
    setStudents() {
      //Ativos
      const ativosInativos = () => {
        let ativos = this.allStudents.filter(element => {
          return element.ativo;
        });
        let totalAtivos = ativos.length;
        let totalInativos = this.allStudents.length - totalAtivos;
        return [totalAtivos, totalInativos];
      };

      //Female
      const female = () => {
        let fem = this.allStudents.filter(element => {
          return element.genre == 'FEM';
        });
        return fem.length;
      };

      //male
      const male = () => {
        let male = this.allStudents.filter(element => {
          return element.genre == 'MASC';
        });
        return male.length;
      };

      const getCPF = () => {
        let empty = this.allStudents.filter(element => {
          return element.cpf != '';
        });
        let cpfError = [];
        let cpfOK = [];
        const validateCPF = cpf => {
          //if(cpf == '') return false
          //if (cpf == '' || cpf == '00000000000') return true;

          let Soma, Resto;
          Soma = 0;

          for (let i = 1; i <= 9; i++)
            Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
          Resto = (Soma * 10) % 11;

          if (Resto == 10 || Resto == 11) Resto = 0;
          if (Resto != parseInt(cpf.substring(9, 10))) return false;

          Soma = 0;
          for (let i = 1; i <= 10; i++)
            Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
          Resto = (Soma * 10) % 11;

          if (Resto == 10 || Resto == 11) Resto = 0;
          if (Resto != parseInt(cpf.substring(10, 11))) return false;
          return true;
        };

        empty.forEach(ele => {
          let result = validateCPF(ele.cpf);
          if (!result) {
            cpfError.push(ele.cpf);
          } else {
            cpfOK.push(ele.cpf);
          }
        });
        //console.log(cpfError, cpfOK);
        return { erro: cpfError.length, ok: cpfOK.length };
      };

      //birthday
      const getBirthday = () => {
        const find = 'T03';
        let birthday = [];
        let today = new Date();
        let d = today.getMonth() + 1;
        this.allStudents.forEach(element => {
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
        return birthday;
      };
      let result = ativosInativos();
      this.students = {
        ativos: result[0],
        inativos: result[1],
        totalFem: female(),
        totalMale: male(),
        emptyCPF: getCPF()
      };
      this.birthday = getBirthday();
    }
  }
};
</script>

<style>
</style>
