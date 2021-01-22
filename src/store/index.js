import Vue from 'vue';
import Vuex from 'vuex';
import vuexLocal from './persist';
import getters from './getters';
import app from './modules/app';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  plugins: [vuexLocal.plugin],

  modules: {
    app
  },

  getters,

  state: {
    // 当前登录用户
    user: null,

    // UUID
    udid: '',

    // 微信登录用户的 openid
    openId: null,

    // 微信登录用户的 token
    token: null,
  },

  mutations: {
    // 保存 user 信息
    SET_USER(state, user) {
      state.user = user;
    },
    /**
    * 在 vuex 的 strict 模式下，vuex-persist 必须调用名为 RESTORE_MUTATION 的
    * mutation 对 vuex 的状态进行修改。
    */
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
  },

  actions: {
    setUserAsync({ commit, state }, user) {
      console.log(state);
      commit('SET_USER', user);
    }
  },
});

export default store;
