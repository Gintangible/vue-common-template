import Cookies from 'js-cookie';
import { login } from '@/api/user';
import Person from '@/models/Person';

const state = {
  // 用户信息
  user: new Person(),

  // 用户token
  token: Cookies.get('token'),
};
const mutations = {
  SET_USER(state, obj) {
    const user = Person.create(obj);
    if (user) {
      user.refreshGenderBirthday();
    }
    state.user = user;
  },
  SET_TOKEN(state, token) {
    Cookies.set('token', token, {
      expires: 7,
    });
  }
};
const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      login(user).then(() => {
        const data = {
          token: 'test_token',
          user: {
            name: 'gintanbile',
          }
        };
        commit('SET_TOKEN', data.token);
        commit('SET_USER', data.user);
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
