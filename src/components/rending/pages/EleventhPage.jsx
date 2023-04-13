import React from 'react';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingElevenImg.png';
import UseageTitle from '../UseageTitle';

export default function EleventhPage() {
  return (
    <>
      <styles.Fullpage>
        <styles.RendingWrapper reverse>
          <styles.RendingTopContainer>
            <UseageTitle num="4">
              회사에 등록된 비품 재고를
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
