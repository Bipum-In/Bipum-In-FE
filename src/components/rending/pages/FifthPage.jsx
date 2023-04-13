import React from 'react';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingFifthImg.png';
import UseageTitle from '../UseageTitle';

export default function FifthPage() {
  return (
    <>
      <styles.Fullpage>
        <styles.RendingWrapper reverse>
          <styles.RendingTopContainer>
            <UseageTitle adminUseage="true" num="2">
              사원이 보낸 요청 현황을
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
