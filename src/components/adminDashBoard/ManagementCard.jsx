import styled from 'styled-components';

import { v4 as uuidv4 } from 'uuid';
import { formatAgo } from 'utils/formatDate';
import STRING from 'constants/string';

import { ReactComponent as NewIcon } from 'styles/commonIcon/new.svg';

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
            <StatusDateContainer>
              <StatusDateTitle>
                <NewIcon />
                <span>{statusDate}</span>
              </StatusDateTitle>
            </StatusDateContainer>
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
          statusDate={formatAgo(requestsDate[modifiedAtKey[index]])}
        />
      ))}
    </>
  );
}

const CardWrapper = styled.div`
  position: relative;
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
  overflow: hidden;

  @media (max-width: ${props => props.theme.screen.dashboardDesktopMaxWidth}) {
    min-height: 10rem;
  }
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

const StatusDateContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 0.5rem;
  background: ${props => props.theme.color.blue.brandColor2};
`;

const StatusDateTitle = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  font-size: 12px;
  color: ${props => props.theme.color.blue.brandColor6};

  span {
    padding: 0.15rem 0 0 0.25rem;
    text-align: center;
  }
`;
