import React from 'react';
import styled from 'styled-components';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingThrImg.png';

export default function ThirdPage() {
  return (
    <>
      <styles.Fullpage>
        <RendingWrapper>
          <styles.RendingTopContainer center>
            <Descriptiontitle>
              <span>모드 전환 기능</span>
              <span>관리자와 유저모드 전환이 가능해요</span>
            </Descriptiontitle>
          </styles.RendingTopContainer>
          <styles.RendingBottomContainer
            bg={RendingImg}
            small
          ></styles.RendingBottomContainer>
        </RendingWrapper>
      </styles.Fullpage>
    </>
  );
}

const RendingWrapper = styled(styles.RendingWrapper)`
  justify-content: center;
  align-items: center;
`;

const Descriptiontitle = styled.div`
  ${props => props.theme.FlexCol};
  color: ${props => props.theme.color.blue.brandColor6};
  font-size: 1.5rem;
  gap: 1rem;
  span:first-child {
    font-weight: 700;
    font-size: 2.5rem;
  }
`;
