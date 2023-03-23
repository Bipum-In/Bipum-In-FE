import { useEffect } from 'react';

function useOutsideClick(ref, callback, condition = true) {
  useEffect(() => {
    if (!condition) return;

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback, condition]);
}

export default useOutsideClick;
