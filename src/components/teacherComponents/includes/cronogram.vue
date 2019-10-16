<template>
<div class="il-cronogram--body">
    <div class="il-list--hours" v-for="(time,index) in times" :key="`t${index}`">
        <div class="il-hours">
            <span>{{time.start}}:00h</span>
            <span>{{time.end}}:00h</span>
        </div>
        <div class="il-cronogram--events" :id="`cronogram${day}_${index}`" v-if="events.length > 0">
            <ul>
                <li>Aula: <span>{{events[index].details.class}}</span></li>
                <li>Alunos: <span>{{events[index].students[0]}}, {{events[index].students[1]}}, {{events[index].students[2]}}</span></li>
            </ul>
        </div>
        <div class="il-events" v-if="events.length > 0">
            <div class="il-events--students" :id="`event${day}_${index}`">
                <div class="il-form--fields">
                    <input v-model="wordSearch[index].word" @input="studentSearch(index)" required type="text" placeholder="Busque o aluno">
                    <div class="il-checks">
                        <label :for="`class_p${index}`">P</label>
                        <input type="radio" v-model="events[index].details.class" value="pilates" :id="`class_p${index}`">
                        <label :for="`class_c${index}`">C</label>
                        <input type="radio" v-model="events[index].details.class" value="corealign" :id="`class_c${index}`">
                    </div>
                </div>
                <div class="il-list--student" v-for="(student,index1) in search[index]" :key="student._id">
                    <div class="il-list--check">
                        <span>{{student.name}}</span>
                        <button @click="choiceStudent(index,index1)">
                            <i class="mdi mdi-12px mdi-check"></i>
                        </button>
                    </div>
                </div>
                <div class="il-listed--students" v-if="events[index].students.length>0">
                    <h5>Agendados - {{events[index].details.class}}</h5>
                    <ul class="il-listed">
                        <li v-for="(listed,key) in events[index].students" :key="`event_${key}`"><span>{{listed}}</span></li>
                    </ul>
                </div>
            </div>
            <button class="il-btn il-btn--schedule" @click.prevent="confirm(index)" :id="`btn-confirm${index}`">Confirmar</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'cronogram',
    props: {
        times: Array,
        day: Number
    },
    data() {
        return {
            wordSearch: '',
            search: [],
            events: [],
            wordSearch: [],
            schedule: [{
                day: null,
                events: []
            }]
        };
    },
    mounted() {
        this.makeEvents();
    },
    methods: {
        studentSearch(key) {
            let word = this.wordSearch[key].word;
            if (word.length > 4) {
                let search = this.$parent.students.filter(element => {
                    return element.name
                        .toLowerCase()
                        .includes(this.wordSearch[key].word.toLowerCase());
                });
                this.search[key] = search;
            }
        },
        makeEvents() {
            this.times.forEach((time, index) => {
                this.events.push({
                    students: [],
                    details: {
                        timeKey: index,
                        start: time.start,
                        end: time.end,
                        class: ''
                    }
                });
                this.wordSearch.push({
                    key: index,
                    word: ''
                });
            });
        },
        choiceStudent(key, key1) {
            if (this.events[key].students.length == 3) {
                alert('Você pode agendar no máximo 3 alunos por horário');
            } else {
                this.events[key].students.push(this.search[key][key1].name);
                this.wordSearch[key].word = '';
                this.search = [];
            }
        },
        confirm(key) {
            let event = this.events[key];
            const checkForm = () => {
                if (event.students.length == 0) {
                    alert('Por favor informe pelo menos um aluno por horário');
                    return false;
                }
                if (event.details.class == '') {
                    alert('Por favor informe qual o tipo de aula - pilates ou corealign');
                    return false;
                }
                return true;
            };
            //verify required inputs
            if (!checkForm()) {
                return;
            }
            const addNewSchedule = () => {
                //other day
                let newSchedule = {
                    day: this.day,
                    events: [event]
                };
                this.schedule.push(newSchedule);
            };
            let count = this.schedule.length;
            if (count == 1) {
                if (this.schedule[0].day == null) {
                    //first insertion
                    this.schedule[0].day = this.day;
                    this.schedule[0].events.push(event);
                } else {
                    if (this.schedule[0].day == this.day) {
                        //same day
                        this.schedule[0].events.push(event);
                    } else {
                        //other day
                        addNewSchedule();
                    }
                }
            } else {
                //need find day
                let scheduleIndex = this.schedule.findIndex(element => {
                    return element.day == this.day;
                });
                if (scheduleIndex && scheduleIndex != undefined) {
                    this.schedule[scheduleIndex].events.push(event);
                } else {
                    //other day
                    addNewSchedule();
                }
            }
            this.showEvent(key);
        },
        showEvent(key) {
            //show event
            const formEvent = document.getElementById('event' + this.day + '_' + key);
            formEvent.classList.add('il-hidden');
            const cronogram = document.getElementById(
                'cronogram' + this.day + '_' + key
            );
            cronogram.classList.add('il-show');
            const btnConfirm = document.getElementById('btn-confirm' + key);
            btnConfirm.disabled = true;
            this.$emit('schedule', this.schedule)
        }
    }
};
</script>
