import { useRef } from 'react';

export const useThrottle = (callback, delay) => {
  const throttleRef = useRef(null);

  const throttledCallback = e => {
    if (!throttleRef.current) {
      throttleRef.current = true;
      setTimeout(() => {
        callback(e);
        throttleRef.current = false;
      }, delay);
    }
  };

  return throttledCallback;
};
