import { removeCookie } from 'utils/cookie';
import Storage from 'utils/localStorage';
import QUERY from 'constants/query';
import Axios from 'api/axios';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function logout(callback) {
  axios.post('api/user/deleteAllCookies');
  Storage.clearLocalStorage();
  callback && callback();
}
