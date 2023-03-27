import { getCookie } from './cookie';
import QUERY from '../constants/query';

const isLogin = getCookie(QUERY.COOKIE.COOKIE_NAME);
export default isLogin;
