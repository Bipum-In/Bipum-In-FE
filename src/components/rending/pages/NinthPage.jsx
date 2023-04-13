import React from 'react';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingNinthImg.png';
import UseageTitle from '../UseageTitle';

export default function NinthPage() {
  return (
    <>
      <styles.Fullpage>
        <styles.RendingWrapper reverse>
          <styles.RendingTopContainer>
            <UseageTitle num="❷">
              비품관련 요청을
              <br />
              간편하게 할 수 있어요
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
