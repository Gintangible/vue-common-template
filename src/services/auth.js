import Cookies from 'js-cookie';

const TokenKey = 'access_token';

export function getAuthToken() {
  return Cookies.get(TokenKey);
}

export function setAuthToken(token) {
  Cookies.set(TokenKey, token, {
    expires: 7,
  });
}

export function removeAuthToken() {
  Cookies.remove(TokenKey);
}
