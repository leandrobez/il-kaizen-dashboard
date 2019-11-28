<template>
<section class="il-evaliation--section">
    <div class="il-evaliation--content">
        <h5>Dados iniciais para {{getStudent}}</h5>
        <form class="il-form il-form--param">
            <div class="il-field--input">
                <label for="age" class="il-color--light">Idade</label>
                <input type="number" v-model="profile.age" class="il-add--description" placeholder="Idade" id="age" required />
            </div>
            <div class="il-field--input">
                <label for="weigth" class="il-color--light">Peso</label>
                <input type="number" v-model="profile.weight" class="il-add--description" placeholder="Peso" id="weigth" required />
            </div>
            <div class="il-field--input">
                <label for="alt" class="il-color--light">Altura</label>
                <input type="number" v-model="profile.alt" class="il-add--description" placeholder="Altura" id="alt" required />
            </div>
            <div class="il-field--input il-genre">
                <label for="genre" class="il-color--light">Sexo</label>
                <div class="il-field--radio">
                    <label for="masc" class="il-color--light">Masc</label>
                    <input type="radio" id="masc" v-model="profile.genre" value="masc" @click="setProfile('m')" />
                    <label for="fem" class="il-color--light">Fem</label>
                    <input type="radio" id="fem" v-model="profile.genre" value="fem" @click="setProfile('f')" />
                </div>
            </div>
        </form>
    </div>
    <div class="il-evaliation--content">
        <h5 v-if="dataProfile">Escolha uma faixa</h5>
        <div class="il-evaliation--ranges" v-if="dataFaixa">
            <div class="il-card--range" v-for="(range,index) in faixas" :key="`range_${index}`">
                <div class="il-range--header">
                    <h4>{{range.ranking}}</h4>
                </div>
                <div class="il-range--body">
                    <p class="il-color--dark">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <div class="il-field--range">
                        <input type="number" class="il-range--values" :min="range.limits.min" :max="range.limits.max" :value="range.limits.min" :id="`percent_${index}`">
                        <div class="il-spin--range">
                            <span :id="`inc-button_${index}`" class="spinner-button" @click="increment(index,range.limits.max)">+</span>
                            <span :id="`dec-button_${index}`" class="spinner-button" @click="decrement(index,range.limits.min)">-</span>
                        </div>
                        <div class="il-button--range">
                            <button class="il-btn--perc" @click="setRange(range.ranking, index)" title="Escolher essa faixa">Escolher</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <button class="il-btn il-btn--confirm" @click.prevent="confirm" v-if="showConfirm">{{textBtn}}</button>
</section>
</template>

<script>
import ranges from '../../../common/evaliationRange.js';
import pollack from '../../../common/pollack';
import { mapGetters } from 'vuex';
export default {
  name: 'evaliationParams',
  data() {
    return {
      profile: {
        genre: 'masc',
        weight: 79.3,
        age: 57,
        alt: 1.64,
        percent: {}
      },
      percent: {
        type: '',
        value: 0
      },
      faixas: [],
      limites: [],
      showConfirm: false,
      showBtn: false,
      dataFaixa: false,
      dataProfile: false,
      textBtn: 'Confirmar'
    };
  },
  computed: {
    ...mapGetters('evaliation', {
      getStudent: 'getStudent'
    })
  },
  methods: {
    confirm() {
      if (
        this.profile.weight == 0 ||
        this.profile.age == 0 ||
        this.profile.alt == 0
      ) {
        this.$emit('msg', {
          type: 'warning',
          message: 'Os campos idade, peso e altura devem ser maior que zero'
        });
        return;
      } else {
        this.showConfirm = false;
        this.$emit('next');
      }
      /*this.$router.push({
        name: 'evaliation.anthropometric'
      });*/
    },
    setProfile(genre) {
      let avaliation = null;
      if (genre == 'm') {
        this.profile.genre = 'masc';
        avaliation = pollack.evaliationMale;
      } else {
        this.profile.genre = 'fem';
        avaliation = pollack.evaliationFemale;
      }

      this.faixas = avaliation.getRanges(this.profile.age);
      this.dataFaixa = true;
    },
    setRange(type, index) {
      this.showConfirm = true;
      let inputs = document.querySelectorAll('.il-range--values');
      let value = inputs[index].value;
      this.percent.type = type;
      this.percent.value = value;
      this.profile.percent = this.percent;
      localStorage.setItem('profile', JSON.stringify(this.profile));
      this.textBtn =
        'Tipo ' + type + ' com percentagem de ' + value + '% - confirmar';
    },
    increment(key, max) {
      const range = document.getElementById('percent_' + key);
      let next = +range.value + 1;
      if (next <= max) {
        range.value = +range.value + 1;
      }
    },
    decrement(key, min) {
      const range = document.getElementById('percent_' + key);
      let prev = +range.value - 1;
      if (prev >= min) {
        range.value = +range.value - 1;
      }
    },
    managerRanged() {
      const amount = document.getElementById('amount');
      const range = document.getElementById('slider-range-min');
      const slider = document.querySelector('.il-slider--range');
      const btn = document.querySelector('.il-slider--btn');
      const slideRange = e => {
        amount.value = 'R$ ' + '45%';
      };
      let realPos = null;
      let option = {
        range: 'min',
        step: 100,
        value: 1200,
        min: 0,
        max: 15000,
        slide: slideRange()
      };
      btn.addEventListener('click', e => {
        let pos = 100 - e.layerX / 2;

        const moveAt = pos => {
          btn.style.left = pos + '%';
          //console.log(btn);
          realPos = pos;
          btn.addEventListener('mousemove', e => {
            //console.log(realPos);
            let newPos = realPos + e.layerX;
            console.log(newPos);
            const moveNewPos = pos => {
              btn.style.left = pos;
              //realPos = pos
            };
            moveNewPos(newPos);
          });
        };
        moveAt(pos);
      });
    }
  }
};
</script>
