import axios from 'axios';
import QUERY from 'constants/query';
import alertModal, { alertModalButton } from 'utils/alertModal';
import { getCookie, setCookie } from 'utils/cookie';
import logout from 'utils/logout';
import mem from 'mem';

let message = null;

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      headers: {
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_SERVER_URL}`,
      },
      withCredentials: true,
      baseURL: url,
    });

    this.instance.interceptors.request.use(request => {
      if (Array.isArray(request.data)) {
        const [data, completeMessage] = request.data;
        message = completeMessage;
        return { ...request, data };
      }

      return request;
    });

    this.instance.interceptors.response.use(
      response => {
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.refresh;

        if (accessToken) {
          const [, parseToken] = accessToken.split(' ');
          setCookie(QUERY.COOKIE.COOKIE_NAME, parseToken);
        }

        if (refreshToken) {
          const [, parseToken] = refreshToken.split(' ');
          setCookie(QUERY.COOKIE.REFRESH_NAME, parseToken);
        }

        if (response.data.statusCode === 200) {
          message && alertModal(true, message, 2);
        }
        message = null;

        return response;
      },
      async error => {
        const {
          config,
          response: { status },
        } = error;

        if (status === 303 && !config.retry) {
          const accessToken = await this.#getAccessToken();
          config.retry = true;
          config.headers.Authorization = `${accessToken}`;

          return this.instance(config);
        }

        const errorMessage = error.response?.data?.errorMessage;
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

  #getAccessToken = mem(
    async () => {
      try {
        const response = await this.instance.post(
          `/api/user/reissue`, // refresh url
          '',
          {
            headers: {
              Refresh: `Bearer ${getCookie(QUERY.COOKIE.REFRESH_NAME)}`,
            },
          }
        );

        const accessToken = response.headers.authorization;

        if (accessToken) {
          const [, parseToken] = accessToken.split(' ');
          setCookie(QUERY.COOKIE.COOKIE_NAME, parseToken);
        }

        return accessToken;
      } catch (refreshError) {
        const modal = () => {
          this.post('/api/user/logout');
          alertModalButton(
            false,
            '로그인이 만료되었습니다. 다시 로그인해주세요.',
            () => {
              window.location.href = '/';
            }
          );
        };

        logout(modal);
        return Promise.reject(refreshError);
      }
    },
    { maxAge: 1000 }
  );
}
