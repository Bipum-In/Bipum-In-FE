import React from 'react';
import { styles } from './RendingPageStyled';
import RendingImg from 'styles/rendingIcon/rendingSenvenImg.png';
import UseageTitle from '../UseageTitle';

export default function SeventhPage() {
  return (
    <>
      <styles.Fullpage>
        <styles.RendingWrapper reverse>
          <styles.RendingTopContainer>
            <UseageTitle adminUseage="true" num="❹">
              비품 여러개를 한 번에
              <br />
              등록할 수 있어요
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
