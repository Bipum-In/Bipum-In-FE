import styled from 'styled-components';

import { v4 as uuidv4 } from 'uuid';
import { FormatDateToDot } from 'utils/formatDate';
import STRING from 'constants/string';

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
          {statusCount !== 0 && (
            <StatusDate>
              {statusDate}
              <br />
              업데이트
            </StatusDate>
          )}
        </DetailContainer>
      </CardWrapper>
    </>
  );
}

export function ManagementCards({
  requestTypeKey,
  requestsCountData,
  requestsDate,
  moveToRequset,
  requestKey,
  modifiedAtKey,
}) {
  return (
    <>
      {requestTypeKey.map((key, index) => (
        <ManagementCard
          key={uuidv4()}
          onClick={() => {
            moveToRequset(key);
          }}
          statusTitle={STRING.REQUEST_NAME[key]}
          statusCount={requestsCountData[requestKey[index]]}
          statusDate={FormatDateToDot(requestsDate[modifiedAtKey[index]])}
        />
      ))}
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
  text-align: center;
`;
