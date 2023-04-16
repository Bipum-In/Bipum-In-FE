import React from 'react';
import { rendingStyles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingSenvenImg.png';
import UseageTitle from '../UseageTitle';

export default function SeventhPage() {
  return (
    <>
      <rendingStyles.Fullpage>
        <rendingStyles.RendingWrapper reverse>
          <rendingStyles.RendingTopContainer>
            <UseageTitle adminUseage="true" num="4">
              비품 여러개를 한 번에
              <br />
              등록할 수 있어요
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
