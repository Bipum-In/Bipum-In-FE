import { removeCookie } from 'utils/cookie';
import Storage from 'utils/localStorage';
import QUERY from 'constants/query';
import Axios from 'api/axios';

export default function logout(callback) {
  const axios = new Axios(process.env.REACT_APP_SERVER_URL);
  axios.post('api/user/deleteAllCookies');
  Storage.clearLocalStorage();
  callback && callback();
}
