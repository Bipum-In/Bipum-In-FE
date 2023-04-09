import { useCallback, useEffect, useRef } from 'react';

const useOutsideClick = (onClickOutside, desktopSize = true) => {
  const ref = useRef(null);

  const handleClick = useCallback(
    e => {
      if (!ref.current || !desktopSize) return;
      const inside = ref.current.contains(e.target);

      if (inside) return;
      onClickOutside();
    },
    [onClickOutside, ref, desktopSize]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return ref;
};

export default useOutsideClick;
