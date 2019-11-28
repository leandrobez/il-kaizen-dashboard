import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import { alert } from './alert.module';
import { admin } from './admin.module';
import { student } from './student.module';
import { payment } from './payments.module';
import { cronogram } from './cronogram.module';
import { comission } from './comission.module';
import { evaliation } from './evaliation.module';

const store = new Vuex.Store({
  modules: {
    alert,
    admin,
    student,
    payment,
    cronogram,
    comission,
    evaliation
  }
});

export default store;
