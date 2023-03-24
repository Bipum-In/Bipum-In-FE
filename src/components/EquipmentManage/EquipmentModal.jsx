import styled from 'styled-components';
import Modal from '../../elements/Modal';
import ModalHeader from '../common/ModalHeader';
import AddSingleItem from '../equipmentAdd/AddSingleItem';
import EquipmentDetail from './detail/EquipmentDetail';

export default function EquipmentModal({
  showDetialModal,
  showSingleModal,
  handleDetailModal,
  handleSingleModal,
  category,
  largeCategory,
}) {
  return (
    <>
      <Modal isOpen={showDetialModal.show}>
        <EquipmentDetailWrapper>
          <ModalHeader isClose={handleDetailModal} requestType={'비품 상세'} />
          <EquipmentDetail detailId={showDetialModal.id} />
        </EquipmentDetailWrapper>
      </Modal>
      <Modal isOpen={showSingleModal}>
        <EquipmentAddWrapper>
          <ModalHeader isClose={handleSingleModal} requestType={'단일 등록'} />
          <AddSingleItem category={category} largeCategory={largeCategory} />
        </EquipmentAddWrapper>
      </Modal>
    </>
  );
}

const EquipmentDetailWrapper = styled.div`
  ${props => props.theme.flexCol}
  width: 80vw;
  height: 80vh;
`;

const EquipmentAddWrapper = styled.div`
  ${props => props.theme.flexCol}

  width: 80vw;
  height: 80vh;
  section {
    width: 100%;
    padding: 3rem;
  }

  article {
    height: 100%;
    margin: 0;
  }
`;
