import React from 'react';
import { styles } from 'components/common/commonStyled';
import myPageStyled from '../myPageStyled';
import PLACEHOLDER from 'constants/placeholder';

export default function MyPageEmpName({
  state,
  handleEmpNameBlur,
  handleEmpNameClear,
}) {
  return (
    <>
      <styles.TypeBox>
        <myPageStyled.MyTypeTitle>이름</myPageStyled.MyTypeTitle>
        {state.editMode ? (
          <myPageStyled.MypageInput
            type="text"
            name="empName"
            value={state.empName}
            onChange={handleEmpNameBlur}
            placeholder={PLACEHOLDER.ENTER_INPUT('이름을')}
            maxLength="15"
          />
        ) : (
          <myPageStyled.MyinfoSpan>{state.empName}</myPageStyled.MyinfoSpan>
        )}
        {state.editMode && (
          <myPageStyled.ClearInputBtn onClick={handleEmpNameClear} />
        )}
      </styles.TypeBox>
    </>
  );
}
