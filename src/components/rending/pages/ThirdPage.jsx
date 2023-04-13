import React from 'react';
import styled from 'styled-components';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingThrImg.svg';

export default function ThirdPage() {
  return (
    <>
      <styles.Fullpage>
        <styles.RendingWrapper>
          <RendingTopContainer>
            <Descriptiontitle>
              <span>모드 전환 기능</span> 관리자와 유저모드 전환이 가능해요
            </Descriptiontitle>
          </RendingTopContainer>
          <RendingBottomContainer bg={RendingImg}></RendingBottomContainer>
        </styles.RendingWrapper>
      </styles.Fullpage>
    </>
  );
}

const RendingTopContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  align-items: flex-end;
  padding: 0 2rem;
  height: 13.5rem;
`;

const Descriptiontitle = styled.span`
  color: ${props => props.theme.color.blue.brandColor6};
  font-size: 2rem;
  span {
    font-weight: 700;
  }
`;

const RendingBottomContainer = styled.div`
  position: relative;
  height: calc(100vh - 14.5rem);
  width: 100%;
  background: url(${props => props.bg}) no-repeat center center/contain;
`;
