// 设置页面的title
import config from '@/config';

export default function setPageTitle(title) {
  document.title = title || config.title;
}
