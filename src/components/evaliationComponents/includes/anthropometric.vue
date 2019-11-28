<template>
<section class="il-evaliation--section">
    <div class="il-evaliation--content">
        <h5>Ficha Antropométrica</h5>
        <div class="il-content--header">
            <ul>
                <li>{{profile.age}} anos</li>
                <li>{{profile.alt}} m</li>
                <li>{{profile.genre}}</li>
                <li>{{profile.weight}} Kg</li>
                <li>{{profile.percent.type}}</li>
                <li>{{profile.percent.value}}%</li>
            </ul>
        </div>
        <div class="il-whiteboard">
            <div class="il-whiteboard--item">
                <div class="il-item--header">
                    <h4>Perímetros</h4>
                </div>
                <div class="il-item--body">
                    <ul>
                        <li>Tórax: {{perimetria.torax}}</li>
                        <li>Abdome: {{perimetria.abdome}}</li>
                        <li>Quadril: {{perimetria.quadril}}</li>
                        <li>Antebraço dir: {{perimetria.antebraco_dir}}</li>
                        <li>Antebraço esq: {{perimetria.antebraco_esq}}</li>
                        <li>Braço dir: {{perimetria.braco_dir}}</li>
                        <li>Braço esq: {{perimetria.braco_esq}}</li>
                        <li>Coxa dir: {{perimetria.coxa_dir}}</li>
                        <li>Coxa esq: {{perimetria.coxa_esq}}</li>
                        <li>Panturrilha esq: {{perimetria.panturrilha_dir}}</li>
                        <li>Panturrilha dir: {{perimetria.panturrilha_esq}}</li>
                        <li>Pulso dir: {{perimetria.pulso_dir}}</li>
                    </ul>
                </div>
            </div>
            <div class="il-whiteboard--item">
                <div class="il-item--header">
                    <h4>Dobras</h4>
                </div>
                <div class="il-item--body">
                    <ul>
                        <li>Subscapular: {{dobras.subscapular}}</li>
                        <li>Tricipital: {{dobras.tricipital}}</li>
                        <li>Bicipital: {{dobras.bicipital}}</li>
                        <li>Axilar média: {{dobras.axilar_media}}</li>
                        <li>Peitoral: {{dobras.peitoral}}</li>
                        <li>Supra-ilíaca: {{dobras.supra_iliaca}}</li>
                        <li>Abdominal: {{dobras.abdominal}}</li>
                        <li>Coxa: {{dobras.coxa}}</li>
                        <li>Panturrilha medial: {{dobras.panturrilha_medial}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="il-whiteboard">
            <div class="il-whiteboard--item il-sum">
                <span>Soma dobras: {{getSumSkyn}}</span>
            </div>
            <div class="il-whiteboard--item il-polack">
                <span>Soma 7 dobras: {{getSumSevenSkyn}}</span>
            </div>
        </div>
        <form class="il-form il-form--signup il-color--light">
            <div class="il-whiteboard il-full" v-if="hasResult">
                <div class="il-whiteboard--item">
                    <div class="il-item--header">
                        <h4>Resultado</h4>
                    </div>
                    <div class="il-item--body il-result">
                        <ul>
                            <li v-for="(item,idx1) in result" :key="`item_${idx1}`">
                                <span>{{item.key}}</span>: {{item.value}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="il-field--button">
                <button class="il-btn il-btn--submit" title="Calcular o resultado" @click.prevent="calcEvalation">Calcular</button>
                <button class="il-btn il-btn--return il-btn--center" @click="$router.back()">
                    Retornar
                </button>
            </div>
        </form>
    </div>

</section>
</template>

<script>
import pollack from '../../../common/pollack';
import {
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex';
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
            result: [{
                    key: 'Densidade Corporal',
                    value: 0
                },
                {
                    key: 'Pollock Constante',
                    value: 0
                },
                {
                    key: '% DE GORDURA - 7 dobras',
                    value: 0
                },
                {
                    key: 'PESO DA GORDURA - 7 dobras',
                    value: 0
                },
                {
                    key: 'PESO RESIDUAL',
                    value: 0
                },
                {
                    key: 'PESO ÓSSEO',
                    value: 0
                },
                {
                    key: 'PESO MUSCULAR',
                    value: 0
                },
                {
                    key: 'MASSA CORPORAL MAGRA',
                    value: 0
                },
                {
                    key: 'PESO TOTAL',
                    value: 0
                },
                {
                    key: 'PESO TEÓRICO IDEAL',
                    value: 0
                },
                {
                    key: 'PESO GORDURA EXCESSO',
                    value: 0
                }
            ]
        };
    },
    computed: {
        /*getAge() {
              return this.profile.age;
            },
            getAltura() {
              return this.profile.alt;
            },
            getWeight() {
              return this.profile.weight;
            },*/
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
        ...mapGetters('evaliation', {
            getStudent: 'getStudent'
        }),
        setStudent() {
            let student = this.getStudent();
            console.log(student);
        },
        calcEvalation() {
            this.setStudent();
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
            let evaliation = null;
            if (this.profile.genre == 'masc') {
                evaliation = pollack.evaliationMale;
            } else {
                evaliation = pollack.evaliationFemale;
            }
            let skins = evaliation.getSkins();
            skins.forEach(element => {
                sumThreeFolds = sumThreeFolds + this.dobras[element.key];
            });
            for (var prop in this.dobras) {
                if (prop != 'bicipital' && prop != 'panturrilha_medial') {
                    sumFolds = sumFolds + this.dobras[prop];
                }
            }
            DC = evaliation.getDensity(sumThreeFolds, this.profile.age);
            PC = evaliation.getConst(sumFolds, this.profile.age);
            PG = evaliation.getPercFat(PC);
            G = PG * this.profile.weight / 100;
            PR = this.profile.weight * evaliation.residual;
            PO = evaliation.getBonesWeight(
                this.profile.alt,
                this.osseo.biestiloide,
                this.osseo.condilo
            );
            MCM = this.profile.weight - G;
            PTI = MCM * 100 / (100 - this.profile.percent.value);
            PGE = this.profile.weight - PTI;
            PM = this.profile.weight - (G + PO + PR);
            let result = [{
                    key: 'Densidade Corporal',
                    value: DC
                },
                {
                    key: 'Pollock Constante',
                    value: PC
                },
                {
                    key: '% DE GORDURA - 7 dobras',
                    value: PG + ' %'
                },
                {
                    key: 'PESO DA GORDURA - 7 dobras',
                    value: G.toFixed(2) + ' Kg'
                },
                {
                    key: 'PESO RESIDUAL',
                    value: PR.toFixed(2) + ' Kg'
                },
                {
                    key: 'PESO ÓSSEO',
                    value: PO.toFixed(2) + ' Kg'
                },
                {
                    key: 'PESO MUSCULAR',
                    value: PM.toFixed(2) + ' Kg'
                },
                {
                    key: 'MASSA CORPORAL MAGRA',
                    value: MCM.toFixed(2) + ' Kg'
                },
                {
                    key: 'PESO TOTAL',
                    value: (G + PM).toFixed(2) + ' Kg'
                },
                {
                    key: 'PESO TEÓRICO IDEAL',
                    value: PTI.toFixed(2) + ' Kg'
                },
                {
                    key: 'PESO GORDURA EXCESSO',
                    value: PGE.toFixed(2) + ' Kg'
                }
            ];

            this.result = result;
            this.hasResult = true;
            this.setEvaliation([{
                student: this.getStudent,
                contents: [{
                    data: '23/10/2019',
                    result: this.result
                }]
            }]);
        }
    }
};
</script>
