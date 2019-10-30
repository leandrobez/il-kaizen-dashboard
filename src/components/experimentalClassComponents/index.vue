<template>
<div class="il-experimental">
    <div class="il-experimental--content">
        <form class="il-form il-form--signup il-color--light" @submit.prevent="doSignup">
            <div class="il-signup">
                <div class="il-signup--content">
                    <label for="name">Nome</label>
                    <input type="text" v-model="experimental.name" class="il-add--description" placeholder="nome completo" id="name" required />
                    <label for="phone">Fone</label>
                    <input type="text" v-model="experimental.phone" class="il-input--cpf" placeholder="Fixo ou celular com DDD" id="phone" required />
                    <label for="obs">Obs</label>
                    <input type="text" v-model="experimental.obs" class="il-input--obs" placeholder="Observação" id="obs" />
                    <label for="dc">Data Contato</label>
                    <input type="date" v-model="experimental.dtcontact" class="il-input--dn" placeholder="Data de Contato" id="dc" />
                    <label for="day">Dia solicitado</label>
                    <input type="text" v-model="experimental.day" class="il-add--description" placeholder="Dia solicitado para a aula" id="day" />
                    <label for="time">Hora solicitado</label>
                    <input type="text" v-model="experimental.time" class="il-add--description" placeholder="Hora solicitada para a aula" id="time" />
                    <label for="class">Tipo de aula </label>
                    <input type="text" v-model="experimental.class" class="il-add--description" placeholder="Tipo de aula solicitada para a aula" id="class" />
                    <label for="email">Email</label>
                    <input type="email" v-model="experimental.email" class="il-add--description" placeholder="Email" id="email" />
                    <label for="indicated">Indicação</label>
                    <input type="text" v-model="experimental.indicated" class="il-add--description" placeholder="Como chegou até nós" id="indicated" />
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
export default {
    name: 'experimentalIndex',
    data() {
        return {
            experimental: {
                name: '',
                phone: '',
                obs: '',
                dtcontact: '',
                email: '',
                time: '',
                day: '',
                class: '',
                indicated: ''
            }
        }
    }
}
</script>
