import React, { useEffect } from 'react';
import styled from 'styled-components';

import AddSingleItem from 'components/equipmentAdd/AddSingleItem';
import AddMultipleItem from 'components/equipmentAdd/AddMultipleItem';
import StatusMenu from 'components/common/status/StatusMenu';

import useSelectMenu from 'hooks/useSelectMenu';
import STRING from 'constants/string';

import { useDispatch, useSelector } from 'react-redux';
import { getCategoryList } from 'redux/modules/equipmentStatus';

export default function EquipmentAdd() {
  const dispatch = useDispatch();
  const [menuStyle, handleClickMenu] = useSelectMenu([
    { name: STRING.ADDMENUE.ADDBIPUM, status: true },
    { name: STRING.ADDMENUE.ADDMULTIPLE, status: false },
  ]);
  const { getCategory } = useSelector(state => state.equipmentStatus.category);
  const largeCategory = Object.values(STRING.CATEGORY_ENG).map(value => {
    return { name: value };
  });

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <>
      {getCategory && (
        <EquipmentWrapper>
          <AddBtnContainer>
            <StatusMenu menuStyle={menuStyle} onClickMenu={handleClickMenu} />
          </AddBtnContainer>
          <AddComponentsContainer>
            {menuStyle[0].status && (
              <AddSingleItem
                categoryList={getCategory.category}
                largeCategoryList={largeCategory}
              />
            )}
            {menuStyle[1].status && <AddMultipleItem />}
          </AddComponentsContainer>
        </EquipmentWrapper>
      )}
    </>
  );
}
const EquipmentWrapper = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.wh100};
`;
const AddBtnContainer = styled.div`
  ${props => props.theme.FlexRow};

  justify-content: flex-start;
  gap: 0.5375rem;
`;
const AddComponentsContainer = styled.main`
  ${props => props.theme.FlexRow};
  ${props => props.theme.wh100};
  background-color: white;
  box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4628rem;
`;
