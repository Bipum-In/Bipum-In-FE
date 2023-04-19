import React from 'react';
import { styles } from 'components/common/commonStyled';
import myPageStyled from '../myPageStyled';
import PLACEHOLDER from 'constants/placeholder';

export default function MyPagePhone({
  state,
  handleChangePhone,
  handlePhoneClear,
}) {
  return (
    <>
      <styles.TypeBox>
        <myPageStyled.MyTypeTitle>전화번호</myPageStyled.MyTypeTitle>
        {state.editMode ? (
          <myPageStyled.MypageInput
            name="phone"
            value={state.phone}
            onChange={handleChangePhone}
            placeholder={PLACEHOLDER.ENTER_INPUT('전화번호를')}
            maxLength="11"
          />
        ) : (
          <myPageStyled.MyinfoSpan>{state.phone}</myPageStyled.MyinfoSpan>
        )}
        {state.editMode && (
          <myPageStyled.ClearInputBtn onClick={handlePhoneClear} />
        )}
      </styles.TypeBox>
    </>
  );
}
