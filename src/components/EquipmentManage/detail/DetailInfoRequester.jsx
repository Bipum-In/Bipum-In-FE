import styled, { css } from 'styled-components';
import SelectCategory from '../../common/SelectCategory';
import SelectUser from '../../equipmentAdd/single/SelectUser';

export default function DetailInfoRequester({
  edit,
  deptValue,
  detail,
  partners,
  onChangeDept,
  onChangePartners,
}) {
  const { createdAt, partnersName, deptName, empName } = detail.supplyDetail;
  return (
    <DetailInfoContentContainer>
      <TextType>
        <span>등록 일자</span>
        <CreatedAt edit={edit}>{createdAt}</CreatedAt>
      </TextType>
      <TextType>
        <span>협력업체</span>
        {edit ? (
          <Partners>
            <SelectCategory
              category={partners}
              optionNullName="회사명"
              optionKey={'partnersName'}
              optionValueKey={'partnersId'}
              optionName={'partnersName'}
              onChangeCategory={onChangePartners}
            />
          </Partners>
        ) : (
          <span>{partnersName}</span>
        )}
      </TextType>
      <TextType>
        <span>사용자</span>
        {edit ? (
          <DeptUser>
            <SelectUser
              category={deptValue}
              optionNullName={['부서명', '사원명']}
              optionKey={['deptName', 'empName']}
              optionValueKey={['deptId', 'userId']}
              optionName={['deptName', 'empName']}
              onChangeCategory={onChangeDept}
            />
          </DeptUser>
        ) : (
          <span>{`${deptName} / ${empName}`}</span>
        )}
      </TextType>
    </DetailInfoContentContainer>
  );
}

const DetailInfoContentContainer = styled.div`
  div:first-child {
    padding: 0;
    padding-bottom: 1.125rem;
  }

  div:last-child {
    border-bottom: none;
  }
`;

const TextType = styled.div`
  display: flex;
  align-items: center;
  min-width: 13rem;
  padding: 1.125rem 0;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};

  span {
    font-weight: 500;
    font-size: 0.8125rem;
  }

  span:first-child {
    min-width: 6rem;
    color: ${props => props.theme.color.blue.brandColor6};
  }

  select {
    min-width: 4.5rem;
    height: 2rem;
    color: black;
    padding: 0 0.5rem;
    background-color: ${props => props.theme.color.grey.brandColor1};
    font-weight: 500;
    font-size: 13px;
    margin-right: 0.5rem;
  }

  input {
    height: 2rem;
    color: black;
    margin: 0;
    background-color: ${props => props.theme.color.grey.brandColor1};
    font-weight: 500;
    font-size: 13px;
  }
`;

const CreatedAt = styled.span`
  ${props =>
    props.edit &&
    css`
      display: flex;
      align-items: center;
      height: 2rem;
    `}
`;

const Partners = styled.div`
  min-width: 5rem;
`;

const DeptUser = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  div:first-child {
    padding: 0;
  }

  div {
    display: flex;
    align-items: center;
    height: 2rem;
  }
`;
