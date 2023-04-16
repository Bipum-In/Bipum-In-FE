import { removeCookie } from 'utils/cookie';
import Storage from 'utils/localStorage';
import QUERY from 'constants/query';

export default function logout(callback) {
  removeCookie(QUERY.COOKIE.COOKIE_NAME);
  removeCookie(QUERY.COOKIE.REFRESH_NAME);
  Storage.clearLocalStorage();
  callback && callback();
}
