import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Modal from 'elements/Modal';
import ModalHeader from '../common/ModalHeader';
const EquipmentDetail = lazy(() =>
  import('../EquipmentManage/detail/EquipmentDetail')
);

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
        <Suspense fallback={null}>
          <EquipmentDetail
            isAdmin={isAdmin}
            category={getCategory?.category}
            largeCategory={getCategory?.largeCategory}
            detailId={showDetailModal.id}
            isClose={onDetailModal}
          />
        </Suspense>
      </EquipmentDetailWrapper>
    </Modal>
  );
}

const EquipmentDetailWrapper = styled.div`
  ${props => props.theme.flexCol}
  height: 80vh;
  width: 80vw;
`;
