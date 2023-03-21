import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { __dashboardStatus } from '../../redux/modules/dashboardStatus';
import { getCategoryList } from '../../redux/modules/equipmentStatus';
import ScrollToTop from '../../hooks/useScrollToTop';
import ManagementStatus from '../../components/adminDashBoard/status/ManagementStatus';
import AlertStatus from '../../components/adminDashBoard/status/AlertStatus';
import TestStatus from '../../components/adminDashBoard/status/TestStatus';
import CategoryStatus from '../../components/adminDashBoard/status/CategoryStatus';

export default function AdminDashBoard() {
  const dispatch = useDispatch();

  const { getDashboard, isDashboardError } = useSelector(
    state => state.dashboardStatus.dashboardStatus
  );
  const { getCategory, isCategoryError } = useSelector(
    state => state.equipmentStatus.category
  );

  console.log(getCategory);
  useEffect(() => {
    dispatch(__dashboardStatus());
    dispatch(getCategoryList());
  }, [dispatch]);

  if (isDashboardError || isCategoryError) return <div>에러 발생</div>;

  return (
    <>
      {getDashboard && getCategory && (
        <AdminDashBoardWrapper id="scrollable-div">
          <TopSideContainer>
            <ManagementStatus getDashboard={getDashboard} />
            <AlertStatus />
            <TestStatus />
          </TopSideContainer>
          <BottomSideContainer>
            <CategoryStatus
              getDashboard={getDashboard}
              getCategory={getCategory}
            />
          </BottomSideContainer>
          <ScrollToTop targetSelector="#scrollable-div" />
        </AdminDashBoardWrapper>
      )}
    </>
  );
}

const AdminDashBoardWrapper = styled.div`
  ${props => props.theme.FlexCol};
  height: calc(100vh - 100px);
  overflow: auto;
  margin: -3.25rem -3.25rem 0 0;
  padding: 3.25rem 0;
`;

const TopSideContainer = styled.div`
  ${props => props.theme.FlexRow};
  width: 100%;
  padding: 0 3.25rem 2.5rem 0;
  gap: 3.5rem;
  @media (max-width: ${props => props.theme.screen.dashboardFullWidth}) {
    ${props => props.theme.FlexRow};
    flex-wrap: wrap;
  }
  @media (max-width: ${props => props.theme.screen.fullWideDesktop}) {
    ${props => props.theme.FlexCol};
  }
`;

const BottomSideContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexCol};
  align-items: flex-start;
  width: 100%;
  padding-right: 3.25rem;
`;
