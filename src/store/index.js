import Vue from 'vue';
import Vuex from 'vuex';
import vuexLocal from './persist';
import getters from './getters';
import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  plugins: [vuexLocal.plugin],

  modules: {
    app,
    user,
  },

  getters,

  mutations: {
    INIT() {
      this.commit('app/INIT');
    },
    /**
    * 在 vuex 的 strict 模式下，vuex-persist 必须调用名为 RESTORE_MUTATION 的
    * mutation 对 vuex 的状态进行修改。
    */
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
  },
});

export default store;
