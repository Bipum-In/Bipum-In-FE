import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AnchorBtn from '../AnchorBtn';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as ArrowIcon } from '../../../styles/commonIcon/arrowDown.svg';
import CategoryItems from '../../common/CategoryItems';
import DashboardCard from '../DashboardCard';
import useSelectMenu from '../../../hooks/useSelectMenu';
import STRING from '../../../constants/string';
import ROUTER from '../../../constants/routerConst';
import UserDashboardCard from '../UserDashboardCard';
import { setCategoryData } from '../../../redux/modules/equipmentStatus';

export default function CategoryStatus({
  isAdmin,
  getDashboard,
  setStatus,
  onDetailModal,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getCategory, isCategoryError } = useSelector(
    state => state.equipmentStatus.category
  );
  const { largeCategory } = getCategory;
  const supplyDtos = isAdmin
    ? getDashboard.data.supplyCountDtos
    : getDashboard.data.userSupplyDtos;

  const [menuStyle, clickMenu] = useSelectMenu(largeCategory);

  const handleClickMenue = e => {
    const name = e.target.innerText;
    getCategoryList(name, largeCategory);
    clickMenu(e);
    setStatus(STRING.CATEGORY[name] || '');
  };

  const getCategoryList = (name, categoryList) => {
    return categoryList.filter(list => list.name === name);
  };

  const handleCategoryClick = (id, name) => {
    dispatch(setCategoryData({ categoryId: id, categoryName: name }));
    navigate(ROUTER.PATH.ADMIN_EQUIPMENT_MANAGEMENT);
  };

  return (
    <>
      {isCategoryError && <div>에러 발생</div>}
      {getCategory && (
        <>
          <AnchorBtn
            onClick={() => {
              navigate(ROUTER.PATH.ADMIN_EQUIPMENT_MANAGEMENT);
            }}
          >
            비품 목록
            <ArrowIcon />
          </AnchorBtn>
          <CategoryItems
            getCategory={menuStyle}
            onClickMenu={handleClickMenue}
          />
          <EquipmentBottomContainer>
            {supplyDtos.map(card =>
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
