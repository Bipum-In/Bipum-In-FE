import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { styleds } from './AdminDashBaordStyled';
import { Keyframe } from 'styles/keyframes';

import useageImg from 'styles/commonIcon/useage.svg';
import Button from 'elements/Button';
import AnchorBtn from '../AnchorBtn';
import ROUTER from 'constants/routerConst';
import UseageStar from '../UseageStar';

export default function UseageCard({ isAdmin }) {
  const navigate = useNavigate();

  return (
    <>
      <styleds.EquipmentTopContainer useage>
        <AnchorBtn disabled>ㅤ</AnchorBtn>
        <UseageContainer>
          <RoketWrapper>
            <RokentContainer>
              <UseageStar />
            </RokentContainer>
          </RoketWrapper>
          <UseageTitleContainer>
            <h1>Bipum-In 소개</h1>
            <span>효율적인 비품 관리의 사작! 비품인에 대해 알아볼까요?</span>
          </UseageTitleContainer>
          <UseageBtnContainer>
            <Button
              onClick={() =>
                navigate(
                  `${ROUTER.PATH.MAIN}?${
                    isAdmin ? 'pageIndex=3' : 'pageIndex=7'
                  }`
                )
              }
            >
              더 알아보기
            </Button>
          </UseageBtnContainer>
        </UseageContainer>
      </styleds.EquipmentTopContainer>
    </>
  );
}

const UseageContainer = styled(styleds.AlertAndAddContainer)`
  position: relative;
  background: linear-gradient(
    180deg,
    #1479ff 0%,
    rgba(20, 121, 255, 0.31) 100%
  );
  color: white;
  padding: 2.125rem;
  overflow: hidden;
  h1 {
    font-size: 1.25rem;
    font-weight: bold;
  }
  span {
    font-size: 0.875rem;
  }
`;

const RoketWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 12.4375rem;
  height: 12.4375rem;
  background: url(${useageImg}) no-repeat center center/cover;
  animation: ${Keyframe.floating} 2s ease-in-out infinite;
  z-index: 0;
`;
const RokentContainer = styled.div`
  position: relative;
  ${props => props.theme.wh100};
`;

const UseageTitleContainer = styled.div`
  ${props => props.theme.FlexCol};
  gap: 0.625rem;
`;

const UseageBtnContainer = styled.div`
  ${props => props.theme.FlexRow};
  margin-top: auto;
  button {
    border: 2px solid white;
    padding: 0.625rem;
    opacity: 1 !important;
    z-index: 1;
    &:before {
      ${props => props.theme.AbsoluteTL};
      ${props => props.theme.CursorActive};
      ${props => props.theme.wh100};
      content: '';
    }
  }
`;
