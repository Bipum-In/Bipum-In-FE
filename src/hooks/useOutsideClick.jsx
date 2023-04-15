import { useCallback, useEffect, useRef } from 'react';

const useOutsideClick = (onClickOutside, useOutside = false) => {
  const ref = useRef(null);

  const handleClick = useCallback(
    e => {
      if (!ref.current || !useOutside) return;
      const inside = ref.current.contains(e.target);

      if (inside) return;
      onClickOutside();
    },
    [onClickOutside, ref, useOutside]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return ref;
};

export default useOutsideClick;
