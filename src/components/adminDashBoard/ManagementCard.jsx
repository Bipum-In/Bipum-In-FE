import React from 'react';
import styled from 'styled-components';
import { FormatDateToDot } from '../../utils/formatDate';

import { useNavigate } from 'react-router-dom';
import ROUTER from '../../constants/routerConst';

import STRING, { REQUEST_PAGES } from '../../constants/string';

import { useDispatch } from 'react-redux';
import { initRequest, setRequestData } from '../../redux/modules/requestStatus';

export function ManagementCard({
  statusTitle,
  statusCount,
  statusDate,
  onClick,
}) {
  return (
    <>
      <CardWrapper onClick={onClick}>
        <DetailContainer>
          <StatusTitle>{statusTitle}</StatusTitle>
          <StatusCount>{statusCount}건</StatusCount>
          <StatusDate>{statusDate}</StatusDate>
        </DetailContainer>
      </CardWrapper>
    </>
  );
}

export function ManagementCards({ requestsCountData, requestsDate }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveToSupply = () => {
    dispatch(initRequest());
    dispatch(setRequestData(REQUEST_PAGES.SUPPLY));
    navigate(ROUTER.PATH.ADMIN_REQUEST_STATUS);
  };

  const moveToRepair = () => {
    dispatch(initRequest());
    dispatch(setRequestData(REQUEST_PAGES.REPAIR));
    navigate(ROUTER.PATH.ADMIN_REQUEST_STATUS);
  };

  const moveToReturn = () => {
    dispatch(initRequest());
    dispatch(setRequestData(REQUEST_PAGES.RETURN));
    navigate(ROUTER.PATH.ADMIN_REQUEST_STATUS);
  };

  const moveToReport = () => {
    dispatch(initRequest());
    dispatch(setRequestData(REQUEST_PAGES.REPORT));
    navigate(ROUTER.PATH.ADMIN_REQUEST_STATUS);
  };

  return (
    <>
      <ManagementCard
        onClick={moveToSupply}
        statusTitle={STRING.REQUEST_NAME.SUPPLY}
        statusCount={requestsCountData.supplyRequests}
        statusDate={FormatDateToDot(requestsDate.supplyModifiedAt)}
      />
      <ManagementCard
        onClick={moveToRepair}
        statusTitle={STRING.REQUEST_NAME.REPAIR}
        statusCount={requestsCountData.returnRequests}
        statusDate={FormatDateToDot(requestsDate.returnModifiedAt)}
      />
      <ManagementCard
        onClick={moveToReturn}
        statusTitle={STRING.REQUEST_NAME.RETURN}
        statusCount={requestsCountData.repairRequests}
        statusDate={FormatDateToDot(requestsDate.repairModifiedAt)}
      />
      <ManagementCard
        onClick={moveToReport}
        statusTitle={STRING.REQUEST_NAME.REPORT}
        statusCount={requestsCountData.ReportRequests}
        statusDate={FormatDateToDot(requestsDate.ReportRequests)}
      />
    </>
  );
}

const CardWrapper = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: center;
  min-width: 9.25rem;
  min-height: 9.25rem;
  ${props => props.theme.wh100};
  ${props => props.theme.Boxshadow};
  padding: 0.3125rem;
  background-color: white;
  border: 0.0625rem solid ${props => props.theme.color.grey.brandColor2};
  ${props => props.theme.CursorActive};
`;

const DetailContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  gap: 1rem;
`;

const StatusTitle = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.color.blue.brandColor6};
`;

const StatusCount = styled.span`
  font-size: 1.75rem;
`;

const StatusDate = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.color.grey.brandColor5};
`;
