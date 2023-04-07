import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as ScrollUp } from 'styles/commonIcon/scrollUp.svg';
import styled from 'styled-components';

const ScrollToTop = ({ targetSelector }) => {
  const [visible, setVisible] = useState(false);
  const targetRef = useRef(null);

  const toggleVisibility = () => {
    const target = targetRef.current;

    if (target && target.scrollTop > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    const target = document.querySelector(targetSelector);

    if (target) {
      targetRef.current = target;
      target.addEventListener('scroll', toggleVisibility);
    }

    return () => {
      if (target) {
        target.removeEventListener('scroll', toggleVisibility);
      }
    };
  }, [targetSelector]);

  const handleScrollToTop = () => {
    const target = targetRef.current;
    if (target) {
      setVisible(false);
      target.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <ScrollToTopContainer>
      <ScrollToTopIcon onClick={handleScrollToTop} data-visible={visible} />
    </ScrollToTopContainer>
  );
};

export default ScrollToTop;

const ScrollToTopContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 85px;
  z-index: 1;
`;

const ScrollToTopIcon = styled(ScrollUp)`
  width: 50px;
  height: 50px;
  color: ${props => props.theme.color.blue.brandColor6};
  cursor: pointer;
  transition: color 0.2s, opacity 0.2s, transform 0.3s;
  filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.269));
  opacity: ${({ 'data-visible': visible }) => (visible ? 1 : 0)};
  transform: ${({ 'data-visible': visible }) =>
    visible ? 'translateY(0)' : 'translateY(5rem)'};
  &:active {
    transform: scale(0.9);
  }
  :hover {
    transform: scale(1.1);
    svg {
      filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.269));
    }
  }
`;
