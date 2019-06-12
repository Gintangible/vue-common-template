import fetch from '@/utils/fetch';

// 账号退出
export const logout = () =>
    fetch({
        url: '/api',
        method: 'get'
    });