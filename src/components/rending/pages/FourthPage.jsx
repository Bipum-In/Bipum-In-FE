import React from 'react';
import { rendingStyles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingDashBoradImg.png';
import UseageTitle from '../UseageTitle';

export default function FourthPage() {
  return (
    <>
      <rendingStyles.Fullpage>
        <rendingStyles.RendingWrapper>
          <rendingStyles.RendingTopContainer>
            <UseageTitle adminUseage="true" num="1">
              대시보드에서
              <br />
              비품 관리 사항을
              <br />
              한눈에 볼 수 있어요
            </UseageTitle>
          </rendingStyles.RendingTopContainer>
          <rendingStyles.RendingBottomContainer
            bg={RendingImg}
          ></rendingStyles.RendingBottomContainer>
        </rendingStyles.RendingWrapper>
      </rendingStyles.Fullpage>
    </>
  );
}
