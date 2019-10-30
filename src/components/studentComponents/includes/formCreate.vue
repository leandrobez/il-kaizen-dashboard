<template>
<div class="il-createt">
    <ilSnapPhoto @avatar="setPicture" />
    <div class="il-student--data">
        <form class="il-form il-form--signup il-color--light" @submit.prevent="doSignup">
            <div class="il-signup">
                <div class="il-signup--content">
                    <label for="name">Nome</label>
                    <input type="text" v-model="signup.name" class="il-add--description" placeholder="nome completo" id="name" required />
                    <label for="cpf">CPF</label>
                    <input type="text" v-model="signup.cpf" class="il-input--cpf" placeholder="seu CPF" id="cpf" required />
                    <label for="obs">Obs</label>
                    <input type="text" v-model="signup.obs" class="il-input--obs" placeholder="Observação" id="obs" />
                    <label for="from">Origem</label>
                    <input type="text" v-model="signup.origem" class="il-add--description" placeholder="Como chegou até nós" id="from" />
                    <label for="email">Email</label>
                    <input type="email" v-model="signup.email" class="il-add--description" placeholder="Email" id="email" />
                    <label for="dn">Data Nasc</label>
                    <input type="date" v-model="signup.dnasc" class="il-input--dn" placeholder="Data de Nascimento" id="dn" />
                    <label>Sexo</label>
                    <div class="il-field--radio">
                        <label for="masc">Masc</label>
                        <input type="radio" v-model="signup.genre" @click="setGenre('m')" value="masc" id="masc" />
                        <label for="fem">Fem</label>
                        <input type="radio" v-model="signup.genre" @click="setGenre('f')" id="fem" value="fem" />
                    </div>
                    <div class="il-field--select">
                        <div>
                            <label for="vezes">Vezes por Semana</label>
                            <select ref="vezes" v-model="signup.vezes" :change="setValor()" class="il-select" id="vezes">
                                <option v-for="(vez,index) in vezes" :key="index">{{vez}}</option>
                            </select>
                        </div>
                        <div>
                            <label for="valor">Valor</label>
                            <select ref="valor" v-model="signup.valor" class="il-select" id="valor">
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

                    <div class="il-field--info" v-if="showPerc">
                        <label for="perc">Percentual</label>
                        <input type="text" v-model="signup.desc.perc" class="il-add--description" placeholder="Desconto em percentual ex: 10" id="perc" />
                    </div>
                    <div class="il-field--info" v-if="showAbs">
                        <label for="abs">Valor Absoluto</label>
                        <input type="text" v-model="signup.desc.abs" class="il-add--description" placeholder="Desconto em valor absoluto Ex: 20" id="abs" />
                    </div>

                </div>
                <div class="il-signup--content">
                    <label for="cep">CEP</label>
                    <div class="il-field--cep">
                        <input type="text" v-model="signup.address.cep" class="il-input--cep" placeholder="CEP" id="cep" />
                        <i class="mdi mdi-24px mdi-search-web" @click.prevent="getAddress"></i>
                    </div>
                    <label for="">Rua / Av</label>
                    <input type="text" v-model="signup.address.rua_av" class="il-add--description" placeholder="Rua/Av">
                    <label for="nr">Nr</label>
                    <input type="text" v-model="signup.address.nr" class="il-input--nr" placeholder="NR" id="nr">
                    <label for="complemento">Complemento</label>
                    <input type="text" v-model="signup.address.complemento" class="il-add--description" placeholder="Complemento" id="complemento">
                    <label for="bairro">Bairro</label>
                    <input type="text" v-model="signup.address.suburb" class="il-add--description" placeholder="Bairro" id="bairro">
                    <label for="cidade">Cidade</label>
                    <input type="text" v-model="signup.address.city" class="il-add--description" placeholder="Cidade" id="cidade">
                    <label for="uf">UF</label>
                    <input type="text" v-model="signup.address.UF" class="il-add--description" placeholder="UF" id="uf">
                    <label for="fone">Fone</label>
                    <input type="text" v-model="signup.address.fone" class="il-add--description" placeholder="fone" id="fone">
                    <label for="cel">Celular</label>
                    <input type="text" v-model="signup.address.clr" class="il-add--description" placeholder="Celular" id="cel">
                </div>
            </div>
            <div class="il-input--info il-center">
                <button class="il-btn il-btn--add">
                    <i class="mdi mdi-24px mdi-check"></i>
                </button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import accessStudentAPI from '../../../common/apiStudent.js';
import ilSnapPhoto from '@/components/includes/snapShot.vue';
export default {
    name: 'formStudentCreate',
    components: {
        ilSnapPhoto
    },
    data() {
        return {
            vezes: [1, 2, 3],
            valors: [245, 460, 595],
            desc: 0,
            showPerc: false,
            showAbs: false,
            signup: {
                name: '',
                genre: 'fem',
                cpf: '',
                vezes: 1,
                valor: '',
                obs: 'Sem observação',
                origem: 'Orginário da Motriz',
                ativo: true,
                email: '',
                dnasc: '',
                picture: 'vai a foto',
                desc: {
                    perc: 0,
                    abs: 0
                },
                address: {
                    cep: '',
                    rua_av: '',
                    nr: '',
                    complemento: 'Sem complemento',
                    suburb: '',
                    city: '',
                    UF: '',
                    fone: '',
                    clr: ''
                }
            }
        };
    },
    mounted() {
        let vz = this.signup.vezes;
        this.signup.valor = this.valors[vz - 1];
    },
    computed: {

    },
    methods: {
        doSignup() {
            let vm = this;
            accessStudentAPI
                .create(this.signup)
                .then(res => {
                    if (res.error == null) {
                        vm.$emit('msg', {
                            type: 'success',
                            message: 'Cliente cadastrado com sucesso!'
                        });
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
        },
        setGenre(genre) {
            if (genre == 'm') {
                this.signup.genre = 'masc';
            } else {
                this.signup.genre = 'fem';
            }
        },
        setPicture(picture) {
            this.signup.picture = picture;
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
            let vz = this.signup.vezes;
            let valor = this.valors[vz - 1];
            this.signup.valor = valor;
            if (this.signup.desc.abs) {
                this.signup.valor = valor - this.signup.desc.abs;
            } else {
                if (this.signup.desc.perc) {
                    let desc = this.signup.desc.perc / 100 * valor;
                    this.signup.valor = valor - desc;
                }
            }
            this.valors[vz - 1] = this.signup.valor;
        },
        getAddress() {
            const urlCorreio = 'https://viacep.com.br/ws/';
            let cep = this.signup.address.cep;
            fetch(`${urlCorreio}${cep}/json/`).then(result => {
                if (result.status == 200 && result.statusText == 'OK') {
                    result.json().then(r => {
                        this.signup.address.suburb = r.bairro;
                        this.signup.address.rua_av = r.logradouro;
                        this.signup.address.city = r.localidade;
                        this.signup.address.UF = r.uf;
                    });
                }
            });
        }
    }
};
</script>
