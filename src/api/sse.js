import QUERY from 'constants/query';
import { getCookie } from 'utils/cookie';
import { EventSourcePolyfill } from 'event-source-polyfill';

export default class SSE {
  #eventSource;
  constructor(url, timeoutMinute) {
    this.#eventSource = new EventSourcePolyfill(url, {
      heartbeatTimeout: timeoutMinute ? timeoutMinute * 60 * 1000 : 60 * 1000,
    });
  }

  onOpen = callback => {
    this.#eventSource.onopen = event => {
      callback(event);
    };
  };

  onMessage = callback => {
    this.#eventSource.onmessage = event => {
      callback(event);
    };
  };

  onError = callback => {
    this.#eventSource.onerror = event => {
      callback(event);
    };
  };

  close = () => {
    this.#eventSource.close();
  };
}
