import React from 'react';
import { PatnerModal } from 'components/management/partner/AddPartnerModal';
import Button from 'elements/Button';
import { ReactComponent as WhiteAdd } from 'styles/commonIcon/whiteAdd.svg';
import styled from 'styled-components';

export default function PartnerAddBtn({
  setAddPatnerModal,
  addPatnerModal,
  handleModalClose,
}) {
  return (
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
