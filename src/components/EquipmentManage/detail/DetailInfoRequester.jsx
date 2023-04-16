import styled from 'styled-components';
import SelectCategory from '../../common/SelectCategory';
import SelectUser from '../../equipmentAdd/single/SelectUser';
import SelectCategoryList from '../../equipmentAdd/single/SelectCategoryList';
import Button from 'elements/Button';

export default function DetailInfoRequester({
  edit,
  optionNullList,
  editRequester,
  deptValue,
  detail,
  partners,
  onChangeDept,
  onChangePartners,
  onEditRequester,
}) {
  const {
    partnersName,
    deptName,
    empName,
    category: smallCategory,
  } = detail.supplyDetail;
  return (
    <DetailInfoContentContainer>
      <CategoryContainer>
        <TextType edit={edit}>
          <span>비품 종류</span>
          <span>{smallCategory}</span>
        </TextType>
      </CategoryContainer>
      <PartnersContainer>
        <TextType>
          <span>협력업체</span>
          {editRequester.partners ? (
            <Partners>
              <SelectCategory
                category={partners}
                optionNullName={optionNullList.partners}
                optionKey={'partnersName'}
                optionValueKey={'partnersId'}
                optionName={'partnersName'}
                onChangeCategory={onChangePartners}
              />
            </Partners>
          ) : (
            <span>{partnersName || ''}</span>
          )}
        </TextType>
        {edit && (
          <Button value={'partners'} onClick={onEditRequester}>
            수정
          </Button>
        )}
      </PartnersContainer>
      <DeptUserContainer>
        <TextType>
          <span>사용자</span>
          {editRequester.deptUser ? (
            <DeptUser>
              <SelectUser
                category={deptValue}
                optionNullName={[optionNullList.dept, optionNullList.user]}
                optionKey={['deptName', 'empName']}
                optionValueKey={['deptId', 'userId']}
                optionName={['deptName', 'empName']}
                onChangeCategory={onChangeDept}
              />
            </DeptUser>
          ) : (
            <span>{deptName && empName ? `${deptName} / ${empName}` : ''}</span>
          )}
        </TextType>
        {edit && (
          <Button value={'deptUser'} onClick={onEditRequester}>
            수정
          </Button>
        )}
      </DeptUserContainer>
    </DetailInfoContentContainer>
  );
}

const DetailInfoContentContainer = styled.div`
  /* div:first-child {
    padding: 0;
    padding-bottom: 1.125rem;
  }

  div:last-child {
    border-bottom: none;
  } */
`;

const CategoryContainer = styled.section`
  display: flex;
  article {
    padding: 0;
    padding-bottom: 1.125rem;
  }

  button {
    height: 2rem;
    border-bottom: 1px solid transparent;
    margin: 0;
    padding: 0 1rem;
    font-weight: 500;
    font-size: 13px;
  }
`;

const PartnersContainer = styled(CategoryContainer)`
  article {
    padding-bottom: 0;
    padding: 1.125rem 0;
  }

  select {
    padding: 0;
  }

  button {
    height: 2rem;
    border-bottom: 1px solid transparent;
    margin: 0;
    margin: 1.125rem 0rem;
    font-weight: 500;
    font-size: 13px;
  }
`;

const DeptUserContainer = styled(CategoryContainer)`
  article {
    padding-bottom: 0;
    padding: 1.125rem 0;
    border-bottom: 0;
  }

  button {
    height: 2rem;
    border-bottom: 1px solid transparent;
    margin: 0;
    margin: 1.125rem 0rem;
    font-weight: 500;
    font-size: 13px;
  }
`;

const TextType = styled.article`
  display: flex;
  align-items: center;
  height: ${props => props.edit && '3.1875rem'};
  min-width: 18.75rem;
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
