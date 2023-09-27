import { login } from '@/api/user';
import Person from '@/models/Person';
import { setAuthToken } from '@/services/auth';

const state = {
  // 用户信息
  user: new Person(),
};

const mutations = {
  INIT(state) {
    if (state.user) {
      state.user = Person.create(state.user);
    }
  },
  SET_USER(state, obj) {
    const user = Person.create(obj);
    if (user) {
      user.refreshGenderBirthday();
    }
    state.user = user;
  },
};
const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      login(user).then((res) => {
        setAuthToken(res.token);
        commit('SET_USER', user);
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
