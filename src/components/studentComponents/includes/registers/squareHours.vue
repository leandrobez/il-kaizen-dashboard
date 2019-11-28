<template>
<div class="il-registration--hours">
    <h4 class="il-color--light">Dias de aulas</h4>
    <div class="il-registration--card">
        <div class="il-registration--day">
            <div class="il-registration--box">
                <div class="il-field--checkboxes">
                    <input type="checkbox" id="seg" value="Segunda" v-model="schedule[0].value">
                    <label for="seg">Segunda</label>
                </div>
                <div class="il-clock--start">
                    <i class="mdi mdi-24px mdi-clock il-color--light"></i>
                    <select v-model="schedule[0].start">
                        <option v-for="(op,index1) in hours" :key="index1">{{op}}:00</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="il-registration--day">
            <div class="il-registration--box">
                <div class="il-field--checkboxes">
                    <input type="checkbox" id="ter" value="Terça" v-model="schedule[1].value">
                    <label for="ter">Terça</label>
                </div>
                <div class="il-clock--start">
                    <i class="mdi mdi-24px mdi-clock il-color--light"></i>
                    <select v-model="schedule[1].start">
                        <option v-for="(op,index1) in hours" :key="index1">{{op}}:00</option>
                    </select>

                </div>
            </div>
        </div>
        <div class="il-registration--day">
            <div class="il-registration--box">
                <div class="il-field--checkboxes">
                    <input type="checkbox" id="qua" value="Quarta" v-model="schedule[2].value">
                    <label for="qua">Quarta</label>
                </div>
                <div class="il-clock--start">
                    <i class="mdi mdi-24px mdi-clock il-color--light"></i>
                    <select v-model="schedule[2].start">
                        <option v-for="(op,index1) in hours" :key="index1">{{op}}:00</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="il-registration--day">
            <div class="il-registration--box">
                <div class="il-field--checkboxes">
                    <input type="checkbox" id="qui" value="Quinta" v-model="schedule[3].value">
                    <label for="qui">Quinta</label>
                </div>
                <div class="il-clock--start">
                    <i class="mdi mdi-24px mdi-clock il-color--light"></i>
                    <select v-model="schedule[3].start">
                        <option v-for="(op,index1) in hours" :key="index1">{{op}}:00</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="il-registration--day">
            <div class="il-registration--box">
                <div class="il-field--checkboxes">
                    <input type="checkbox" id="sex" value="Sexta" v-model="schedule[4].value">
                    <label for="sex">Sexta</label>
                </div>
                <div class="il-clock--start">
                    <i class="mdi mdi-24px mdi-clock il-color--light"></i>
                    <select v-model="schedule[4].start">
                        <option v-for="(op,index1) in hours" :key="index1">{{op}}:00</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="il-registration--button">
        <button class="il-btn il-btn--register" @click="register">
            <i class="mdi mdi-24px mdi-check"></i>
            <span>Salvar</span>
        </button>
    </div>
</div>
</template>

<script>
export default {
  name: 'squareHours',
  props: {
    dayWeek: Number
  },
  data() {
    return {
      hours: [7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19],
      schedule: [
        {
          value: false,
          day: 'Segunda',
          start: ''
        },
        {
          value: false,
          day: 'Terça',
          start: ''
        },
        {
          value: false,
          day: 'Quarta',
          start: ''
        },
        {
          value: false,
          day: 'Quinta',
          start: ''
        },
        {
          value: false,
          day: 'Sexta',
          start: ''
        }
      ],
      start: [],
      choices: []
    };
  },
  methods: {
    register() {
      let check = false;
      let maxWeekDay = 0;
      let msgMaxWeekDay = '';
      this.schedule.forEach(element => {
        if (element.value && element.start) {
          this.choices.push({
            day: element.day,
            start: element.start
          });
          maxWeekDay++;
          if (maxWeekDay > this.dayWeek) {
            this.choices = [];
            msgMaxWeekDay =
              'A matrícula desse aluno permite apenas ' +
              this.dayWeek +
              ' aula por semana. Por favor verifique.';
            check = false;
          } else {
            check = true;
          }
        }
      });
      if (check) {
        let confirm = window.confirm(
          'Confirma matricular esse aluno com os dados informados?',
          'ok',
          'cancelar'
        );
        if (!confirm) {
          return;
        }
        this.$emit('register', this.choices);
      } else {
        if (msgMaxWeekDay) {
          alert(msgMaxWeekDay);
        } else {
          alert('É necessário escolher os dias e o horários de aulas.');
        }
        msgMaxWeekDay = '';
        return false;
      }
    }
  }
};
</script>
