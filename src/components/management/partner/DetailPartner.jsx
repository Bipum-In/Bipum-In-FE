import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'elements/Button';
import Input from 'elements/Input';
import { CustomModal } from 'elements/Modal';
import ModalHeader from '../../common/ModalHeader';
import { ReactComponent as BlackCancel } from 'styles/commonIcon/blackCancel.svg';
import { useModalState } from 'hooks/useModalState';
import STRING from 'constants/string';
import { api } from 'api/axios';
import { useDispatch } from 'react-redux';
import { getPartnersList } from 'redux/modules/partnersList';

export default function DetailPartner({ isClose, result, page }) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editedValue, setEditedValue] = useState(result);
  const [addSmallModal, setAddSmallModal] = useModalState();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedValue(prevState => ({ ...prevState, [name]: value }));
  };
  const handleClear = name => {
    setEditedValue(prevState => ({ ...prevState, [name]: '' }));
  };

  const handleEditClick = () => setIsEdit(true);
  const handleModalClose = () => setAddSmallModal(false);
  const handleDelete = () => deletePartner(result.partnersId);

  const deletePartner = partnersId =>
    api
      .delete(`/api/partners/${partnersId}`)
      .then(() => {
        dispatch(getPartnersList({ page, size: 10 }));
        handleModalClose();
        isClose();
      })
      .catch();

  const handleSaveClick = () => {
    api
      .put(`/api/partners/${editedValue.partnersId}`, editedValue)
      .then(response => {
        isClose();
        dispatch(getPartnersList({ page, size: 10 }));
      })
      .catch(error => {});
  };

  const renderInputField = (title, name, value) => {
    return (
      <Box>
        <TitleBox>
          <Title>{title}</Title>
        </TitleBox>
        {isEdit ? (
          <>
            <Input
              type="text"
              name={name}
              value={value}
              setState={handleInputChange}
            />
            {value && (
              <CancelInputWrapper onClick={() => handleClear(name)}>
                <CancelIcon />
              </CancelInputWrapper>
            )}
          </>
        ) : (
          <Desc>{value}</Desc>
        )}
      </Box>
    );
  };

  return (
    <DetailModalWrapper>
      <ModalHeader
        isClose={isClose}
        requestType={STRING.MANAGEMENT_TITLE.PARTNER}
      />
      <ModalContainer>
        <PartnerValue>
          {renderInputField('업체명', 'partnersName', editedValue.partnersName)}
          {renderInputField('전화 번호', 'phone', editedValue.phone)}
          {renderInputField('이메일', 'email', editedValue.email)}
          {renderInputField('주소', 'address', editedValue.address)}
        </PartnerValue>

        {isEdit ? (
          <SaveBtnContainer>
            <Button mainBtn="fill" type="button" onClick={handleSaveClick}>
              저장
            </Button>
          </SaveBtnContainer>
        ) : (
          <>
            <ModalBtnContainer>
              <Button mainBtn="border" type="button" onClick={handleEditClick}>
                수정
              </Button>
              <Button mainBtn="fill" type="button" onClick={setAddSmallModal}>
                삭제
              </Button>
            </ModalBtnContainer>
          </>
        )}
        <CustomModal
          isOpen={addSmallModal}
          onClose={() => setAddSmallModal(false)}
          submit={handleDelete}
          text={'네'}
        >
          정말 삭제 하시겠습니까?
        </CustomModal>
      </ModalContainer>
    </DetailModalWrapper>
  );
}

const CancelInputWrapper = styled.div`
  display: flex;
  ${props => props.theme.FlexCenter};
  position: relative;
  cursor: pointer;
`;

const CancelIcon = styled(BlackCancel)`
  position: absolute;
  right: 0.5rem;
  height: 1rem;
  width: 1rem;
`;

const SaveBtnContainer = styled.div`
  button {
    width: 27.6875rem;
    height: 2.75rem;
    border-radius: 0.25rem;
  }
`;

const ModalBtnContainer = styled.div`
  ${props => props.theme.FlexRow};
  gap: 2.5rem;
  button {
    width: 12.625rem;
    height: 2.5rem;
    border-radius: 0.25rem;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 3.75rem;
  border-bottom: 0.0625rem solid ${props => props.theme.color.grey.brandColor3};

  input {
    width: 12rem;
    height: 2.125rem;
    background: #f5f5f5;
    border-radius: 0.5rem;
    padding: 0.5rem 2rem 0.5625rem 1rem;
  }
`;

const Title = styled.p`
  color: ${props => props.theme.color.blue.brandColor6};
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1.125rem;
`;

const TitleBox = styled.div`
  width: 3.7rem;
  margin-right: 1.3125rem;
`;

const PartnerValue = styled.div`
  ${props => props.theme.FlexCol};
`;

const ModalContainer = styled.div`
  ${props => props.theme.FlexCol};
  padding: 30px 63px;
  gap: 1.5rem;
`;

const Desc = styled.span`
  margin-left: 2.375rem;
`;

const DetailModalWrapper = styled.div`
  width: 35.625rem;
  height: 100%;
`;
