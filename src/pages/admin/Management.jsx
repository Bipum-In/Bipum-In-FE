import React, { useEffect } from 'react';

import styled from 'styled-components';

import useSelectMenu from 'hooks/useSelectMenu';
import StatusMenu from 'components/common/status/StatusMenu';
import CategoryManagement from 'components/management/CategoryManagement';
import DeptManagement from 'components/management/DeptManagement';
import PartnerManagement from 'components/management/PartnerManagement';
import STRING from 'constants/string';
import { useDispatch, useSelector } from 'react-redux';
import {} from 'redux/modules/requestStatus';
import { getCategoryList } from 'redux/modules/equipmentStatus';

export default function Management() {
  const dispatch = useDispatch();
  const { getCategory, isCategoryError } = useSelector(
    state => state.equipmentStatus.category
  );

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  const [menuStyle, clickMenu] = useSelectMenu([
    { name: STRING.MANAGEMENT_TITLE.CATEGORY, status: true },
    { name: STRING.MANAGEMENT_TITLE.DEPTAUTH, status: false },
    { name: STRING.MANAGEMENT_TITLE.PARTNER, status: false },
  ]);

  if (isCategoryError) return <div>에러 발생</div>;
  return (
    <>
      {getCategory && (
        <ManagementWrapper>
          <ManagementBtnContainer>
            <StatusMenu menuStyle={menuStyle} onClickMenu={clickMenu} />
          </ManagementBtnContainer>
          <ManagementComponentsContainer>
            {menuStyle[0].status && (
              <CategoryManagement category={getCategory} />
            )}
            {menuStyle[1].status && <DeptManagement />}
            {menuStyle[2].status && <PartnerManagement />}
          </ManagementComponentsContainer>
        </ManagementWrapper>
      )}
    </>
  );
}

const ManagementComponentsContainer = styled.main`
  ${props => props.theme.FlexRow};
  ${props => props.theme.wh100};
  background-color: white;
  box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4628rem;
`;

const ManagementBtnContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: flex-start;
  gap: 0.5375rem;
`;

const ManagementWrapper = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.wh100};
`;
