import React from 'react';
import styled from 'styled-components';
import { styles } from './RendingPageStyled';
import Rending01 from 'styles/rendingIcon/rendingFirstImg.svg';
import Button from 'elements/Button';

export default function FirstPage() {
  return (
    <>
      <styles.Fullpage>
        <RendingWrapper>
          <RendingLeftContainer>
            <Description>세상에서 가장 쉬운 비품관리</Description>
            <CompanyTitle>비품인</CompanyTitle>
            <Button submit>알아보기</Button>
          </RendingLeftContainer>
          <RendingRightContainer bg={Rending01} />
        </RendingWrapper>
      </styles.Fullpage>
    </>
  );
}

const RendingWrapper = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  ${props => props.theme.wh100};
  padding: 1rem 2rem;
`;

const RendingLeftContainer = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: center;
  align-items: flex-start;
  margin-right: 4rem;
  color: ${props => props.theme.color.blue.brandColor6};
`;

const RendingRightContainer = styled.div`
  margin-top: 5rem;
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  background: url(${props => props.bg}) no-repeat center center/contain;
  width: 44.6875rem;
  height: 44.375rem;
`;
const Description = styled.span`
  font-size: 3rem;
  margin-bottom: 1.0625rem;
`;

const CompanyTitle = styled.span`
  font-size: 4.375rem;
  font-weight: 700;
  margin-bottom: 3.5625rem;
`;
