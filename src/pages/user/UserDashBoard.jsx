import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { userDashboardStatus } from 'redux/modules/dashboardStatus';
import { commonSupplyDtos } from 'redux/modules/dashboardStatus';
import { getCategoryList } from 'redux/modules/equipmentStatus';
import { getEncryptionStorage } from 'utils/encryptionStorage';

import ScrollToTop from 'components/common/ScrollToTop';
import ManagementStatus from 'components/adminDashBoard/status/ManagementStatus';
import AlertStatus from 'components/adminDashBoard/status/AlertStatus';
import TestStatus from 'components/adminDashBoard/status/UseageCard';
import CategoryStatus from 'components/adminDashBoard/status/CategoryStatus';
import UserDashboardDetailModal from 'components/adminDashBoard/UserDashboardDetailModal';

export default function UserDashBoard() {
  const dispatch = useDispatch();
  const { isAdmin } = getEncryptionStorage();

  const [status, setStatus] = useState('');
  const [showCommonSupplyDtos, setShowCommonSupplyDtos] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState({
    show: false,
    id: null,
  });
  const {
    userDashboard: { getDashboard, isDashboardError },
    commonSupplyDtos: { getCommonSupplyDtos, isCommonSupplyDtosError },
  } = useSelector(state => state.dashboardStatus);

  useEffect(() => {
    dispatch(userDashboardStatus(status));
    dispatch(commonSupplyDtos(status));
    dispatch(getCategoryList());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, status]);

  const handleDetailModal = id =>
    setShowDetailModal(state => ({ show: !state.show, id: id }));

  const handleCommonSupplyDtos = e => {
    setShowCommonSupplyDtos(
      prevShowCommonSupplyDtos => !prevShowCommonSupplyDtos
    );
    if (!showCommonSupplyDtos) {
      dispatch(commonSupplyDtos(''));
    }
  };

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
              handleCommonSupplyDtos={handleCommonSupplyDtos}
              getCommonSupplyDtos={getCommonSupplyDtos}
              showCommonSupplyDtos={showCommonSupplyDtos}
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
