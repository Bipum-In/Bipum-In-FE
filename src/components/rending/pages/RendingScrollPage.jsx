import React, { useEffect } from 'react';
import styled from 'styled-components';

import SecondPage from './SecondPage';
import FirstPage from './FirstPage';
import ThirdPage from './ThirdPage';
import FourthPage from './FourthPage';
import FifthPage from './FifthPage';
import SixthPage from './SixthPage';
import SeventhPage from './SeventhPage';
import EighthPage from './EighthPage';
import NinthPage from './NinthPage';
import TenthPage from './TenthPage';
import EleventhPage from './EleventhPage';
export default function RendingScrollPage({
  pageIndex,
  setPageCount,
  setPageIndex,
}) {
  const pages = [
    <FirstPage setPageIndex={setPageIndex} />,
    <SecondPage />,
    <ThirdPage />,
    <FourthPage />,
    <FifthPage />,
    <SixthPage />,
    <SeventhPage />,
    <EighthPage />,
    <NinthPage />,
    <TenthPage />,
    <EleventhPage />,
  ];

  useEffect(() => {
    setPageCount(pages.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollContainer pageIndex={pageIndex}>
      {pages.map((page, index) => (
        <FadeInPage key={index} visible={index === pageIndex}>
          {page}
        </FadeInPage>
      ))}
    </ScrollContainer>
  );
}

const ScrollContainer = styled.div`
  transform: ${({ pageIndex }) => `translateY(-${pageIndex * 100}vh)`};
  transition: transform 1s ease;
  height: calc(100vh - 10.25rem);
  margin-top: 10.25rem;
`;

const FadeInPage = styled.div`
  transition: opacity 0.2s linear, transform 0.4s ease-in-out;
  height: calc(100vh - 10.25rem);
  margin-top: 10.25rem;
  width: 100%;
`;
