import Vue from 'vue';
import Vuex from 'vuex';
import vuexLocal from './persist';
import utils from './utils';
import getters from './getters';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  plugins: [vuexLocal.plugin],

  modules: {
    user,
  },

  getters,

  state: {
    // UUID
    udid: '',
  },

  mutations: {
    init(state) {
      utils.initStateWithSearch(state);           // 根据querystring初始化state
      utils.initStateWithDefaultSettings(state);  // 根据默认设置初始化state
      utils.restoreState(state);                  // 从 localStorage 中恢复状态
    },
    /**
    * 在 vuex 的 strict 模式下，vuex-persist 必须调用名为 RESTORE_MUTATION 的
    * mutation 对 vuex 的状态进行修改。
    */
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
  },
});

export default store;
