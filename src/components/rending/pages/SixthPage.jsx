import React from 'react';
import { rendingStyles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingSixImg.png';
import UseageTitle from '../UseageTitle';

export default function SixthPage() {
  return (
    <>
      <rendingStyles.Fullpage>
        <rendingStyles.RendingWrapper>
          <rendingStyles.RendingTopContainer>
            <UseageTitle adminUseage="true" num="3">
              비품을 카테고리별로
              <br />
              관리할 수 있어요
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
