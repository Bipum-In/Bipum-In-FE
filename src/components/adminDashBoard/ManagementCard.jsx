import React from 'react';
import styled from 'styled-components';
import { FormatDateToDot } from '../../utils/formatDate';

export function ManagementCard({ statusTitle, statusCount, statusDate }) {
  return (
    <>
      <CardWrapper>
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
  return (
    <>
      <ManagementCard
        statusTitle={'비품 요청'}
        statusCount={requestsCountData.supplyRequests}
        statusDate={FormatDateToDot(requestsDate.supplyModifiedAt)}
      />
      <ManagementCard
        statusTitle={'반납 요청'}
        statusCount={requestsCountData.returnRequests}
        statusDate={FormatDateToDot(requestsDate.returnModifiedAt)}
      />
      <ManagementCard
        statusTitle={'수리 요청'}
        statusCount={requestsCountData.repairRequests}
        statusDate={FormatDateToDot(requestsDate.repairModifiedAt)}
      />
      <ManagementCard
        statusTitle={'수리중'}
        statusCount={requestsCountData.inRepairRequests}
        statusDate={FormatDateToDot(requestsDate.inRepairModifiedAt)}
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
