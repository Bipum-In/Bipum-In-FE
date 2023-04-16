import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import StatusMenu from 'components/common/status/StatusMenu';
import useSelectMenu from 'hooks/useSelectMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryList } from 'redux/modules/equipmentStatus';
import useSetStateChange from 'hooks/useSetStateChange';
import UserEquipmentRequest from 'components/userRequest/UserEquipmentRequest';
import { initRequestData } from 'redux/modules/requestStatus';
import STRING from 'constants/string';

export default function UserRequest() {
  const dispatch = useDispatch();
  const { getCategory } = useSelector(state => state.equipmentStatus.category);
  const { menu, menuType, supplyId, modelName } = useSelector(
    state => state.requestStatus.requestData
  );
  const largeCategory = Object.values(STRING.CATEGORY_ENG).map(value => {
    return { name: value };
  });

  const deleteAllMenu = useRef(
    menu
      .filter(item => item.name !== '전체')
      .map(item =>
        item.type === (menuType || 'SUPPLY') ? { ...item, status: true } : item
      )
  ).current;

  const [menuStyle, clickMenu] = useSelectMenu(deleteAllMenu);
  const [type, setType] = useState(menuType || 'SUPPLY');

  const handleClickMenu = useSetStateChange(
    ['비품 요청', '반납 요청', '수리 요청', '보고서 결재 요청'],
    ['SUPPLY', 'RETURN', 'REPAIR', 'REPORT'],
    setType,
    e => {
      clickMenu(e);
      dispatch(initRequestData());
    }
  );

  useEffect(() => {
    dispatch(initRequestData({ supplyId: true, modelName: true }));
    dispatch(getCategoryList());
  }, [dispatch]);
  return (
    <>
      {getCategory && (
        <RequestWrapper>
          <RequestBtnContainer>
            <StatusMenu menuStyle={menuStyle} onClickMenu={handleClickMenu} />
          </RequestBtnContainer>
          <RequestComponentsContainer>
            <UserEquipmentRequest
              type={type}
              supplyId={supplyId}
              modelName={modelName}
              category={getCategory.category}
              largeCategory={largeCategory}
            />
          </RequestComponentsContainer>
        </RequestWrapper>
      )}
    </>
  );
}

const RequestWrapper = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.wh100};
`;

const RequestBtnContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: flex-start;
  gap: 0.5375rem;
`;
const RequestComponentsContainer = styled.main`
  ${props => props.theme.FlexRow};
  ${props => props.theme.wh100};
  background-color: white;
  box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4628rem;
`;
