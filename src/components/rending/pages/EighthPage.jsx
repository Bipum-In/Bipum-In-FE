import React from 'react';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingEighthImg.png';
import UseageTitle from '../UseageTitle';

export default function EighthPage() {
  return (
    <>
      <styles.Fullpage>
        <styles.RendingWrapper>
          <styles.RendingTopContainer>
            <UseageTitle num="1">
              대시보드에서 요청 내역과
              <br />
              사용중인 비품을
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
