import React from 'react';
import styled from 'styled-components';
import AnchorBtn from '../AnchorBtn';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as ArrowIcon } from '../../../styles/commonIcon/arrowDown.svg';
import CategoryItems from '../../common/CategoryItems';
import DashboardCard from '../DashboardCard';

export default function CategoryStatus({ getDashboard, getCategory }) {
  const { largeCategory } = getCategory;
  const { supplyCountDtos } = getDashboard.data;
  console.log(supplyCountDtos);
  return (
    <>
      {supplyCountDtos && (
        <>
          <AnchorBtn onClick={() => {}}>
            비품 목록
            <ArrowIcon />
          </AnchorBtn>
          <CategoryItems getCategory={largeCategory} />
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
