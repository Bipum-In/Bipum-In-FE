import axios from 'axios';
import QUERY from '../constants/query';
import { getCookie, setCookie } from '../utils/cookie';

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
    });

    this.instance.interceptors.response.use(
      response => {
        console.log(response);
        // const token = response.headers.authorization;

        return response;
      },
      error => {
        const token =
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkanhvcjAwN0BuYXZlci5jb20iLCJhdXRoIjoiQURNSU4iLCJleHAiOjE3MTA1ODg0MTEsImlhdCI6MTY3OTA1MjQxMX0.GyXlo7KJzz1VBNEzNPSK_OIeSJfeHGcbUABi8XC9Kh4';
        if (token) {
          const [, parseToken] = token.split(' ');
          setCookie(QUERY.COOKIE.COOKIE_NAME, parseToken);
        }
        alert(error.response.data.result);
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
