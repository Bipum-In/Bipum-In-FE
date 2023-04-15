import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from 'styles/commonIcon/search.svg';
import { ReactComponent as ArrowDown } from 'styles/commonIcon/arrowDown.svg';
import Input from 'elements/Input';
import Button from 'elements/Button';
import { ReactComponent as WhiteAdd } from 'styles/commonIcon/whiteAdd.svg';
import { PatnerModal } from 'components/management/partner/AddPartnerModal';
import { useModalState } from 'hooks/useModalState';

export default function PartnerHeader({
  setSelectName,
  containerHeaderRef,
  keyword,
  setKeyword,
}) {
  const [addPatnerModal, setAddPatnerModal] = useModalState();
  const handleModalClose = () => setAddPatnerModal(false);

  return (
    <RequestShowTitle ref={containerHeaderRef}>
      <Title>{setSelectName}</Title>
      <SearchSelect>
        <SearchContainer>
          <SearchIconContainer>
            <Button>
              <Search />
            </Button>
          </SearchIconContainer>
          <Input
            value={keyword}
            setState={setKeyword}
            placeholder="검색어를 입력해주세요 (업체 등)"
          />
        </SearchContainer>

        <BtnContainer>
          <Button mainBtn="fill" type="button" onClick={setAddPatnerModal}>
            <WhiteAdd />
            협력 업체 등록
          </Button>
          <PatnerModal
            isOpen={addPatnerModal}
            onClose={handleModalClose}
            handleModalClose={handleModalClose}
            text={'등록완료'}
          />
        </BtnContainer>
      </SearchSelect>
    </RequestShowTitle>
  );
}

const BtnContainer = styled.div`
  button {
    background-color: ${props => props.theme.color.blue.brandColor5};
    margin-right: 2.5625rem;
    width: 8.725rem;
    height: 2.125rem;
  }
`;

const RequestShowTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
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
