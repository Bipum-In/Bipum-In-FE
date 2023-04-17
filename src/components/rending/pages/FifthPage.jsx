import React from 'react';
import { rendingStyles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingFifthImg.png';
import UseageTitle from '../UseageTitle';

export default function FifthPage() {
  return (
    <>
      <rendingStyles.Fullpage>
        <rendingStyles.RendingWrapper reverse>
          <rendingStyles.RendingTopContainer>
            <UseageTitle adminUseage="true" num="2">
              사원이 보낸 요청 현황을
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
