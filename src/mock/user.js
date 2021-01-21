
// mock user 数据
import Mock from 'mockjs';
const { Random } = Mock;

export const user = {
  name: Random.cname(),
  IDCard: Random.id(),
};
