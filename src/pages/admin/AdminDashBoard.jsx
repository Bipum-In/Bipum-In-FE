import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { adminDashboardStatus } from '../../redux/modules/dashboardStatus';
import { getCategoryList } from '../../redux/modules/equipmentStatus';
import ScrollToTop from '../../components/common/ScrollToTop';
import ManagementStatus from '../../components/adminDashBoard/status/ManagementStatus';
import AlertStatus from '../../components/adminDashBoard/status/AlertStatus';
import UseageCard from '../../components/adminDashBoard/status/UseageCard';
import CategoryStatus from '../../components/adminDashBoard/status/CategoryStatus';
import Storage from '../../utils/localStorage';

export default function AdminDashBoard() {
  // const isAdmin = true;
  const isAdmin = Storage.getLocalStorageJSON('userData').isAdmin;
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const { getDashboard, isDashboardLoading, isDashboardError } = useSelector(
    state => state.dashboardStatus.adminDashboard
  );

  useEffect(() => {
    dispatch(adminDashboardStatus({ path: '/admin', status }));
    dispatch(getCategoryList());
  }, [dispatch, status]);

  return (
    <>
      {isDashboardError && <div>에러 발생</div>}
      {getDashboard && (
        <AdminDashBoardWrapper id="scrollable-div">
          <TopSideContainer>
            <ManagementStatus isAdmin={isAdmin} getDashboard={getDashboard} />
            <AlertAndUseagesConteinr>
              <AlertStatus isAdmin={isAdmin} getDashboard={getDashboard} />
              <UseageCard />
            </AlertAndUseagesConteinr>
          </TopSideContainer>
          <BottomSideContainer>
            <CategoryStatus
              isAdmin={isAdmin}
              setStatus={setStatus}
              getDashboard={getDashboard}
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
  @media (max-width: ${props => props.theme.screen.dashboardDesktopMaxWidth}) {
    ${props => props.theme.FlexCol};
    flex-wrap: wrap;
  }
`;

const BottomSideContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexCol};
  align-items: flex-start;
  width: 100%;
  padding-right: 3.25rem;
`;

const AlertAndUseagesConteinr = styled.div`
  ${props => props.theme.FlexRow};
  gap: 2.625rem;
`;
