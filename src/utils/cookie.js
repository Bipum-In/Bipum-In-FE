import Cookies from 'js-cookie';

const setCookie = (name, value) => {
  return Cookies.set(name, value, {
    path: '/',
  });
};

const getCookie = name => {
  return Cookies.get(name);
};

const removeCookie = (name, option) => {
  return Cookies.remove(name, { ...option });
};

export { setCookie, getCookie, removeCookie };
