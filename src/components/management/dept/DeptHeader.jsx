import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from 'styles/commonIcon/search.svg';
import Input from 'elements/Input';
import Button from 'elements/Button';
import { ReactComponent as WhiteAdd } from 'styles/commonIcon/whiteAdd.svg';
import { ReactComponent as CancelInput } from 'styles/commonIcon/cancelInput.svg';
import { getEncryptionStorage } from 'utils/encryptionStorage';
import { useModalState } from 'hooks/useModalState';
import { CustomModal } from 'elements/Modal';
import PLACEHOLDER from 'constants/placeholder';

export default function DeptHeader({
  setSelectName,
  containerHeaderRef,
  handleSubmit,
  setDeptName,
  deptName,
  employeeList,
  setFilteredEmployeeList,
}) {
  const [addPatnerModal, setAddPatnerModal] = useModalState();
  const handleModalClose = () => setAddPatnerModal(false);
  const handleDeptClear = () => setDeptName('');
  const handleChangeKeyword = e => setKeyword(e.target.value);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const filteredList = employeeList.filter(employee => {
      const values = Object.values(employee).map(value =>
        String(value).toLowerCase()
      );

      const keywordLowerCase = keyword.toLowerCase();
      return values.some(value => value.includes(keywordLowerCase));
    });
    setFilteredEmployeeList(filteredList);
  }, [employeeList, keyword, setFilteredEmployeeList]);

  return (
    <RequestShowTitle ref={containerHeaderRef}>
      <Title>
        {getEncryptionStorage().userRole !== 'MASTER'
          ? setSelectName
          : '비품 총괄 관리자 선임'}
      </Title>
      <SearchSelect>
        <SearchContainer>
          <SearchIconContainer>
            <Button>
              <Search />
            </Button>
          </SearchIconContainer>
          <Input
            value={keyword}
            setState={handleChangeKeyword}
            placeholder={PLACEHOLDER.ENTER_INPUT(
              '검색어를',
              '(이름, 전화번호 등)'
            )}
          />
        </SearchContainer>

        <BtnContainer>
          <Button mainBtn="fill" type="button" onClick={setAddPatnerModal}>
            <WhiteAdd />
            부서 추가
          </Button>
          <CustomModal
            width={'345px'}
            isOpen={addPatnerModal}
            onClose={handleModalClose}
            handleModalClose={handleModalClose}
            text={'추가'}
            submit={() => {
              handleSubmit();
              handleModalClose();
            }}
          >
            부서 추가
            <AddInputBox>
              <Input
                type="text"
                value={deptName}
                setState={e => setDeptName(e.target.value)}
                placeholder={PLACEHOLDER.ENTER_INPUT('부서를')}
              />
              {deptName && (
                <CancelInputWrapper onClick={handleDeptClear}>
                  <CancelInput />
                </CancelInputWrapper>
              )}
            </AddInputBox>
          </CustomModal>
        </BtnContainer>
      </SearchSelect>
    </RequestShowTitle>
  );
}

const CancelInputWrapper = styled.div`
  top: 50%;
  margin: auto;
  margin-top: 1.3125rem;
  transform: translateY(-50%);
  cursor: pointer;
  padding-right: 8px;
`;

const AddInputBox = styled.div`
  margin-top: 20px;
  background: #f7faff;
  border: 1px solid ${props => props.theme.color.blue.brandColor3};
  border-radius: 0.375rem;
  color: ${props => props.theme.color.blue.brandColor7};
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  input {
    padding: 8px;
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem 0.5rem 0.5rem 0;
    font-size: 1rem;
    line-height: 1.1875rem;
    ::placeholder {
      color: ${props => props.theme.color.blue.brandColor7};
    }
  }
`;

const BtnContainer = styled.div`
  button {
    background-color: ${props => props.theme.color.blue.brandColor5};
    margin-right: 2.5625rem;
    width: 6.75rem;
    height: 2.125rem;
  }
`;

const RequestShowTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.375rem;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor3};
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  margin-top: 1.75rem;
  margin: 1.75rem 2.5rem 0 2.5rem;
  white-space: nowrap;
`;

const SearchSelect = styled.div`
  ${props => props.theme.FlexRow}
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 1.5rem;
`;

const SearchContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  max-width: 28.375rem;
  width: 100%;
  height: 2.125rem;
  background-color: ${props => props.theme.color.grey.brandColor1};
  margin: 0;
  margin-right: 1rem;
  border-radius: 0.5rem;

  input {
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem 0.5rem 0.5rem 0;
  }

  @media (max-width: 64.5625rem) {
    width: 15rem;

    input::-webkit-input-placeholder {
      color: transparent;
    }
    input:-ms-input-placeholder {
      color: transparent;
    }
  }
`;

const SearchIconContainer = styled.div`
  padding: 0 1rem;
  button {
    padding: 0;
  }
`;
