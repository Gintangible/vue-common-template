function getSearch(url) {
  let theUrl;
  if (url === undefined) {
    theUrl = window.location;
  } else if (url instanceof URL) {
    theUrl = url;
  } else {
    theUrl = new URL(url);
  }
  const { search } = theUrl;
  let result = null;
  if (search) {
    // 去除开头的 ?
    result = search.substring(1);
  }
  // 从 hash 中获取参数
  const { hash } = theUrl;
  const pos = hash.indexOf('?');
  if (pos > -1) {
    result = (result ? `${result}&` : '') + hash.substring(pos + 1);
  }
  return result;
}

export default getSearch;
