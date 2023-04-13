import React from 'react';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingDashBoradImg.png';
import UseageTitle from '../UseageTitle';

export default function FourthPage() {
  return (
    <>
      <styles.Fullpage>
        <styles.RendingWrapper>
          <styles.RendingTopContainer>
            <UseageTitle adminUseage="true" num="❶">
              대시보드에서
              <br />
              비품 관리 사항을
              <br />
              한눈에 볼 수 있어요
            </UseageTitle>
          </styles.RendingTopContainer>
          <styles.RendingBottomContainer
            bg={RendingImg}
          ></styles.RendingBottomContainer>
        </styles.RendingWrapper>
      </styles.Fullpage>
    </>
  );
}
