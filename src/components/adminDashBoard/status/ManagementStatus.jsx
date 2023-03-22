import React from 'react';
import styled from 'styled-components';
import { styleds } from './AdminDashBaordStyled';
import { useNavigate } from 'react-router-dom';
import AnchorBtn from '../AnchorBtn';
import { ReactComponent as RequestIcon } from '../../../styles/commonIcon/requestIcon.svg';
import { ReactComponent as ArrowIcon } from '../../../styles/commonIcon/arrowDown.svg';
import { ManagementCards } from '../ManagementCard';
import ROUTER from '../../../constants/routerConst';
import { REQUEST_PAGES } from '../../../constants/string';

export default function ManagementStatus({ getDashboard }) {
  const navigate = useNavigate();
  const { requestsCountDto } = getDashboard.data;

  const moveToUnprocessed = () => {
    navigate(ROUTER.PATH.ADMIN_REQUEST_STATUS, {
      state: REQUEST_PAGES.UNPROCESSED,
    });
  };

  return (
    <>
      {requestsCountDto && (
        <styleds.EquipmentTopContainer col="true">
          <AnchorBtn
            onClick={() => navigate(ROUTER.PATH.ADMIN_EQUIPMENT_MANAGEMENT)}
          >
            관리 현황 <ArrowIcon />
          </AnchorBtn>
          <ManagementWrapper>
            <ManagementAlertTopContainer>
              <NewAlertContainer onClick={moveToUnprocessed}>
                <RequestIcon />
                <NewAlertTitle>처리대기 요청</NewAlertTitle>
                <NewAlertNum>
                  {requestsCountDto.countMap.UnProcessedRequests}건
                </NewAlertNum>
              </NewAlertContainer>
            </ManagementAlertTopContainer>
            <ManagementAlertBottomContainer>
              <ManagementCards
                requestsCountData={requestsCountDto.countMap}
                requestsDate={requestsCountDto.modifiedAtMap}
              />
            </ManagementAlertBottomContainer>
          </ManagementWrapper>
        </styleds.EquipmentTopContainer>
      )}
    </>
  );
}

const ManagementWrapper = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: space-between;
`;

const ManagementAlertTopContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  background-color: ${props => props.theme.color.blue.brandColor6};
  box-shadow: 0.1888rem 0.1888rem 0.944rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 100%;
  min-width: 39.8125rem;
  padding: 1rem;
  height: 9.25rem;
  margin-bottom: 1rem;
  * {
    color: white;
    stroke: white;
  }
`;

const ManagementAlertBottomContainer = styled.div`
  ${props => props.theme.FlexRow};
  gap: 1rem;
`;

const NewAlertContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  gap: 1rem;
  &:before {
    content: '';
    ${props => props.theme.AbsoluteTL};
    ${props => props.theme.wh100};
    ${props => props.theme.CursorActive};
  }
`;

const NewAlertTitle = styled.span`
  font-size: 1.125rem;
`;

const NewAlertNum = styled.span`
  font-size: 1.75rem;
  font-weight: bold;
`;
