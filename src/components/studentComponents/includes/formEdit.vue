<template>
<form class="il-form il-form--signup" @submit.prevent="doUpdate">
    <div class="il-signup">
        <div class="il-signup--content">
            <h5 class="il-color--darkblue">Dados Pessoais</h5>
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
                <input type="text" v-model="student.desc.perc" class="il-add--description" placeholder="Desconto em percentual ex: 10" v-if="showPerc" id="perc" />
                <label for="abs" v-if="showAbs">Valor Absoluto</label>
                <input type="text" v-model="student.desc.abs" class="il-add--description" placeholder="Desconto em valor absoluto Ex: 20" v-if="showAbs" id="abs" />
            </div>
            <label for="name">Nome</label>
            <input type="text" v-model="student.name" class="il-add--description" placeholder="nome completo" id="name" required />
            <label>Sexo</label>
            <div class="il-field--radio">
                <label for="masc">Masc</label>
                <input type="radio" v-model="student.genre" :checked="checkedM" id="masc" />
                <label for="fem">Fem</label>
                <input type="radio" v-model="student.genre" :checked="checkedF" id="fem" />
            </div>
            <label for="cpf">CPF</label>
            <input type="text" v-model="student.cpf" class="il-input--cpf" placeholder="seu CPF" id="cpf" required />
            <label for="obs">Obs</label>
            <input type="text" v-model="student.obs" class="il-input--obs" placeholder="Observação" id="obs" />
            <label for="from">Origem</label>
            <input type="text" v-model="student.origem" class="il-add--description" placeholder="Como chegou até nós" id="from" />
            <label for="email">Email</label>
            <input type="email" v-model="student.email" class="il-add--description" placeholder="Email" id="email" />
            <label for="dn">Data Nasc</label>
            <input type="date" v-model="student.dnasc" class="il-input--dn" placeholder="Data de Nascimento" id="dn" />
            <div class="il-field--select">
                <label for="vezes">Vezes</label>
                <select ref="vezes" v-model="student.vezes" :change="setValor()" class="il-select" id="vezes">
                    <option v-for="(vez,index) in vezes" :key="index">{{vez}}</option>
                </select>
                <label for="valor">Valor</label>
                <select ref="valor" v-model="student.valor" class="il-select" id="valor">
                    <option v-for="(valor,index) in valors" :key="index">{{valor}}</option>
                </select>
            </div>
        </div>
        <div class="il-signup--content">
            <h5 class="il-color--darkblue">Endereço</h5>
            <label for="cep">CEP</label>
            <div class="il-field--flex">
                <input type="text" v-model="student.address.cep" class="il-input--cep" placeholder="CEP" id="cep" />
                <i class="mdi mdi-24px mdi-search-web" @click.prevent="getAddress" title="Clique para pesquisar o endereço"></i>
            </div>
            <input type="text" v-model="student.address.rua_av" class="il-add--description" placeholder="Rua/Av">
            <label for="nr">Nr</label>
            <input type="text" v-model="student.address.nr" class="il-input--nr" placeholder="NR" id="nr">
            <label for="complemento">Complemento</label>
            <input type="text" v-model="student.address.complemento" class="il-add--description" placeholder="Complemento" id="complemento">
            <label for="bairro">Bairro</label>
            <input type="text" v-model="student.address.suburb" class="il-add--description" placeholder="Bairro" id="bairro">
            <label for="cidade">Cidade</label>
            <input type="text" v-model="student.address.city" class="il-add--description" placeholder="Cidade" id="cidade">
            <label for="uf">UF</label>
            <input type="text" v-model="student.address.UF" class="il-add--description" placeholder="UF" id="uf">
            <label for="fone">Fone</label>
            <input type="text" v-model="student.address.fone" class="il-add--description" placeholder="fone" id="fone">
            <label for="cel">Celular</label>
            <input type="text" v-model="student.address.clr" class="il-add--description" placeholder="Celular" id="cel">
        </div>
    </div>
    <div class="il-input--info il-center">
        <button class="il-btn il-btn--add">
            <i class="mdi mdi-24px mdi-check"></i>
        </button>
    </div>
</form>
</template>

<script>
import accessStudentAPI from '../../../common/apiStudent.js';
export default {
    name: 'formStudentEdit',
    props: {
        id: String
    },
    data() {
        return {
            vezes: [1, 2, 3],
            valors: [245, 460, 595],
            desc: 0,
            showPerc: false,
            showAbs: false,
            student: {
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
        this.getStudent();
    },
    computed: {
        checkedM() {
            if (this.student.genre == 'masc' || this.student.genre == 'MASC') {
                return 'checked';
            } else {
                return '';
            }
        },
        checkedF() {
            if (this.student.genre == 'fem' || this.student.genre == 'FEM') {
                return 'checked';
            } else {
                return '';
            }
        }
    },
    methods: {
        getStudent() {
            let vm = this
            if (this.id) {
                accessStudentAPI
                    .searchStudent(this.id)
                    .then(res => {
                        if (res.error == null) {
                            let dnasc = res.student.dnasc; //2019-07-09T00:00:00.000Z
                            const [dt, schema] = dnasc.split('T');
                            const [y, m, d] = dt.split('-');
                            res.dnasc = `${y}-${m}-${d}`;
                            this.student.name = res.student.name;
                            this.student.obs = res.student.obs;
                            this.student.cpf = res.student.cpf;
                            this.student.email = res.student.email;
                            this.student.genre = res.student.genre;
                            this.student.valor = res.student.valor;
                            this.student.vezes = res.student.vezes;
                            this.student.origem = res.student.origem;
                            this.student.desc.ativo = res.student.desc.ativo;
                            this.student.desc.abs = res.student.desc.abs;
                            this.student.desc.perc = res.student.desc.perc;
                            this.student.address.cep = res.student.address.cep;
                            this.student.address.city = res.student.address.city;
                            this.student.address.clr = res.student.address.clr;
                            this.student.address.fone = res.student.address.fone;
                            this.student.address.complemento = res.student.address.complemento;
                            this.student.address.cep = res.student.address.cep;
                            this.student.address.nr = res.student.address.nr;
                            this.student.address.rua_av = res.student.address.rua_av;
                            this.student.address.suburb = res.student.address.suburb;
                            this.student.address.UF = res.student.address.UF;

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
                            message: err
                        });
                    });
            }
        },
        doUpdate() {
            let vm = this;
            accessStudentAPI
                .updateStudent(this.id, this.student)
                .then(res => {
                    if (res.data.error == '') {
                        vm.$emit('msg', {
                            type: 'success',
                            message: 'O presente aluno/s teve sua conta modificada com sucesso!'
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
                        type: 'warning',
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
            let vz = this.student.vezes;
            let valor = this.valors[vz - 1];
            this.student.valor = valor;
            if (this.student.desc.abs) {
                this.student.valor = valor - this.student.desc.abs;
            } else {
                if (this.student.desc.perc) {
                    let desc = this.student.desc.perc / 100 * valor;
                    this.student.valor = valor - desc;
                }
            }
            this.valors[vz - 1] = this.student.valor;
        },
        getAddress() {
            const urlCorreio = 'https://viacep.com.br/ws/';
            let cep = this.student.address.cep;
            fetch(`${urlCorreio}${cep}/json/`).then(result => {
                if (result.status == 200 && result.statusText == 'OK') {
                    result.json().then(r => {
                        this.student.address.suburb = r.bairro;
                        this.student.address.rua_av = r.logradouro;
                        this.student.address.city = r.localidade;
                        this.student.address.UF = r.uf;
                    });
                }
            });
        }
    }
};
</script>
