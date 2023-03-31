import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { userDashboardStatus } from '../../redux/modules/dashboardStatus';
import { getCategoryList } from '../../redux/modules/equipmentStatus';
import ScrollToTop from '../../components/common/ScrollToTop';
import ManagementStatus from '../../components/adminDashBoard/status/ManagementStatus';
import AlertStatus from '../../components/adminDashBoard/status/AlertStatus';
import TestStatus from '../../components/adminDashBoard/status/UseageCard';
import CategoryStatus from '../../components/adminDashBoard/status/CategoryStatus';
import UserDashboardDetailModal from '../../components/adminDashBoard/UserDashboardDetailModal';
import Storage from '../../utils/localStorage';

export default function UserDashBoard() {
  // const isAdmin = false;
  const isAdmin = Storage.getLocalStorageJSON('userData').isAdmin;
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const [showDetailModal, setShowDetailModal] = useState({
    show: false,
    id: null,
  });
  const { getDashboard, isDashboardError } = useSelector(
    state => state.dashboardStatus.userDashboard
  );

  useEffect(() => {
    dispatch(userDashboardStatus(status));
    dispatch(getCategoryList());
  }, [dispatch, status]);

  const handleDetailModal = id =>
    setShowDetailModal(state => ({ show: !state.show, id: id }));

  return (
    <>
      {isDashboardError && <div>에러 발생</div>}
      {getDashboard && (
        <UserDashBoardWrapper id="scrollable-div">
          <TopSideContainer>
            <ManagementStatus isAdmin={isAdmin} getDashboard={getDashboard} />
            <AlertAndUseagesConteinr>
              <AlertStatus isAdmin={isAdmin} getDashboard={getDashboard} />
              <TestStatus />
            </AlertAndUseagesConteinr>
          </TopSideContainer>
          <BottomSideContainer>
            <CategoryStatus
              isAdmin={isAdmin}
              setStatus={setStatus}
              getDashboard={getDashboard}
              onDetailModal={handleDetailModal}
            />
          </BottomSideContainer>
          <ScrollToTop targetSelector="#scrollable-div" />
        </UserDashBoardWrapper>
      )}
      <UserDashboardDetailModal
        isAdmin={isAdmin}
        showDetailModal={showDetailModal}
        onDetailModal={handleDetailModal}
      />
    </>
  );
}

const UserDashBoardWrapper = styled.div`
  ${props => props.theme.FlexCol};
  height: calc(100vh - 5.4rem);
  overflow: auto;
  margin: -4.1rem -3.75rem;
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
