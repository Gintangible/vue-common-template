// mock user 数据
import Mock from 'mockjs';

const { Random } = Mock;

export const user = {
  code: 200,
  data: {
    token: Random.id(),
  }
};
