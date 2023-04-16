import React from 'react';
import { rendingStyles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingElevenImg.png';
import UseageTitle from '../UseageTitle';

export default function EleventhPage() {
  return (
    <>
      <rendingStyles.Fullpage>
        <rendingStyles.RendingWrapper reverse>
          <rendingStyles.RendingTopContainer>
            <UseageTitle num="4">
              회사에 등록된 비품 재고를
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
