import styled from 'styled-components';
import Modal from 'elements/Modal';
import ModalHeader from '../common/ModalHeader';
import EquipmentDetail from './detail/EquipmentDetail';
import AddMultipleItem from '../equipmentAdd/AddMultipleItem';
import AddSingleItem from '../equipmentAdd/AddSingleItem';

export default function EquipmentModal({
  isAdmin,
  showModal,
  handleDetailModal,
  handleSingleModal,
  handleMultipleModal,
  category,
  largeCategory,
}) {
  return (
    <>
      {showModal && (
        <>
          <Modal isOpen={showModal.detailShow} onClose={handleDetailModal}>
            <EquipmentDetailWrapper>
              <ModalHeader
                isClose={handleDetailModal}
                requestType={'비품 상세'}
              />
              <EquipmentDetail
                isAdmin={isAdmin}
                category={category}
                largeCategory={largeCategory}
                detailId={showModal.id}
                isClose={handleDetailModal}
              />
            </EquipmentDetailWrapper>
          </Modal>
          <Modal isOpen={showModal.singleShow} onClose={handleSingleModal}>
            <EquipmentAddWrapper>
              <ModalHeader
                isClose={handleSingleModal}
                requestType={'단일 등록'}
              />
              <AddSingleItem
                categoryList={category}
                largeCategoryList={largeCategory}
              />
            </EquipmentAddWrapper>
          </Modal>

          <Modal isOpen={showModal.multipleShow} onClose={handleMultipleModal}>
            <EquipmentAddWrapper>
              <ModalHeader
                isClose={handleMultipleModal}
                requestType={'복수 등록'}
              />
              <AddMultipleItem />
            </EquipmentAddWrapper>
          </Modal>
        </>
      )}
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
  justify-content: center;
  align-items: center;
  min-width: 52.5rem;
  width: 80vw;
  height: 80vh;

  form {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;
