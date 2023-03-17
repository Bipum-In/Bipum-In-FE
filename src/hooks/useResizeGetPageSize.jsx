import { useCallback, useEffect, useRef, useState } from 'react';

export default function useResizeGetPageSize() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const containerHeaderRef = useRef(null);
  const listHeaderRef = useRef(null);
  const listRef = useRef(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [listSize, setListSize] = useState(1);

  const handleResize = useCallback(() => {
    const containerH = containerRef.current.clientHeight;
    const headerH = headerRef.current.clientHeight;
    const containerHeaderH = containerHeaderRef.current.clientHeight;
    const listHeaderH = listHeaderRef.current.clientHeight;
    const itemH = listRef.current.firstChild.clientHeight;
    const pageBar = 50;

    const size = calculateSize(
      containerH,
      headerH,
      containerHeaderH,
      listHeaderH,
      pageBar,
      itemH
    );

    setListSize(size <= 0 ? 1 : size);
  }, [listRef]);

  const calculateSize = (
    containerH,
    headerH,
    containerHeaderH,
    listHeaderH,
    pageBar,
    itemH
  ) => {
    let calculateSize =
      (containerH - headerH - containerHeaderH - listHeaderH - pageBar) / itemH;
    return calculateSize.toFixed(2) % 1 > 0.5
      ? Math.floor(calculateSize)
      : Math.floor(calculateSize) - 1;
  };

  const throttledHandleResize = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(setTimeout(handleResize, 100));
  }, [handleResize, timeoutId]);

  useEffect(() => {
    window.addEventListener('resize', throttledHandleResize);
    return () => window.removeEventListener('resize', throttledHandleResize);
  }, [throttledHandleResize]);

  return [
    containerRef,
    headerRef,
    containerHeaderRef,
    listHeaderRef,
    listRef,
    listSize,
    handleResize,
  ];
}