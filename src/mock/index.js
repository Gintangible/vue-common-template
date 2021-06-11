import Mock from 'mockjs';
import { user } from './user';

// User
Mock.mock('/getUserInfo', 'get', user);

export default Mock;
