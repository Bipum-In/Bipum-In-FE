import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as ScrollUp } from 'styles/commonIcon/scrollUp.svg';
import SecondPage from './SecondPage';
import FirstPage from './FirstPage';

export default function RendingScrollPage({
  pageIndex,
  setPageCount,
  setPageIndex,
}) {
  const pages = [<FirstPage />, <SecondPage />];

  useEffect(() => {
    setPageCount(pages.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPageCount]);

  const handleBackToFirstPage = () => {
    setPageIndex(0);
  };

  return (
    <ScrollContainer pageIndex={pageIndex}>
      {pages.map((page, index) => (
        <FadeInPage key={index} visible={index === pageIndex}>
          {page}
          {index === pages.length - 1 && (
            <ScrollToTopContainer>
              <ScrollToTopIcon onClick={handleBackToFirstPage} />
            </ScrollToTopContainer>
          )}
        </FadeInPage>
      ))}
    </ScrollContainer>
  );
}

const ScrollContainer = styled.div`
  transform: ${({ pageIndex }) => `translateY(-${pageIndex * 100}vh)`};
  /* transition: transform 0.5s ease; */
`;

const FadeInPage = styled.div`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? 'translateY(0)' : 'translateY(15px)'};
  transition: opacity 0.2s linear, transform 0.4s ease-in-out;
  height: 100vh;
  width: 100%;
`;

const ScrollToTopContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1;
`;

const ScrollToTopIcon = styled(ScrollUp)`
  width: 50px;
  height: 50px;
  color: ${props => props.theme.color.blue.brandColor6};
  cursor: pointer;
  transition: color 0.2s, opacity 0.2s, transform 0.3s;
  &:active {
    color: ${props => props.theme.color.blue.brandColor5};
    transform: scale(0.9);
  }
`;
