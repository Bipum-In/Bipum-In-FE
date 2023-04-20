import React from 'react';
import styled from 'styled-components';
import { ReactComponent as WhiteAdd } from 'styles/commonIcon/whiteAdd.svg';
import { ReactComponent as XClose } from 'styles/commonIcon/close.svg';

import Button from 'elements/Button';
import RequestBox from './RequestBox';
import Modal from 'elements/Modal';

export default function PartnerAddBtn({
  isOpen,
  onClose,
  setAddPatnerModal,
  handleModalClose,
}) {
  return (
    <BtnContainer>
      <Button mainBtn="fill" type="button" onClick={setAddPatnerModal}>
        <WhiteAdd />
        협력 업체 등록
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <TitleContainer>
          <Type>협력 업체 등록</Type>
          <Close>
            <Button onClick={onClose}>
              <XClose />
            </Button>
          </Close>
        </TitleContainer>
        <ModalMsgContainer width={'313px'}>
          <RequestBox handleModalClose={handleModalClose} />
        </ModalMsgContainer>
      </Modal>
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

const TitleContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.875rem;
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor7};
  padding: 0 3.9375rem;
  border-radius: 1rem 1rem 0 0;
`;

const Type = styled.div`
  font-size: 1.0625rem;
  font-weight: 700;
`;

const Close = styled.div`
  button {
    font-size: 1.0625rem;
    font-weight: 700;
  }
`;

const ModalMsgContainer = styled.div`
  ${props => props.theme.FlexCol};
  font-size: 1rem;
  padding: 3.125rem 4.0625rem 2.1875rem 4.0625rem;
  text-align: center;
  letter-spacing: -0.5px;
  white-space: pre-line;
  min-width: ${props => props.width};
`;
