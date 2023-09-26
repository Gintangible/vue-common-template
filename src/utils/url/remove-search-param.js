import queryString from 'query-string';
import getSearch from './get-search';
import getHash from './get-hash';

// 在当前地址的query string中删除一个参数
function removeSearchParam(name, url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }
  const base = url.origin + url.pathname;
  const hash = getHash(url);
  let search = getSearch(url);
  if (search !== null && search.length > 0) {
    const args = queryString.parse(search);
    if (args[name] !== undefined) {
      delete args[name];
      search = queryString.stringify(args);
    }
  }
  return base
    + (search === null ? '' : `?${search}`)
    + (hash === null ? '' : `#${hash}`);
}

export default removeSearchParam;
