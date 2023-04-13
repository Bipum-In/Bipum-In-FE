import React from 'react';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingSixImg.png';
import UseageTitle from '../UseageTitle';

export default function SixthPage() {
  return (
    <>
      <styles.Fullpage>
        <styles.RendingWrapper>
          <styles.RendingTopContainer>
            <UseageTitle adminUseage="true" num="3">
              비품을 카테고리별로
              <br />
              관리할 수 있어요
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
