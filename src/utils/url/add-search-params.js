import qs from 'query-string';
import getSearch from './get-search';
import getHash from './get-hash';

function addSearchParams(params, url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }
  const base = url.origin + url.pathname;
  let hash = getHash(url);
  if (hash == null) {
    hash = '';
  } else {
    hash = `#${hash}`;
  }
  const kv = qs.stringify(params);
  let search = getSearch(url);
  if (search !== null && search.length > 0) {
    search = `${search}&${kv}`;
  } else {
    search = kv;
  }
  return `${base}?${search}${hash}`;
}

export default addSearchParams;
