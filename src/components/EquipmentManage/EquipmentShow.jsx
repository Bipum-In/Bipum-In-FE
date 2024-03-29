import styled from 'styled-components';
import StatusListHeader from '../common/status/StatusListHeader';
import StatusList from '../common/status/StatusList';
import PaginationList from '../common/PaginationList';
import EquipmentAddBtn from './EquipmentAddBtn';
import PLACEHOLDER from 'constants/placeholder';

export default function EquipmentShow({
  isAdmin,
  requestData,
  setSelectName,
  page,
  pageSize,
  onPage,
  status,
  setStatus,
  keyword,
  setKeyword,
  onClickDetail,
  onClickSingleModal,
  onClickMultiModal,
  resizeRef,
}) {
  const selectBoxList = {
    name: ['전체 보기', '사용중', '재고', '수리중'],
    type: ['', 'USING', 'STOCK', 'REPAIRING'],
  };
  const headerList = [
    { name: '종류', width: '5.6875rem' },
    { name: '제품명', width: '15.625rem' },
    { name: '시리얼넘버', width: '8.75rem' },
    { name: '등록일자', width: '6.25rem' },
    { name: '협력업체', width: '9.375rem' },
    { name: '사용자', width: '4.375rem' },
    { name: '부서', width: '7.5rem' },
    { name: '상태', width: '4.375rem' },
  ];

  const contentKeyArr = [
    'category',
    'modelName',
    'serialNum',
    'createdAt',
    'partners',
    'empName',
    'deptName',
    'status',
  ];

  return (
    <RequestShowContainer ref={resizeRef.containerRef}>
      <StatusListHeader
        setSelectName={setSelectName}
        selectBoxList={selectBoxList}
        containerHeaderRef={resizeRef.containerHeaderRef}
        status={status}
        setStatus={setStatus}
        keyword={keyword}
        setKeyword={setKeyword}
        placeholder={PLACEHOLDER.ENTER_INPUT(
          '검색어를',
          '(신청자,담당부서 등)'
        )}
        childOne={
          <EquipmentAddBtn
            onClickSingleModal={onClickSingleModal}
            onClickMultiModal={onClickMultiModal}
          />
        }
      />
      <StatusList
        isAdmin={isAdmin}
        headerList={headerList}
        listHeaderRef={resizeRef.listHeaderRef}
        listRef={resizeRef.listRef}
        content={requestData}
        contentKeyArr={contentKeyArr}
        onDetail={onClickDetail}
      />
      {requestData && (
        <PaginationList
          page={page}
          pageSize={pageSize}
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
