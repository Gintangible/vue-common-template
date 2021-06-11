import config from '@/config';

const utils = {
  // 根据 querystring 参数初始化状态。
  initStateWithSearch(state) {
    console.info('utils.initStateWithSearch');
    /* eslint-disable */
    let args = location.search;
    /* eslint-enable */
    if (!args) {
      console.warn('No query string arguments found.');
      return;
    } else {
      args = JSON.parse(args.slice(1));
    }
    console.debug('args = ', args);
    // 当前渠道来源
    if (args.source) {
      state.source = args.source;
    }
  },

  // 根据默认设置初始化状态。
  initStateWithDefaultSettings(state) {
    if (!state.source) {
      state.source = config.default_source;
    }
  },

  /**
   * 恢复状态对象。
   *
   * 此函数将状态中一些领域对象数据创建为对应的prototype。
   */
  restoreState(state) {
    // 需要恢复状态中的一些对象，从而可以调用这些对象的方法
    if (state.user.user) {
      state.user.user = 'gintangible';
    } else {
      state.user.user = '';
    }
    return state;
  },
};

export default utils;
