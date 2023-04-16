import React from 'react';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingTenthImg.png';
import UseageTitle from '../UseageTitle';

export default function TenthPage() {
  return (
    <>
      <styles.Fullpage>
        <styles.RendingWrapper>
          <styles.RendingTopContainer>
            <UseageTitle num="3">
              요청한 내역과 처리 결과를
              <br />
              쉽게 확인할 수 있어요
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
