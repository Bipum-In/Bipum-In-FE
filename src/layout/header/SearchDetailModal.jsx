import EquipmentDetail from 'components/EquipmentManage/detail/EquipmentDetail';
import ModalHeader from 'components/common/ModalHeader';
import RequestModal from 'components/requestStatus/RequestModal';
import Modal from 'elements/Modal';
import React from 'react';
import styled from 'styled-components';

export default function SearchDetailModal({
  isAdmin,
  showModal,
  category,
  largeCategory,
  onDetailModal,
}) {
  const path = isAdmin ? '/admin' : '';
  return (
    <>
      {showModal && (
        <>
          <Modal isOpen={showModal.supplyShow} onClose={onDetailModal}>
            <EquipmentDetailWrapper>
              <ModalHeader isClose={onDetailModal} requestType={'비품 상세'} />
              <EquipmentDetail
                isAdmin={isAdmin}
                category={category}
                largeCategory={largeCategory}
                detailId={showModal.id}
                isClose={onDetailModal}
              />
            </EquipmentDetailWrapper>
          </Modal>
          <Modal isOpen={showModal.requestShow} onClose={onDetailModal}>
            <RequestModal
              isClose={onDetailModal}
              detailId={showModal.id}
              path={path}
              isAdmin={isAdmin}
            />
          </Modal>
        </>
      )}
    </>
  );
}

const EquipmentDetailWrapper = styled.div`
  ${props => props.theme.flexCol}
  min-width: 52.5rem;
  height: 80vh;
  width: 80vw;
`;
