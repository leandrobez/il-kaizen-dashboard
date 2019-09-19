import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import { alert } from './alert.module';
import { admin } from './admin.module';
import { student } from './student.module';
import { payment } from './payments.module';
import { cronogram } from './cronogram.module';
/*
import { fixes } from './fixed.module';
import { extras } from './extras.module';
import { variables } from './variables.module';

import { payCash } from './paymentCash.module';
import { expenses } from './expenses.module';

import { admins } from './admin.module'
*/
const store = new Vuex.Store({
  modules: {
    alert,
    admin,
    student,
    payment,
    cronogram
    /*fixes,
    variables,
    extras,
    payCheck,
    payCash,
    expenses,
    admins*/
  }
});

export default store;
