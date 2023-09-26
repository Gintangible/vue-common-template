import queryString from 'query-string';
import getSearch from './get-search';

function getParsedSearch(url) {
  const search = getSearch(url);
  if (search === null) {
    return null;
  }
  return queryString.parse(search);
}

export default getParsedSearch;
