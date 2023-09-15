/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import queryString from 'query-string';
import getSearch from './get-search';

/**
 * 获取当前地址的query string，并将其解析为对象返回。
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.njzhyl.cn/insurance/#/finish?params=xxx
 *
 * @param {String|URL} url
 *     可选，表示待解析的URL地址。若无此参数则使用 window.location.href。
 * @return {Object}
 *     URL地址中的query string所解析的对象。若不存在query string参数，则返回null。
 * @author 胡海星
 */
function getParsedSearch(url) {
  const search = getSearch(url);
  if (search === null) {
    return null;
  }
  return queryString.parse(search);
}

export default getParsedSearch;
