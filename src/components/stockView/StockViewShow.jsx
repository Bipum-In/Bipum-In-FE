import styled from 'styled-components';
import StatusListHeader from '../common/status/StatusListHeader';
import PaginationList from '../common/PaginationList';
import StockViewList from './StockViewList';
import PLACEHOLDER from 'constants/placeholder';

export default function StockViewShow({
  pageRef,
  requestData,
  setSelectName,
  page,
  onPage,
  keyword,
  setKeyword,
  onClickDetail,
}) {
  return (
    <RequestShowContainer>
      <StatusListHeader
        setSelectName={setSelectName}
        keyword={keyword}
        setKeyword={setKeyword}
        placeholder={PLACEHOLDER.ENTER_INPUT(
          '검색어를',
          '(신청자,담당부서 등)'
        )}
      />
      <StockViewList
        pageRef={pageRef}
        requestData={requestData}
        onClickDetail={onClickDetail}
      />
      {requestData.content.length !== 0 && (
        <PaginationList
          page={page}
          pageSize={16}
          requestData={requestData}
          onPage={onPage}
        />
      )}
    </RequestShowContainer>
  );
}

const RequestShowContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  border: 0.0579rem solid ${props => props.theme.color.grey.brandColor2};
  box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4628rem;
`;
