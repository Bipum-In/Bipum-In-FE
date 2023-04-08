import styled from 'styled-components';
import Modal from 'elements/Modal';
import ModalHeader from '../common/ModalHeader';
import EquipmentDetail from './detail/EquipmentDetail';
import AddMultipleItem from '../equipmentAdd/AddMultipleItem';
import AddSingleItem from '../equipmentAdd/AddSingleItem';

export default function EquipmentModal({
  isAdmin,
  showDetailModal,
  showSingleModal,
  showMultipleModal,
  handleDetailModal,
  handleSingleModal,
  handleMultipleModal,
  category,
  largeCategory,
}) {
  return (
    <>
      <Modal isOpen={showDetailModal.show} onClose={handleDetailModal}>
        <EquipmentDetailWrapper>
          <ModalHeader isClose={handleDetailModal} requestType={'비품 상세'} />
          <EquipmentDetail
            isAdmin={isAdmin}
            category={category}
            largeCategory={largeCategory}
            detailId={showDetailModal.id}
            isClose={handleDetailModal}
          />
        </EquipmentDetailWrapper>
      </Modal>
      <Modal isOpen={showSingleModal} onClose={handleSingleModal}>
        <EquipmentAddWrapper>
          <ModalHeader isClose={handleSingleModal} requestType={'단일 등록'} />
          <AddSingleItem
            categoryList={category}
            largeCategoryList={largeCategory}
          />
        </EquipmentAddWrapper>
      </Modal>

      <Modal isOpen={showMultipleModal} onClose={handleMultipleModal}>
        <EquipmentAddWrapper>
          <ModalHeader
            isClose={handleMultipleModal}
            requestType={'복수 등록'}
          />
          <AddMultipleItem />
        </EquipmentAddWrapper>
      </Modal>
    </>
  );
}

const EquipmentDetailWrapper = styled.div`
  ${props => props.theme.flexCol}
  height: 80vh;
  width: 80vw;
`;
const EquipmentAddWrapper = styled.div`
  ${props => props.theme.flexCol}
  width: 80vw;
  height: 80vh;
  section {
    width: 100%;
    padding: 48px;
  }

  form {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;
