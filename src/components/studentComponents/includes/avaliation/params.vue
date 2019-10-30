<template>
<div class="il-avaliation">
    <h5 class="il-color--light">Dados iniciais para {{getStudent}}</h5>
    <div class="il-avaliation--profile">
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
                    <input type="radio" id="masc" v-model="profile.genre" value="masc" @click="setProfile('m')" />
                    <label for="fem" class="il-color--light">Fem</label>
                    <input type="radio" id="fem" v-model="profile.genre" value="fem" @click="setProfile('f')" />
                </div>
            </div>
            <button class="il-btn il-btn--add" @click.prevent="confirmProfile"><i class="mdi mdi-24px mdi-check il-color--light"></i></button>
        </form>
    </div>
    <h5 class="il-color--light" v-if="dataProfile">Escolha uma faixa</h5>
    <div class="il-avaliation--ranges" v-if="dataFaixa">
        <div class="il-card--range" v-for="(range,index) in faixas" :key="`range_${index}`">
            <div class="il-range--header">
                <h4>{{range.ranking}}</h4>
            </div>
            <div class="il-range--body">
                <p class="il-color--dark">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <div class="il-field--range">
                    <input type="number" class="il-range--values" :min="range.limits.min" :max="range.limits.max" :value="range.limits.min" :id="`range_${index}`">
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
</template>

<script>
import ranges from '../../../../common/avaliationRange.js';
import pollack from '../../../../common/pollack';
import {
    mapGetters
} from 'vuex';
export default {
    name: 'avaliationParams',
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
            showBtn: false,
            dataFaixa: false,
            dataProfile: false
        };
    },
    computed: {
        ...mapGetters('evaliation', {
            getStudent: 'getStudent'
        })
    },
    methods: {
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
            if (!this.dataFaixa) {
                this.setProfile();
            }
            this.dataProfile = true;
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
            console.log(genre, this.profile.genre);
            this.faixas = avaliation.getRanges(this.profile.age);
            this.dataFaixa = true;
        },
        setRange(type, index) {
            let inputs = document.querySelectorAll('.il-range--values');
            let value = inputs[index].value;
            this.percent.type = type;
            this.percent.value = value;
            this.profile.percent = this.percent;
            localStorage.setItem('profile', JSON.stringify(this.profile));
            this.$emit('next', '');
        },
        increment(key, max) {
            const range = document.getElementById('range_' + key);
            let next = +range.value + 1;
            if (next <= max) {
                range.value = +range.value + 1;
            }
        },
        decrement(key, min) {
            const range = document.getElementById('range_' + key);
            let prev = +range.value - 1;
            if (prev >= min) {
                range.value = +range.value - 1;
            }
        }
    }
};
</script>
