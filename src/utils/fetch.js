import axios from 'axios';
import store from '@/store';

// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            console.log('获取到token');
            config.headers['X-Token'] = store.state.token; // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        // Do something before request is sent
        return config;
    },
    error => {
        // Do something with request error
        console.log('request: ' + error); // for debug
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code != 200) {
            store.dispatch('FedLogout').then(() => {
                location.reload();
            });
            return Promise.reject('error');
        } else {
            return response.data;
        }
    },
    error => {
        console.log('response: ' + error); // for debug
        return Promise.reject(error);
    }
);

export default service;