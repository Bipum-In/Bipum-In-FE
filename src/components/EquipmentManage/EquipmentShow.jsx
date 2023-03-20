import styled from 'styled-components';
import StatusListHeader from '../common/status/StatusListHeader';
import StatusList from '../common/status/StatusList';
import PaginationList from '../common/PaginationList';

export default function EquipmentShow({
  requestData,
  setSelectName,
  page,
  pageSize,
  onPage,
  onChangeStatus,
  containerHeaderRef,
  listHeaderRef,
  listRef,
  onResize,
}) {
  const selectBoxList = ['전체 보기', '처리전', '처리중', '처리 완료'];
  const headerList = [
    { name: '제품명', width: '15.625rem' },
    { name: '시리얼넘버', width: '8.75rem' },
    { name: '등록일자', width: '6.25rem' },
    { name: '협력업체', width: '9.375rem' },
    { name: '사용자', width: '4.375rem' },
    { name: '부서', width: '7.5rem' },
    { name: '상태', width: '4.375rem' },
  ];

  const contentKeyArr = [
    'modelName',
    'serialNum',
    'createdAt',
    'partners',
    'username',
    'deptName',
    'status',
  ];

  return (
    <RequestShowContainer>
      <StatusListHeader
        setSelectName={setSelectName}
        selectBoxList={selectBoxList}
        containerHeaderRef={containerHeaderRef}
        onChangeStatus={onChangeStatus}
      />
      <StatusList
        headerList={headerList}
        listHeaderRef={listHeaderRef}
        listRef={listRef}
        content={requestData}
        contentKey="content"
        contentKeyArr={contentKeyArr}
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
