import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Pagination from 'react-js-pagination';
import StatusListHeader from '../common/StatusListHeader';
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
  onResize,
}) {
  const { content, totalElements } = requestData.data;
  const selectBoxList = ['전체 보기', '처리전', '처리중', '처리 완료'];

  useEffect(() => {
    onResize();
  }, [onResize]);

  return (
    <RequestShowContainer>
      <StatusListHeader
        setSelectName={setSelectName}
        selectBoxList={selectBoxList}
        containerHeaderRef={containerHeaderRef}
        onChangeStatus={onChangeStatus}
      />
      <RequestShowBody>
        <table ref={listHeaderRef}>
          <RequestShowListTitle>
            <tr>
              <RequestTypeTh>요청구분</RequestTypeTh>
              <CategoryNameTh>종류</CategoryNameTh>
              <ModelNameTh>제품명</ModelNameTh>
              <EmpNameTh>신청자</EmpNameTh>
              <DeptNameTh>담당부서</DeptNameTh>
              <CreatedAtTh>신청일</CreatedAtTh>
              <StatusTh>상태</StatusTh>
            </tr>
          </RequestShowListTitle>
        </table>
        <table ref={listRef}>
          {content.map(list => (
            <RequestShowList key={uuidv4()}>
              <tr>
                <RequestType>{list.requestType}</RequestType>
                <CategoryName>{list.categoryName}</CategoryName>
                <ModelName>{list.modelName ? list.modelName : '-'}</ModelName>
                <EmpName>{list.empName}</EmpName>
                <DeptName>{list.deptName}</DeptName>
                <CreatedAt>{list.createdAt}</CreatedAt>
                <Status>
                  <StatusList>
                    <StatusColor status={list.status} />
                    {list.status}
                  </StatusList>
                </Status>
              </tr>
            </RequestShowList>
          ))}
        </table>
      </RequestShowBody>
      <PaginationList
        page={page}
        pageSize={pageSize}
        totalElements={totalElements}
        onPage={onPage}
      />
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

const RequestShowBody = styled.div`
  width: 100%;

  table {
    width: 100%;
    table-layout: auto;
  }

  tr {
    display: flex;
    margin: 0px auto;
    line-height: 3.3125rem;
    gap: 1.875rem;
    justify-content: center;
  }

  td {
    height: 100%;
    text-align: left;
    text-overflow: ellipsis;
    font-size: 1.0625rem;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const RequestShowListTitle = styled.thead`
  height: 50px;
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: ${props => props.theme.color.blue.brandColor1};
  font-weight: 600;
  font-size: 1.25rem;
  text-align: left;
  padding: 0 2rem;
  display: flex;
`;

const RequestShowList = styled.tbody`
  height: 3rem;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor3};
  font-size: 17px;
  cursor: pointer;
`;

const StatusList = styled.div`
  ${props => props.theme.FlexRow}
  align-items: center;
  gap: 0.5rem;
`;

const StatusColor = styled.div`
  width: 0.9375rem;
  height: 0.9375rem;
  ${props =>
    props.status === '처리전' &&
    css`
      background-color: #e12020;
    `};

  ${props =>
    props.status === '처리중' &&
    css`
      background-color: #ff9900;
    `};

  ${props =>
    props.status === '처리완료' &&
    css`
      background-color: #027cff;
    `};
  border-radius: 50%;
`;

const RequestType = styled.td`
  width: 5rem;
  min-width: 5rem;
  font-weight: 600;
`;

const CategoryName = styled.td`
  width: 4.375rem;
  min-width: 4.375rem;
`;

const ModelName = styled.td`
  min-width: 21.875rem;
  width: 21.875rem;
`;

const EmpName = styled.td`
  width: 4.375rem;
  min-width: 4.375rem;
`;

const DeptName = styled.td`
  width: 7.5rem;
  min-width: 7.5rem;
`;

const CreatedAt = styled.td`
  width: 13.75rem;
  min-width: 13.75rem;
`;

const Status = styled.td`
  width: 6rem;
  min-width: 6rem;
`;

const RequestTypeTh = styled.th`
  width: 5rem;
  min-width: 5rem;
`;

const CategoryNameTh = styled.th`
  width: 4.375rem;
  min-width: 4.375rem;
`;

const ModelNameTh = styled.th`
  min-width: 21.875rem;
  width: 21.875rem;
`;

const EmpNameTh = styled.th`
  width: 4.375rem;
  min-width: 4.375rem;
`;

const DeptNameTh = styled.th`
  width: 7.5rem;
  min-width: 7.5rem;
`;

const CreatedAtTh = styled.th`
  width: 13.75rem;
  min-width: 13.75rem;
`;

const StatusTh = styled.th`
  width: 6rem;
  min-width: 6rem;
`;
