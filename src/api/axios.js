import axios from 'axios';
import QUERY from 'constants/query';
import alertModal from 'utils/alertModal';
import { getCookie, setCookie } from 'utils/cookie';

let message = null;

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
    });

    this.instance.interceptors.request.use(request => {
      if (Array.isArray(request.data)) {
        const [data, completeMessage] = request.data;
        message = completeMessage;
        return { ...request, data };
      } else {
        return request;
      }
    });

    this.instance.interceptors.response.use(
      response => {
        const token = response.headers.authorization;

        if (token) {
          const [, parseToken] = token.split(' ');
          setCookie(QUERY.COOKIE.COOKIE_NAME, parseToken);
        }

        if (response.data.statusCode === 200) {
          message && alertModal(true, message, 2);
          message = null;
        }

        return response;
      },
      error => {
        const errorMessage = error.response.data.errorMessage;
        errorMessage && alertModal(false, errorMessage, 2);
        message = null;
        return Promise.reject(error);
      }
    );
  }

  async get(path) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.get(path, option);
  }

  async post(path, payload) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.post(path, payload, option);
  }

  async delete(path) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.delete(`${path}`, option);
  }

  async put(path, payload) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.put(`${path}`, payload, option);
  }
}
