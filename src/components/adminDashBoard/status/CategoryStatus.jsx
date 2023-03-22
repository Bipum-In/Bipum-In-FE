import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AnchorBtn from '../AnchorBtn';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as ArrowIcon } from '../../../styles/commonIcon/arrowDown.svg';
import CategoryItems from '../../common/CategoryItems';
import DashboardCard from '../DashboardCard';
import useSelectMenu from '../../../hooks/useSelectMenu';
import STRING from '../../../constants/string';

export default function CategoryStatus({ getDashboard, setStatus }) {
  const { getCategory, isCategoryError } = useSelector(
    state => state.equipmentStatus.category
  );
  const { largeCategory } = getCategory;
  const { supplyCountDtos } = getDashboard.data;
  const [menuStyle, clickMenu] = useSelectMenu(largeCategory);

  const handleClickMenue = e => {
    const name = e.target.innerText;
    getCategoryList(name, largeCategory);
    clickMenu(e);
    setStatus(STRING.LARGECATEGORY[name] || 'ALL');
  };

  const getCategoryList = (name, categoryList) => {
    return categoryList.filter(list => list.name === name);
  };

  return (
    <>
      {isCategoryError && <div>에러 발생</div>}
      {getCategory && (
        <>
          <AnchorBtn onClick={() => {}}>
            비품 목록
            <ArrowIcon />
          </AnchorBtn>
          <CategoryItems
            getCategory={menuStyle}
            onClickMenu={handleClickMenue}
          />
          <EquipmentBottomContainer>
            {supplyCountDtos.map(card => (
              <DashboardCard
                key={uuidv4()}
                totalCount={card.totalCount}
                categoryName={card.categoryName}
                useCount={card.useCount}
                repairCount={card.repairCount}
                stockCount={card.stockCount}
              />
            ))}
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
