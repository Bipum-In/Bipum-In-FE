import React from 'react';
import { rendingStyles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingTenthImg.png';
import UseageTitle from '../UseageTitle';

export default function TenthPage() {
  return (
    <>
      <rendingStyles.Fullpage>
        <rendingStyles.RendingWrapper>
          <rendingStyles.RendingTopContainer>
            <UseageTitle num="3">
              요청한 내역과 처리 결과를
              <br />
              쉽게 확인할 수 있어요
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
