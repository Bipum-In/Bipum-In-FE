import React, { useState, useEffect } from 'react';
import RendingHeader from '../components/rending/RendingHeader';
import RendingDots from '../components/rending/RendingDots';
import RendingScrollPage from '../components/rending/pages/RendingScrollPage';

export default function Rending() {
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const handleScroll = e => {
      if (e.deltaY > 0 && pageIndex < totalPages - 1) {
        setPageIndex(prevIndex => prevIndex + 1);
      } else if (e.deltaY < 0 && pageIndex > 0) {
        setPageIndex(prevIndex => prevIndex - 1);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    // 언마운트/업데이트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [pageIndex, totalPages]);

  return (
    <>
      <RendingHeader />
      <RendingScrollPage
        pageIndex={pageIndex}
        setPageCount={setTotalPages}
        setPageIndex={setPageIndex}
      />
      <RendingDots
        pageIndex={pageIndex}
        totalPages={totalPages}
        setPageIndex={setPageIndex}
      />
    </>
  );
}
