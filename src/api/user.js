import request from '@/utils/request';

const userApi = {
  login: () => request({
    url: '/getUserInfo',
    method: 'get',
  })
};

export default userApi;
