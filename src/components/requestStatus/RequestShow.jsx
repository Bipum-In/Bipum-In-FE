import { dblClick } from '@testing-library/user-event/dist/click';
import React from 'react';
import styled from 'styled-components';
import Input from '../../elements/Input';
import { ReactComponent as Search } from '../../styles/commonIcon/search.svg';
import { ReactComponent as ArrowDown } from '../../styles/commonIcon/arrowDown.svg';

export default function RequestShow({ setSelectName }) {
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
            <Select>
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
        <RequestShowListTitle>
          <Request>요청 구분</Request>
          <Applicant>신청자</Applicant>
          <DepartmentCharge>담당 부서</DepartmentCharge>
          <Type>종류</Type>
          <Model>모델명</Model>
          <ApplicationDate>신청일</ApplicationDate>
          <Status>상태</Status>
        </RequestShowListTitle>
        <RequestShowList>
          <RequestList>수리 요청</RequestList>
          <ApplicantList>김은지</ApplicantList>
          <DepartmentChargeList>개발팀</DepartmentChargeList>
          <TypeList>비디오 캠코더</TypeList>
          <ModelList>소니 FDR-AX7000</ModelList>
          <ApplicationDateList>2023.03.14(화) 오전 10:34</ApplicationDateList>
          <StatusList>
            <StatusColor color={'false'} />
            처리전
          </StatusList>
        </RequestShowList>
      </RequestShowBody>
    </RequestShowContainer>
  );
}

const RequestShowContainer = styled.div`
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

const RequestShowBody = styled.div``;

const RequestShowListTitle = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  width: 100%;
  height: 3.125rem;
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: ${props => props.theme.color.blue.brandColor1};
  margin-top: 1.5rem;
  /* padding: 0 10.875rem; */
  font-weight: 600;
  font-size: 1.25rem;
`;

const RequestShowList = styled.div`
  ${props => props.theme.FlexRow}

  align-items: center;
  height: 3rem;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor3};
  font-size: 17px;
`;

const Request = styled.div``;
const Applicant = styled.div`
  padding-left: 80px;
`;
const DepartmentCharge = styled.div`
  padding-left: 80px;
`;
const Type = styled.div`
  padding-left: 80px;
`;
const Model = styled.div`
  padding-left: 120px;
`;
const ApplicationDate = styled.div`
  padding-left: 160px;
`;
const Status = styled.div`
  padding-left: 200px;
`;

const RequestList = styled.div`
  padding-left: 145px;
`;
const ApplicantList = styled.div`
  padding-left: 90px;
`;
const DepartmentChargeList = styled.div`
  padding-left: 100px;
`;
const TypeList = styled.div`
  padding-left: 95px;
`;
const ModelList = styled.div`
  padding-left: 60px;
`;
const ApplicationDateList = styled.div`
  padding-left: 80px;
`;
const StatusList = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  padding-left: 55px;
  gap: 0.5rem;
`;

const StatusColor = styled.div`
  width: 0.9375rem;
  height: 0.9375rem;
  background-color: ${props => (props.color === 'false' ? 'red' : 'green')};
  border-radius: 50%;
`;
