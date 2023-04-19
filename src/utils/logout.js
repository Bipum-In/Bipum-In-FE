import Storage from 'utils/localStorage';
import { api } from 'api/axios';

export default function logout(callback) {
  api.post('api/user/deleteAllCookies');
  Storage.clearLocalStorage();
  callback && callback();
}
