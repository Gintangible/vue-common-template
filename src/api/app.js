import request from '@/utils/request';

const appApi = {
  getUserInfo: () => request({
    url: '/getUserInfo',
    method: 'get',
    loading: true,
  })
};

export default appApi;
