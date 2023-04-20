import { useCallback, useEffect, useRef, useState } from 'react';
import useDebouncedCallback from './useDebouncedCallback';

export default function useResizeGetPageSize() {
  const containerRef = useRef(null);
  const containerHeaderRef = useRef(null);
  const listHeaderRef = useRef(null);
  const listRef = useRef(null);

  const [listSize, setListSize] = useState(null);

  const listSizeRef = useRef(0);
  const checkRender = useRef(false);

  const handleResize = useCallback(() => {
    const containerH = containerRef.current.clientHeight;
    const containerHeaderH = containerHeaderRef.current.clientHeight;
    const listHeaderH = listHeaderRef.current.clientHeight;
    const itemH = listRef.current.firstChild.clientHeight;
    const pageBar = 80;
    const size = calculateSize(
      containerH,
      containerHeaderH,
      listHeaderH,
      pageBar,
      itemH
    );

    if (checkRender.current) {
      setListSize(size <= 0 ? 1 : size);
    } else {
      const calcSize = size <= 0 ? 1 : size;

      listSizeRef.current = calcSize;
      checkRender.current = true;

      return calcSize;
    }
  }, [listRef]);

  const calculateSize = (
    containerH,
    containerHeaderH,
    listHeaderH,
    pageBar,
    itemH
  ) => {
    let calculateSize =
      (containerH - containerHeaderH - listHeaderH - pageBar) / itemH;
    return calculateSize.toFixed(2) % 1 > 0.5
      ? Math.floor(calculateSize)
      : Math.floor(calculateSize) - 1;
  };

  useDebouncedCallback(handleResize, 100, 'resize');

  return [
    {
      containerRef,
      containerHeaderRef,
      listHeaderRef,
      listRef,
    },
    listSize,
    listSizeRef.current,
    handleResize,
  ];
}
