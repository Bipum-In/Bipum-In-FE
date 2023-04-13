import React from 'react';
import styled from 'styled-components';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingElevenImg.png';
import UseageTitle from '../UseageTitle';
import { ReactComponent as ScrollUp } from 'styles/commonIcon/scrollUp.svg';

export default function EleventhPage({ onclick }) {
  return (
    <>
      <styles.Fullpage>
        <styles.RendingWrapper reverse>
          <styles.RendingTopContainer>
            <UseageTitle num="❹">
              회사에 등록된 비품 재고를
              <br />
              쉽게 확인할 수 있어요
            </UseageTitle>
          </styles.RendingTopContainer>
          <styles.RendingBottomContainer
            bg={RendingImg}
          ></styles.RendingBottomContainer>
          <ScrollToTopContainer>
            <ScrollToTopIcon onClick={onclick} />
          </ScrollToTopContainer>
        </styles.RendingWrapper>
      </styles.Fullpage>
    </>
  );
}

const ScrollToTopContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 10px;
  z-index: 1;
`;

const ScrollToTopIcon = styled(ScrollUp)`
  width: 50px;
  height: 50px;
  color: ${props => props.theme.color.blue.brandColor6};
  cursor: pointer;
  transition: color 0.2s, opacity 0.2s, transform 0.3s;
  filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.269));
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
