import styled from 'styled-components';
import StatusListHeader from '../common/status/StatusListHeader';
import StatusList from '../common/status/StatusList';
import PaginationList from '../common/PaginationList';

export default function RequestShow({
  requestData,
  setSelectName,
  page,
  pageSize,
  onPage,
  onChangeStatus,
  containerHeaderRef,
  listHeaderRef,
  listRef,
}) {
  const selectBoxList = ['전체 보기', '처리전', '처리중', '처리 완료'];
  const headerList = [
    { name: '요청구분', width: '5rem' },
    { name: '종류', width: '4.375rem' },
    { name: '제품명', width: '18rem' },
    { name: '신청자', width: '4.375rem' },
    { name: '담당부서', width: '7.5rem' },
    { name: '신청일', width: '13.75rem' },
    { name: '상태', width: '6rem' },
    { name: '결과', width: '2.8125rem' },
  ];

  const contentKeyArr = [
    'requestType',
    'categoryName',
    'modelName',
    'empName',
    'deptName',
    'createdAt',
    'status',
    'acceptResult',
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
