import Mock from 'mockjs';
import userAPI from './user';

// User
Mock.mock(/api/, 'get', userAPI.api);

export default Mock;