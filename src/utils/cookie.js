import Cookies from 'js-cookie';
import QUERY from 'constants/query';

const setCookie = (name, value, option) => {
  const expires = new Date();

  name === QUERY.COOKIE.COOKIE_NAME
    ? expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000)
    : expires.setTime(expires.getTime() + 31 * 24 * 60 * 60 * 1000);
  return Cookies.set(name, value, {
    path: '/',
    //httpOnly: true, //서버에서만 쿠키를 읽을 수 있음
    expires,
  });
};

const getCookie = name => {
  return Cookies.get(name);
};

const removeCookie = (name, option) => {
  return Cookies.remove(name, { ...option });
};

export { setCookie, getCookie, removeCookie };
