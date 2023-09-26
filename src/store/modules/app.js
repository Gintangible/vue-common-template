import UUID from 'uuidjs';
import config from '@/config';
import getParsedSearch from '@/utils/url/get-parsed-search';

const state = {
  // UUID
  udid: '',
};

const mutations = {
  INIT(state) {
    console.info('utils.initStateWithSearch');
    /* eslint-disable */
    let args = getParsedSearch();
    /* eslint-enable */
    if (!args) {
      console.warn('No query string arguments found.');
      return;
    }
    console.debug('args = ', args);
    // 当前渠道来源
    state.source = args.source || config.default_source;

    if (!state.udid) {
      state.udid = UUID.generate();
    }
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
