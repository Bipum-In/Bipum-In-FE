import Storage from 'utils/localStorage';
import { api } from 'api/axios';
import QUERY from 'constants/query';

export default async function logout(callback) {
  try {
    await api.post(QUERY.END_POINT.USER.LOGOUT);
    await api.post(QUERY.END_POINT.USER.DELETE_ALL_COOKIES);
    Storage.clearLocalStorage();
    callback && callback();
  } catch (e) {
    Storage.clearLocalStorage();
    window.location.href = '/';
  }
}
