import getParsedSearch from './get-parsed-search';

// 获取当前地址的query string
function getSearchParam(name, url) {
  const args = getParsedSearch(url);
  if (args !== undefined && args !== null
      && args[name] !== undefined && args[name] !== null) {
    return args[name];
  } else {
    return null;
  }
}

export default getSearchParam;
