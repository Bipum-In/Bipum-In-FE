import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import AnchorBtn from '../AnchorBtn';
import Button from 'elements/Button';
import { ReactComponent as ArrowIcon } from 'styles/commonIcon/arrowDown.svg';
import { ReactComponent as Rotate } from 'styles/headerIcon/rotate.svg';

import CategoryItems from '../../common/CategoryItems';
import DashboardCard from '../DashboardCard';
import UserDashboardCard from '../UserDashboardCard';
import useSelectMenu from 'hooks/useSelectMenu';
import { setCategoryData } from 'redux/modules/equipmentStatus';

import STRING from 'constants/string';
import ROUTER from 'constants/routerConst';

export default function CategoryStatus({
  isAdmin,
  getDashboard,
  setStatus,
  onDetailModal,
  handleCommonSupplyDtos,
  getCommonSupplyDtos,
  showCommonSupplyDtos,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getCategory, isCategoryError } = useSelector(
    state => state.equipmentStatus.category
  );

  const largeCategory = getCategory?.largeCategory;

  const supplyDtos = isAdmin
    ? getDashboard.data.supplyCountDtos
    : getDashboard.data.userSupplyDtos;

  const [menuStyle, clickMenu] = useSelectMenu(largeCategory);

  const handleClickMenue = e => {
    const name = e.target.innerText;
    clickMenu(e);
    setStatus(STRING.CATEGORY[name] || '');
  };

  const handleCategoryClick = (id, name) => {
    dispatch(setCategoryData({ categoryId: id, categoryName: name }));
    navigate(ROUTER.PATH.ADMIN.EQUIPMENT_MANAGEMENT);
  };

  return (
    <>
      {isCategoryError && <div>에러 발생</div>}
      {getCategory && (
        <>
          <AnchorBtn
            onClick={() => {
              navigate(ROUTER.PATH.ADMIN.EQUIPMENT_MANAGEMENT);
            }}
          >
            {isAdmin ? '비품 목록' : '사용중인 비품 목록'}
            <ArrowIcon />
          </AnchorBtn>
          <CategoryListContainer>
            {!isAdmin && (
              <TransitionBtn mainBtn={'fill'} onClick={handleCommonSupplyDtos}>
                <Rotate />
                {showCommonSupplyDtos ? '개인 비품 보기' : ' 공용 비품 보기'}
              </TransitionBtn>
            )}
            <CategoryItems
              getCategory={menuStyle}
              onClickMenu={handleClickMenue}
            />
          </CategoryListContainer>
          <EquipmentBottomContainer>
            {showCommonSupplyDtos && getCommonSupplyDtos
              ? getCommonSupplyDtos.data.map(card => (
                  <UserDashboardCard
                    key={uuidv4()}
                    image={card.image}
                    status={card.status}
                    supplyId={card.supplyId}
                    supplyName={card.supplyName}
                    categoryName={card.categoryName}
                    onDetailModal={onDetailModal}
                    getCommonSupplyDtos={getCommonSupplyDtos}
                    showCommonSupplyDtos={showCommonSupplyDtos}
                  />
                ))
              : supplyDtos.map(card =>
                  isAdmin ? (
                    <DashboardCard
                      handleCategoryClick={handleCategoryClick}
                      categoryId={card.categoryId}
                      key={uuidv4()}
                      totalCount={card.totalCount}
                      categoryName={card.categoryName}
                      useCount={card.useCount}
                      repairCount={card.repairCount}
                      stockCount={card.stockCount}
                    />
                  ) : (
                    <UserDashboardCard
                      key={uuidv4()}
                      image={card.image}
                      status={card.status}
                      supplyId={card.supplyId}
                      supplyName={card.supplyName}
                      categoryName={card.categoryName}
                      onDetailModal={onDetailModal}
                      getCommonSupplyDtos={getCommonSupplyDtos}
                    />
                  )
                )}
          </EquipmentBottomContainer>
        </>
      )}
    </>
  );
}

const EquipmentBottomContainer = styled.div`
  ${props => props.theme.FlexRow};
  margin: 1.5625rem auto;
  flex-wrap: wrap;
  width: 100%;
  gap: 1.25rem;
`;

const CategoryListContainer = styled.div`
  ${props => props.theme.FlexRow};
  width: 100%;
`;

const TransitionBtn = styled(Button)`
  height: 100%;
  margin: 0;
  margin-right: 1.25rem;
  padding: 0.625rem;
  background-color: ${props => props.theme.color.blue.brandColor5};
  svg * {
    stroke: white;
  }
`;
