import { useRef, useCallback, useEffect } from 'react';

export default function useDebouncedCallback(callback, delay, eventType) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    if (eventType) {
      window.addEventListener(eventType, debouncedCallback, { passive: false });
      return () => {
        window.removeEventListener(eventType, debouncedCallback);
        clearTimeout(timeoutRef.current);
      };
    } else {
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }
  }, [eventType, debouncedCallback]);

  return debouncedCallback;
}
