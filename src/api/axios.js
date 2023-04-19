import axios from 'axios';
import alertModal, { alertModalButton } from 'utils/alertModal';
import logout from 'utils/logout';
import mem from 'mem';

const requestInterceptor = request => {
  if (Array.isArray(request.data)) {
    const [data, completeMessage] = request.data;
    request.message = completeMessage;
    request.data = data;
  }

  return request;
};

const responseInterceptor = response => {
  if (response.data.statusCode === 200 && response.config.message) {
    alertModal(true, response.config.message, 2);
  }
  response.config.message = null;
  return response;
};

const responseInterceptorError = async (error, instance) => {
  const {
    config,
    response: { status },
  } = error;

  if (status === 303 && !config.retry) {
    await getAccessToken(instance);
    config.retry = true;
    return instance(config);
  }

  const errorMessage = error.response?.data?.errorMessage;
  errorMessage && alertModal(false, errorMessage, 3);
  config.message = null;
  return Promise.reject(error);
};

const getAccessToken = mem(
  async instance => {
    try {
      await instance.post(`/api/user/reissue`);
    } catch (refreshError) {
      const modal = () => {
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

const createAxiosInstance = timeoutSecond => {
  const instance = axios.create({
    withCredentials: true,
    baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    timeout: timeoutSecond * 1000 || 10000000,
  });

  instance.interceptors.request.use(requestInterceptor);

  instance.interceptors.response.use(responseInterceptor, error =>
    responseInterceptorError(error, instance)
  );

  return instance;
};

export const api = {
  get: (path, timeoutSecond) => createAxiosInstance(timeoutSecond).get(path),
  post: (path, payload, timeoutSecond) =>
    createAxiosInstance(timeoutSecond).post(path, payload),
  delete: (path, timeoutSecond) =>
    createAxiosInstance(timeoutSecond).delete(path),
  put: (path, payload, timeoutSecond) =>
    createAxiosInstance(timeoutSecond).put(path, payload),
};
