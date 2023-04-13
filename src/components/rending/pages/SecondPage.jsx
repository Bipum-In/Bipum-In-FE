import React from 'react';
import styled from 'styled-components';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingSecImg.svg';

export default function SecondPage() {
  return (
    <>
      <styles.Fullpage>
        <RendingWrapper>
          <RendingTopContainer>
            <Descriptiontitle>
              <span>비품을 효과적으로 관리하는 최고의 시스템,</span> 비품인!
            </Descriptiontitle>
          </RendingTopContainer>
          <RendingBottomContainer bg={RendingImg}></RendingBottomContainer>
        </RendingWrapper>
      </styles.Fullpage>
    </>
  );
}

const RendingWrapper = styled(styles.RendingWrapper)`
  flex-direction: column;
`;
const RendingTopContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  align-items: flex-end;
  padding: 0 2rem;
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
