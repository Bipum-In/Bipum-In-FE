import React, { useEffect } from 'react';
import styled from 'styled-components';
import DashboardCard from '../../components/adminDashBoard/DashboardCard';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as ArrowDown } from '../../styles/commonIcon/arrowDown.svg';
import StatusCard from '../../components/adminDashBoard/StatusCard';
import AnchorBtn from '../../components/adminDashBoard/AnchorBtn';
import { useDispatch, useSelector } from 'react-redux';
import { __dashboardStatus } from '../../redux/modules/dashboardStatus';

export default function AdminDashBoard() {
  const dispatch = useDispatch();

  const { getDashboard, isDashboardLoading, isDashboardError } = useSelector(
    state => state.dashboardStatus.dashboardStatus
  );

  useEffect(() => {
    dispatch(__dashboardStatus());
  }, [dispatch]);

  const categoryCardData = getDashboard.data?.supplyCountDtos;

  return (
    <AdminDashBoardWrapper>
      <TopSideContainer>
        <EquipmentStatusContainer>
          <AnchorBtn onClick={() => {}}>
            비품 현황
            <ArrowDown />
          </AnchorBtn>

          {/* <StatusCard></StatusCard> */}
        </EquipmentStatusContainer>
        <AlertContainer>
          <AnchorBtn onClick={() => {}}>
            알림
            <ArrowDown />
          </AnchorBtn>
        </AlertContainer>
      </TopSideContainer>
      <CategorySideWrapper>
        <AnchorBtn onClick={() => {}}>
          비품 카테고리
          <ArrowDown />
        </AnchorBtn>
        <EquipmentCardContainer>
          {categoryCardData &&
            categoryCardData.map(card => (
              <DashboardCard
                key={uuidv4()}
                totalCount={card.totalCount}
                categoryName={card.categoryName}
                useCount={card.useCount}
                repairCount={card.repairCount}
                stockCount={card.stockCount}
              />
            ))}
        </EquipmentCardContainer>
      </CategorySideWrapper>
    </AdminDashBoardWrapper>
  );
}

const AdminDashBoardWrapper = styled.div`
  ${props => props.theme.FlexCol}
`;

const TopSideContainer = styled.div`
  ${props => props.theme.FlexRow}
  width: 100%;
  padding-bottom: 2.5rem;
`;

const EquipmentStatusContainer = styled.div`
  ${props => props.theme.FlexCol}
  width: 50%;
`;
const AlertContainer = styled.div`
  ${props => props.theme.FlexCol}
  width: 50%;
`;
const CategorySideWrapper = styled.div`
  position: relative;
  ${props => props.theme.FlexCol}
  align-items: flex-start;
  width: 100%;
`;

const EquipmentCardContainer = styled.div`
  ${props => props.theme.FlexRow};
  margin: 1.5625rem auto;
  flex-wrap: wrap;
  width: 100%;
`;
