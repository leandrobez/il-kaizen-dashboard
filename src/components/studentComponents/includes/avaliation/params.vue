<template>
<div class="il-avaliation">
    <div class="il-avaliation--profile">
        <h5 class="il-color--light">Dados iniciais</h5>
        <form class="il-form">
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
                    <input type="radio" v-model="profile.genre" id="masc" :checked="checkedM" value="masc" @click="setProfile" />
                    <label for="fem" class="il-color--light">Fem</label>
                    <input type="radio" v-model="profile.genre" id="fem" :checked="checkedF" value="fem" @click="setProfile" />
                </div>
            </div>
            <button class="il-btn il-btn--add" @click.prevent="confirmProfile"><i class="mdi mdi-24px mdi-check il-color--light"></i></button>
        </form>
    </div>
    <h5 class="il-color--light" v-if="dataProfile">Escolha uma faixa</h5>
    <div class="il-avaliation--ranges" v-if="dataProfile">
        <div class="il-card--range">
            <div class="il-card--header">
                <h4 class="il-color--light">Excelente</h4>
            </div>
            <div class="il-card--body">
                <ul>
                    <li><span class="il-color--light">Min: {{faixas.excelente.perc_min}}</span></li>
                    <li><span class="il-color--light">Max: {{faixas.excelente.perc_max}}</span></li>
                </ul>
            </div>
            <div class="il-card--footer" @click="setRange('Excelente',faixas.excelente)">
                <button class="il-btn">
                    <i class="mdi mdi-24px mdi-check"></i>
                </button>
            </div>
        </div>
        <div class="il-card--range">
            <div class="il-card--header">
                <h4 class="il-color--light">Bom</h4>
            </div>
            <div class="il-card--body">
                <ul>
                    <li><span class="il-color--light">Min: {{faixas.bom.perc_min}}</span></li>
                    <li><span class="il-color--light">Max: {{faixas.bom.perc_max}}</span></li>
                </ul>
            </div>
            <div class="il-card--footer">
                <button class="il-btn" @click="setRange('Bom',faixas.bom)">
                    <i class="mdi mdi-24px mdi-check"></i>
                </button>
            </div>
        </div>
        <div class="il-card--range">
            <div class="il-card--header">
                <h4 class="il-color--light">Médio</h4>
            </div>
            <div class="il-card--body">
                <ul>
                    <li><span class="il-color--light">Min: {{faixas.media.perc_min}}</span></li>
                    <li><span class="il-color--light">Max: {{faixas.media.perc_max}}</span></li>
                </ul>
            </div>
            <div class="il-card--footer">
                <button class="il-btn" @click="setRange('Média',faixas.media)">
                    <i class="mdi mdi-24px mdi-check"></i>
                </button>
            </div>
        </div>
        <div class="il-card--range">
            <div class="il-card--header">
                <h4 class="il-color--light">Acima</h4>
            </div>
            <div class="il-card--body">
                <ul>
                    <li><span class="il-color--light">Min: {{faixas.acima.perc_min}}</span></li>
                    <li><span class="il-color--light">Max: {{faixas.acima.perc_max}}</span></li>
                </ul>
            </div>
            <div class="il-card--footer">
                <button class="il-btn" @click="setRange('Acima',faixas.acima)">
                    <i class="mdi mdi-24px mdi-check"></i>
                </button>
            </div>
        </div>
        <div class="il-card--range">
            <div class="il-card--header">
                <h4 class="il-color--light">Excessivo</h4>
            </div>
            <div class="il-card--body">
                <ul>
                    <li><span class="il-color--light">Min: {{faixas.excessivo.perc_min}}</span></li>
                    <li><span class="il-color--light">Max: {{faixas.excessivo.perc_max}}</span></li>
                </ul>
            </div>
            <div class="il-card--footer">
                <button class="il-btn" @click="setRange('Excessivo',faixas.excessivo)">
                    <i class="mdi mdi-24px mdi-check"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="il-avaliation--percent" v-if="dataRange">
      <h5 class="il-color--light">Escolha um percentual</h5>
        <div class="il-field--range">
            <div class="il-label" v-for="(limit,index) in limites" :key="index">
                <label class="il-color--light" :for="`limit${index}`">{{limit}} %</label>
                <input type="radio" v-model="profile.perc" :id="`limit${index}`" :checked="checkedRange(index)" :value="limit" />
            </div>

        </div>

    </div>
</div>
</template>

<script>
import ranges from '../../../../common/avaliationRange.js';
export default {
  name: 'avaliationParams',
  data() {
    return {
      profile: {
        genre: 'masc',
        type: '',
        weight: 56,
        age: 55,
        alt: 1.67,
        perc: 0
      },
      faixas: {},
      limites: [],
      dataProfile: false,
      dataRange: false,
      rangeValue: 0
    };
  },
  computed: {
    checkedM() {
      if (this.profile.genre == 'masc' || this.profile.genre == 'MASC') {
        return 'checked';
      } else {
        return '';
      }
    },
    checkedF() {
      if (this.profile.genre == 'fem' || this.profile.genre == 'FEM') {
        return 'checked';
      } else {
        return '';
      }
    }
  },
  methods: {
    checkedRange(key) {
      if (key == 0) {
        return 'checked';
      } else {
        return '';
      }
    },
    setProfile() {
      let faixas = '';
      if (this.profile.genre == 'fem') {
        faixas = ranges.femalesToAge(this.profile.age);
        this.faixas = faixas;
        //this.showFaixas = true;
      } else {
        faixas = ranges.malesToAge(this.profile.age);
        this.faixas = faixas;
        //this.showFaixas = true;
      }
      //this.dataFaixa = true;
    },
    confirmProfile() {
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
      }
      this.dataProfile = true;
    },
    setRange(type, range) {
      this.profile.type = type;
      this.limites = ranges.makeLimits(range.perc_min, range.perc_max);
      this.dataRange = true;
      this.rangeValue = range.perc_min;
      console.log(this.limites);
    }
  }
};
</script>
