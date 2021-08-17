import api from '../services/api.js';
import { Account } from '@utils/types';
import _get from 'lodash/get';

const state = () => ({
  accountInfo: undefined
});

const mutations = {
  setAccountInfo: (state, v) => (state.accountInfo = v)
};

const getters = {
  getNickname(state) {
    return _get(state, 'accountInfo.nickname', '');
  },
  isLogin(state) {
    if (state.accountInfo) return true;
    return false;
  }
};

const actions = {
  initAccount({ dispatch }) {
    // dispatch('login');
  },

  async login({ commit }, { username, password }) {
    if (!username && !password) return;

    const res = await api.post('account/login', { username, password });
    const errorCode = _get(res, 'errorCode');

    if (errorCode) return res;

    const accountInfo: Account = _get(res, 'result.accountInfo');

    if (accountInfo) {
      commit('setAccountInfo', accountInfo);
    }

    return res;
  },

  handleMessage({ state }, args) {
    console.log('account handleMessage', state, args);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
