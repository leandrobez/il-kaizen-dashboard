<template>
<div class="il-months">
    <div class="il-months--box" v-for="(m,index) in months" :key="m.abr" :id="`month_${index}`">
        <span @click.prevent="choiceMonth(index)">{{m.abr}}</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'monthGrid',
    props: {
        months: Array
    },
    data() {
        return {
            keyActive: 0
        }
    },
    mounted() {
        this.setCurrentMonth()
    },
    methods: {
        setCurrentMonth() {
            let today = new Date()
            this.keyActive = today.getMonth()
            let monthActived = document.querySelectorAll('.il-months--box')
            monthActived.forEach((element, index) => {
                element.classList.remove('actived')
                if (index == this.keyActive) {
                    element.classList.add('actived')
                }
            });
            this.$emit('choice', this.keyActive);
        },
        choiceMonth(key) {
            this.keyActive = key
            let monthActived = document.querySelectorAll('.il-months--box')
            monthActived.forEach((element, index) => {
                element.classList.remove('actived')
                if (index == key) {
                    element.classList.add('actived')
                }
            });
            this.$emit('choice', key);
        }
    }
};
</script>
