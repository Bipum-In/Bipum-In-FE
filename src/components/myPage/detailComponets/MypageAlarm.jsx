import React from 'react';
import styled from 'styled-components';
import { styles } from 'components/common/commonStyled';
import myPageStyled from '../myPageStyled';

export default function MypageAlarm({ state, handleChange }) {
  return (
    <>
      <styles.TypeBox>
        <myPageStyled.MyTypeTitle>문자 알림</myPageStyled.MyTypeTitle>
        {state.editMode ? (
          <CheckBox
            role="switch"
            checked={state.checkedAlarm}
            onChange={handleChange}
            editMode={state.editMode}
          />
        ) : (
          !state.editMode && (state.checkedAlarm ? '활성화' : '비활성화')
        )}
      </styles.TypeBox>
    </>
  );
}

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  position: relative;
  border-radius: 4rem !important;
  height: 2rem !important;
  width: 4rem;
  background: ${props => props.theme.color.grey.brandColor2} !important;
  cursor: pointer;
  transition: background 0.15s ease;
  pointer-events: ${props => (props.editMode ? 'auto' : 'none')};
  &:before {
    content: '';
    position: absolute;
    left: 0.4rem;
    width: 1.5em;
    height: 1.5em;
    top: 50%;
    border-radius: 50%;
    transform: translateY(-50%);
    background-color: white;
    transition: left 0.15s linear;
  }

  &:checked {
    background: ${props => props.theme.color.blue.brandColor6} !important;
  }

  &:checked::before {
    left: 2.6em;
  }
`;
