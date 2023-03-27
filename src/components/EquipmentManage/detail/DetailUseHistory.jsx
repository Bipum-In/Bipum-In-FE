import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FormatDateToDot } from '../../../utils/formatDate';

export default function DetailUseHistory({ detail }) {
  const { content } = detail.supplyUserHistory;
  return (
    <DetailUseHistoryContainer>
      <p>사용 내역</p>
      <DetailUseHistoryHeader>
        <span>처리 완료일</span>
        <span>사용자</span>
        <span>내역</span>
      </DetailUseHistoryHeader>
      <InfiniteScroll>
        {content.map(item => (
          <DetailUseHistoryContent key={uuidv4()}>
            <span>{FormatDateToDot(item.modifiedAt)}</span>
            <span>{`${item.deptName} / ${item.empName}`}</span>
            <span>{item.history}</span>
          </DetailUseHistoryContent>
        ))}
        {/* <InfiniteScrollCheck /> */}
      </InfiniteScroll>
    </DetailUseHistoryContainer>
  );
}

const DetailUseHistoryContainer = styled.div`
  width: 20.4375rem;
  height: 17.5rem;
  margin: 1.6875rem 0;
  border-radius: 0.5rem;

  p {
    color: ${props => props.theme.color.blue.brandColor6};
    margin: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 13px;
  }
`;

const DetailUseHistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor5};
  font-weight: 600;
  font-size: 13px;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 0 2rem;
  gap: 2rem;

  span:nth-child(1) {
    min-width: 4.875rem;
  }

  span:nth-child(2) {
    min-width: 6.25rem;
  }

  span:nth-child(3) {
    min-width: 6.25rem;
  }
`;

const DetailUseHistoryContent = styled(DetailUseHistoryHeader)`
  color: black;
  background-color: ${props => props.theme.color.blue.brandColor1};
  border-radius: 0;
  font-weight: 500;
  font-size: 12px;
`;

const InfiniteScroll = styled.div`
  height: 15rem;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 0 solid transparent;
    border-radius: 0.5rem;
    background-color: ${props => props.theme.color.blue.brandColor6};
  }
  ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.color.blue.brandColor1};
  }
`;
