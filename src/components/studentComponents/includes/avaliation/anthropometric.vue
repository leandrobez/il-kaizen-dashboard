<template>
<div class="il-avaliation">
    <h4 class="il-color--light">Ficha Antropométrica de: {{getStudent}} - <span>{{getAge}} anos</span></h4>
    <div class="il-avaliation-anthropometric">
        <div class="il-antropometric--content">
            <div class="il-metrics">
                <h5 class="il-color--dark">Medidas</h5>
                <div class="il-perimeters">
                    <ul>
                        <li>Perímetros</li>
                        <li>Tórax</li>
                        <li>Abdome</li>
                        <li>Quadril</li>
                        <li>Antebraço dir.</li>
                        <li>Antebraço esq.</li>
                        <li>Braço dir.</li>
                        <li>Braço esq.</li>
                        <li>Coxa dir.</li>
                        <li>Coxa esq.</li>
                        <li>Panturrilha esq.</li>
                        <li>Panturrilha dir.</li>
                        <li>Pulso dir.</li>
                    </ul>
                </div>
                <div class="il-skins">
                    <ul>
                        <li>Dobras</li>
                        <li>Subscapular</li>
                        <li>Tricipital</li>
                        <li>Bicipital</li>
                        <li>Axilar média</li>
                        <li>Peitoral</li>
                        <li>Supra-ilíaca</li>
                        <li>Abdominal</li>
                        <li>Coxa</li>
                        <li>Panturrilha medial</li>
                    </ul>
                </div>
                <span class="il-sum-skins">Soma dobras</span>
                <span class="il-polack">Soma 7 dobras</span>
                <div class="il-results">
                    <ul>
                        <li>Resultado</li>
                        <li v-for="(item,idx) in result" :key="`item_${idx}`">{{item.key}}</li>
                    </ul>
                </div>
            </div>
            <div class="il-dates">
                <div class="il-date--items">                    
                    <div class="il-perfil--values">
                        <label for="dt">Data</label>
                        <input type="date" value="" id="dt">
                        <span>Estatura: {{getAltura}} m</span>
                        <span>Peso: {{getWeight}} kg</span>
                    </div>
                    <div class="il-perimeters--values">
                        <ul>
                            <li><input type="text" v-model="perimetria.torax"></li>
                            <li><input type="text" v-model="perimetria.abdome"></li>
                            <li><input type="text" v-model="perimetria.quadril"></li>
                            <li><input type="text" v-model="perimetria.antebraco_dir"></li>
                            <li><input type="text" v-model="perimetria.antebraco_esq"></li>
                            <li><input type="text" v-model="perimetria.braco_dir"></li>
                            <li><input type="text" v-model="perimetria.braco_esq"></li>
                            <li><input type="text" v-model="perimetria.coxa_dir"></li>
                            <li><input type="text" v-model="perimetria.coxa_esq"></li>
                            <li><input type="text" v-model="perimetria.panturrilha_dir"></li>
                            <li><input type="text" v-model="perimetria.panturrilha_esq"></li>
                            <li><input type="text" v-model="perimetria.pulso_dir"></li>
                        </ul>
                    </div>
                    <div class="il-skins--values">
                        <ul>
                            <li><input type="text" v-model="dobras.subscapular"></li>
                            <li><input type="text" v-model="dobras.tricipital"></li>
                            <li><input type="text" v-model="dobras.bicipital"></li>
                            <li><input type="text" v-model="dobras.axilar_media"></li>
                            <li><input type="text" v-model="dobras.peitoral"></li>
                            <li><input type="text" v-model="dobras.supra_iliaca"></li>
                            <li><input type="text" v-model="dobras.abdominal"></li>
                            <li><input type="text" v-model="dobras.coxa"></li>
                            <li><input type="text" v-model="dobras.panturrilha_medial"></li>
                        </ul>
                    </div>
                    <span class="il-sum-skins--values">{{getSumSkyn}}</span>
                    <span class="il-polack--values">{{getSumSevenSkyn}}</span>
                    <span class="il-title--result">Valores</span>
                    <div class="il-results--values" v-if="hasResult">
                        <ul>
                            <li v-for="(item,idx1) in result" :key="`item_${idx1}`">{{item.value}}</li>
                        </ul>
                    </div>
                    <a href="#" class="il-btn il-btn--submit" title="Calcular o resultado" @click.prevent="calcAvalation">Calcular</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import pollack from '../../../../common/pollack';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'anthropometric',
  data() {
    return {
      hasResult: false,
      profile: {},
      dobras: {
        subscapular: 28,
        tricipital: 36,
        bicipital: 20,
        axilar_media: 27,
        peitoral: 26,
        supra_iliaca: 25,
        abdominal: 31,
        coxa: 48,
        panturrilha_medial: 24
      },
      perimetria: {
        torax: 88,
        quadril: 92,
        abdome: 104.5,
        antebraco_dir: 28,
        antebraco_esq: 26.5,
        braco_dir: 32,
        braco_esq: 32,
        coxa_dir: 64,
        coxa_esq: 62,
        panturrilha_dir: 40.5,
        panturrilha_esq: 39,
        pulso_dir: 17
      },
      osseo: {
        biestiloide: 6.7,
        condilo: 11.2
      },
      result: [
        { key: 'Densidade Corporal', value: 0 },
        { key: 'Pollock Constante', value: 0 },
        { key: '% DE GORDURA - 7 dobras', value: 0 },
        { key: 'PESO DA GORDURA - 7 dobras', value: 0 },
        { key: 'PESO RESIDUAL', value: 0 },
        { key: 'PESO ÓSSEO', value: 0 },
        { key: 'PESO MUSCULAR', value: 0 },
        { key: 'MASSA CORPORAL MAGRA', value: 0 },
        { key: 'PESO TOTAL', value: 0 },
        { key: 'PESO TEÓRICO IDEAL', value: 0 },
        { key: 'PESO GORDURA EXCESSO', value: 0 }
      ]
    };
  },
  computed: {
    ...mapGetters('evaliation', { getStudent: 'getStudent' }),
    getAge() {
      return this.profile.age;
    },
    getAltura() {
      return this.profile.alt;
    },
    getWeight() {
      return this.profile.weight;
    },
    getSumSkyn() {
      let somaDobrasCutaneas = 0;
      for (var prop in this.dobras) {
        somaDobrasCutaneas = somaDobrasCutaneas + this.dobras[prop];
      }
      return somaDobrasCutaneas;
    },
    getSumSevenSkyn() {
      let sum = 0;
      for (var prop in this.dobras) {
        if (prop != 'bicipital' && prop != 'panturrilha_medial') {
          sum = sum + this.dobras[prop];
        }
      }
      return sum;
    }
  },
  mounted() {
    let profile = localStorage.getItem('profile');
    this.profile = JSON.parse(profile);
  },
  methods: {
    ...mapActions('evaliation', {
      setEvaliation: 'setEvaliation'
    }),
    calcAvalation() {
      const btn = document.querySelector('.il-btn.il-btn--submit');
      btn.style.height = 0;
      btn.style.visibility = 'hidden';
      let sumThreeFolds = 0,
        sumFolds = 0;
      let DC = 0,
        PC = 0,
        PG = 0,
        G = 0,
        PR = 0,
        PO = 0,
        MCM = 0,
        PTI = 0,
        PM = 0,
        PGE = 0;
      let avaliation = null;
      if (this.profile.genre == 'masc') {
        avaliation = pollack.evaliationMale;
      } else {
        avaliation = pollack.evaliationFemale;
      }
      let skins = avaliation.getSkins();
      skins.forEach(element => {
        sumThreeFolds = sumThreeFolds + this.dobras[element.key];
      });
      for (var prop in this.dobras) {
        if (prop != 'bicipital' && prop != 'panturrilha_medial') {
          sumFolds = sumFolds + this.dobras[prop];
        }
      }
      DC = avaliation.getDensity(sumThreeFolds, this.profile.age);
      PC = avaliation.getConst(sumFolds, this.profile.age);
      PG = avaliation.getPercFat(PC);
      G = PG * this.profile.weight / 100;
      PR = this.profile.weight * avaliation.residual;
      PO = avaliation.getBonesWeight(
        this.profile.alt,
        this.osseo.biestiloide,
        this.osseo.condilo
      );
      MCM = this.profile.weight - G;
      PTI = MCM * 100 / (100 - this.profile.percent.value);
      PGE = this.profile.weight - PTI;
      PM = this.profile.weight - (G + PO + PR);
      let result = [
        { key: 'Densidade Corporal', value: DC },
        { key: 'Pollock Constante', value: PC },
        { key: '% DE GORDURA - 7 dobras', value: PG + ' %' },
        { key: 'PESO DA GORDURA - 7 dobras', value: G.toFixed(2) + ' Kg' },
        { key: 'PESO RESIDUAL', value: PR.toFixed(2) + ' Kg' },
        { key: 'PESO ÓSSEO', value: PO.toFixed(2) + ' Kg' },
        { key: 'PESO MUSCULAR', value: PM.toFixed(2) + ' Kg' },
        { key: 'MASSA CORPORAL MAGRA', value: MCM.toFixed(2) + ' Kg' },
        { key: 'PESO TOTAL', value: (G + PM).toFixed(2) + ' Kg' },
        { key: 'PESO TEÓRICO IDEAL', value: PTI.toFixed(2) + ' Kg' },
        { key: 'PESO GORDURA EXCESSO', value: PGE.toFixed(2) + ' Kg' }
      ];

      this.result = result;
      this.hasResult = true;
      this.setEvaliation([
        {
          student: this.getStudent,
          contents: [
            {
              data: '23/10/2019',
              result: this.result
            }
          ]
        }
      ]);
    }
  }
};
</script>
