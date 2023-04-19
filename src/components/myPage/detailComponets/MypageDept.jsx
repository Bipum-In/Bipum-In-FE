import React from 'react';
import { styles } from 'components/common/commonStyled';
import myPageStyled from '../myPageStyled';
import SelectCategory from 'components/common/SelectCategory';

export default function MypageDept({
  state,
  handleChangeDepartmentId,
  myDeptName,
}) {
  return (
    <>
      <styles.TypeBox>
        <myPageStyled.MyTypeTitle>부서</myPageStyled.MyTypeTitle>
        <styles.PartnerCompany>
          {state.editMode ? (
            <styles.SelectBox>
              <SelectCategory
                category={state.departmentList}
                optionName={'deptName'}
                optionNullName={state.departmentName}
                optionKey={'deptName'}
                optionValueKey={'deptId'}
                onChangeCategory={handleChangeDepartmentId}
              />
            </styles.SelectBox>
          ) : (
            <myPageStyled.MyinfoSpan>{myDeptName}</myPageStyled.MyinfoSpan>
          )}
        </styles.PartnerCompany>
      </styles.TypeBox>
    </>
  );
}
