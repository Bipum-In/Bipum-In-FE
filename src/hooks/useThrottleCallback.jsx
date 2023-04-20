import { useCallback, useEffect, useRef } from 'react';

export default function useThrottleCallback(callback, delay, eventType) {
  const throttleRef = useRef(null);

  const throttledCallback = useCallback(
    e => {
      if (!throttleRef.current) {
        throttleRef.current = true;
        callback(e);
        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );

  useEffect(() => {
    if (eventType) {
      window.addEventListener(eventType, throttledCallback, { passive: false });
      return () => {
        window.removeEventListener(eventType, throttledCallback);
        clearTimeout(throttleRef.current);
      };
    } else {
      return () => {
        clearTimeout(throttleRef.current);
      };
    }
  }, [eventType, throttledCallback]);

  return throttledCallback;
}
