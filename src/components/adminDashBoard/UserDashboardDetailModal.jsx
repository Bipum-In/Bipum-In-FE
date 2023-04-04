import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Modal from 'elements/Modal';
import ModalHeader from '../common/ModalHeader';
import EquipmentDetail from '../EquipmentManage/detail/EquipmentDetail';

export default function UserDashboardDetailModal({
  isAdmin,
  showDetailModal,
  onDetailModal,
}) {
  const { getCategory } = useSelector(state => state.equipmentStatus.category);

  return (
    <Modal isOpen={showDetailModal.show} onClose={onDetailModal}>
      <EquipmentDetailWrapper>
        <ModalHeader isClose={onDetailModal} requestType={'비품 상세'} />
        <EquipmentDetail
          isAdmin={isAdmin}
          category={getCategory?.category}
          largeCategory={getCategory?.largeCategory}
          detailId={showDetailModal.id}
          isClose={onDetailModal}
        />
      </EquipmentDetailWrapper>
    </Modal>
  );
}

const EquipmentDetailWrapper = styled.div`
  ${props => props.theme.flexCol}
  height: 80vh;
`;
