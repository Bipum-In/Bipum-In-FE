import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { __dashboardStatus } from '../../redux/modules/dashboardStatus';
import { getCategoryList } from '../../redux/modules/equipmentStatus';
import ScrollToTop from '../../components/common/ScrollToTop';
import ManagementStatus from '../../components/adminDashBoard/status/ManagementStatus';
import AlertStatus from '../../components/adminDashBoard/status/AlertStatus';
import TestStatus from '../../components/adminDashBoard/status/TestStatus';
import CategoryStatus from '../../components/adminDashBoard/status/CategoryStatus';

export default function UserDashBoard() {
  const isAdmin = false;
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const { getDashboard, isDashboardError } = useSelector(
    state => state.dashboardStatus.dashboardStatus
  );

  useEffect(() => {
    dispatch(__dashboardStatus({ path: '', status }));
    dispatch(getCategoryList());
  }, [dispatch, status]);

  return (
    <>
      {isDashboardError && <div>에러 발생</div>}
      {getDashboard && (
        <UserDashBoardWrapper id="scrollable-div">
          <TopSideContainer>
            <ManagementStatus isAdmin={isAdmin} getDashboard={getDashboard} />
            <AlertStatus />
            <TestStatus />
          </TopSideContainer>
          <BottomSideContainer>
            <CategoryStatus
              isAdmin={isAdmin}
              setStatus={setStatus}
              getDashboard={getDashboard}
            />
          </BottomSideContainer>
          <ScrollToTop targetSelector="#scrollable-div" />
        </UserDashBoardWrapper>
      )}
    </>
  );
}

const UserDashBoardWrapper = styled.div`
  ${props => props.theme.FlexCol};
  height: calc(100vh - 6.25rem);
  overflow: auto;
  margin: -3rem -3.75rem;
  padding: 3.75rem 0px 3.75rem 3.75rem;
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
