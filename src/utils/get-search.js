/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 获取当前地址的query string
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.njzhyl.cn/insurance/#/finish?params=xxx
 *
 * @param {String|URL} url
 *     可选，表示待解析的URL地址。若无此参数则使用 window.location.href。
 * @return {String}
 *     URL地址中的query string，不包含?，也不解析其中的参数，也不对URL编码的参数
 *     进行解码。若不存在query string参数，则返回null.
 * @author 胡海星
 */
function getSearch(url) {
  let theUrl;
  if (url === undefined) {
    theUrl = window.location;
  } else if (url instanceof URL) {
    theUrl = url;
  } else {
    theUrl = new URL(url);
  }
  const search = theUrl.search;
  let result = null;
  if (search) {
    // 去除开头的 ?
    result = search.substring(1);
  }
  // 从 hash 中获取参数
  const hash = theUrl.hash;
  const pos = hash.indexOf('?');
  if (pos > -1) {
    result = (result ? `${result}&` : '') + hash.substring(pos + 1);
  }
  return result;
}

export default getSearch;
