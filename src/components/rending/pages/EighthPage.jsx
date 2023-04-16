import React from 'react';
import { rendingStyles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingEighthImg.png';
import UseageTitle from '../UseageTitle';

export default function EighthPage() {
  return (
    <>
      <rendingStyles.Fullpage>
        <rendingStyles.RendingWrapper>
          <rendingStyles.RendingTopContainer>
            <UseageTitle num="1">
              대시보드에서 요청 내역과
              <br />
              사용중인 비품을
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
