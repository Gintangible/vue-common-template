// 获取当前地址的hash.

function getHash(url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }
  let { hash } = url;
  if (hash.length === 0) {
    // work around for a special case: http://www.baidu.com/?source=xxx#
    const { href } = url;
    if (href.length > 0 && href.charAt(href.length - 1) === '#') {
      return '';
    }
    return null;
  }
  // 去除开头的 #
  hash = hash.substring(1);
  // 去除hash中的?后面的query string参数
  const pos = hash.indexOf('?');
  if (pos >= 0) {
    hash = hash.substring(0, pos);
  }
  return hash;
}

export default getHash;
