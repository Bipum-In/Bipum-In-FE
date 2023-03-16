import React from 'react';
import styled from 'styled-components';
import Input from '../../elements/Input';
import { ReactComponent as Search } from '../../styles/commonIcon/search.svg';
import { ReactComponent as ArrowDown } from '../../styles/commonIcon/arrowDown.svg';
import { v4 as uuidv4 } from 'uuid';
import Pagination from 'react-js-pagination';

export default function RequestShow({
  requestData,
  setSelectName,
  page,
  pageSize,
  onPage,
  onChangeStatus,
}) {
  const { content, totalElements } = requestData.data;

  return (
    <RequestShowContainer>
      <RequestShowTitle>
        <Title>{setSelectName()}</Title>
        <SearchSelect>
          <SearchContainer>
            <SearchIconContainer>
              <Search />
            </SearchIconContainer>
            <Input placeholder="검색어를 입력해주세요 (신청자,담당부서 등)" />
          </SearchContainer>
          <SelectWrapper>
            <Select onChange={onChangeStatus}>
              <option value="전체 보기">전체 보기</option>
              <option value="처리전">처리전</option>
              <option value="처리중">수리중</option>
              <option value="처리 완료">처리 완료</option>
            </Select>
            <SelectArrow>
              <ArrowDown />
            </SelectArrow>
          </SelectWrapper>
        </SearchSelect>
      </RequestShowTitle>
      <RequestShowBody>
        <table>
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
                    <StatusColor />
                    {list.status}
                  </StatusList>
                </Status>
              </tr>
            </RequestShowList>
          ))}
        </table>
      </RequestShowBody>
      <PageContainer>
        <Pagination
          activePage={page}
          itemsCountPerPage={pageSize}
          totalItemsCount={totalElements}
          pageRangeDisplayed={5}
          onChange={onPage}
        />
      </PageContainer>
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

const RequestShowTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.75rem;
  margin-top: 1.75rem;
  margin-left: 2.5rem;
`;

const SearchSelect = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  margin-top: 1.5rem;
`;

const SearchContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  width: 28.375rem;
  height: 2.5rem;
  background-color: ${props => props.theme.color.grey.brandColor1};
  margin: 0;
  margin-right: 1.625rem;
  border-radius: 0.5rem;

  input {
    font-size: 1rem;
  }
`;

const SearchIconContainer = styled.div`
  padding: 0 1rem;
`;

const Select = styled.select`
  position: relative;
  width: 5.8125rem;
  height: 2.5rem;
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: ${props => props.theme.color.blue.brandColor1};
  border: 1px solid ${props => props.theme.color.blue.brandColor3};
  border-radius: 0.375rem;
  text-align-last: center;
  text-align: center;
  appearance: none;
  padding: 5px 10px;
  padding-right: 25px;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 5.8125rem;
  height: 2.5rem;
  margin-right: 1.9375rem;
`;

const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  height: 15px;
  width: 15px;
  transform: translateY(-50%);
  pointer-events: none;
  svg {
    width: 15px;
    height: 15px;
    * {
      stroke: ${props => props.theme.color.blue.brandColor6};
    }
  }
`;

const RequestShowBody = styled.div`
  /* display: table; */
  width: 100%;
  /* height: 100%; */
  margin-top: 1.5rem;

  table {
    width: 100%;
    table-layout: auto;
  }

  tr {
    display: table;
    margin: 0 auto;
    padding: 0 auto;
    line-height: 3.3125rem;
  }

  td {
    height: 100%;
    text-align: left;
    text-overflow: ellipsis;
    font-size: 1.0625rem;
    overflow: hidden;
    white-space: nowrap;
    /* padding: 0 3.75rem; */
  }
`;

const RequestShowListTitle = styled.thead`
  height: 50px;
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: ${props => props.theme.color.blue.brandColor1};
  font-weight: 600;
  font-size: 1.25rem;
  text-align: left;
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
  background-color: ${props => (props.color === 'false' ? 'red' : 'green')};
  border-radius: 50%;
`;

const RequestType = styled.td`
  width: 5rem;
  min-width: 5rem;
  /* padding-right: 3.125rem; */
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
  margin-right: 3.125rem;
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

const PageContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  color: ${props => props.theme.color.blue.brandColor6};
  width: 25rem;
  height: 3.125rem;
  transform: translate(-50%, -1rem);

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    gap: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    ${props => props.theme.FlexRow}
    ${props => props.theme.FlexCenter}
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 0.25rem;
  }
  ul.pagination li a {
    text-decoration: none;
    color: black;
    font-size: 1.125rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: ${props => props.theme.color.blue.brandColor6};
  }
`;

const PageBtn = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  background-color: ${props => props.theme.color.blue.brandColor6};
  border-radius: 0.25rem;
  text-align: center;
  line-height: 1.75rem;
  cursor: pointer;
`;
