import styled from 'styled-components';
import { FormatDateToDot } from 'utils/formatDate';

import { useInView } from 'react-intersection-observer';

import NUMBER from 'constants/number';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { getHistory } from 'redux/modules/equipmentStatus';

export default function DetailUseHistory({ detail }) {
  const dispatch = useDispatch();
  const [ref, inView] = useInView({ threshold: 0 });

  const { supplyId } = detail.supplyDetail;
  const { content: firstContent } = detail.supplyUserHistory;
  const { history, isUserLoading, isUserError } = useSelector(
    state => state.equipmentStatus.supplyHistory
  );

  const { content, lastPage } = history.user;

  const page = useRef(2);
  const size = NUMBER.INT.SIX;

  useEffect(() => {
    if (!lastPage && inView) {
      dispatch(
        getHistory({ history: 'user', supplyId, page: page.current, size })
      );
      page.current += 1;
    }
  }, [dispatch, inView, lastPage, size, supplyId]);

  return (
    <DetailUseHistoryContainer>
      <p>사용 내역</p>
      <DetailUseHistoryHeader>
        <span>처리 완료일</span>
        <span>사용자</span>
        <span>내역</span>
      </DetailUseHistoryHeader>
      {isUserError ? (
        <div>에러 발생</div>
      ) : (
        <InfiniteScroll>
          {firstContent.map(item => (
            <DetailUseHistoryContent key={item.requestId}>
              <span>{FormatDateToDot(item.modifiedAt)}</span>
              <span>{`${item.deptName} / ${item.empName}`}</span>
              <span>{item.history}</span>
            </DetailUseHistoryContent>
          ))}
          {content.map(item => (
            <DetailUseHistoryContent key={item.requestId}>
              <span>{FormatDateToDot(item.modifiedAt)}</span>
              <span>{`${item.deptName} / ${item.empName}`}</span>
              <span>{item.history}</span>
            </DetailUseHistoryContent>
          ))}
          <InfiniteScrollCheck ref={ref}>
            {isUserLoading ? <InfiniteCross /> : '마지막 페이지 입니다.'}
          </InfiniteScrollCheck>
        </InfiniteScroll>
      )}
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

  @media (max-width: 106.25rem) {
    width: 25.3125rem;
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
  height: 2.5rem;
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

const InfiniteScrollCheck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  color: ${props => props.theme.color.grey.brandColor5};
  background-color: ${props => props.theme.color.blue.brandColor1};
  border-radius: 0 0 0.5rem 0.5rem;
  font-weight: 500;
  font-size: 13px;
`;

const InfiniteCross = styled.div`
  display: inline-block;

  :after {
    content: ' ';
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    border: 3px solid;
    border-color: ${props => props.theme.color.blue.brandColor5} transparent
      ${props => props.theme.color.blue.brandColor5} transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
