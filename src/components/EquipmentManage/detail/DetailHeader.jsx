import styled from 'styled-components';
import Button from 'elements/Button';
import STRING from 'constants/string';
import { CustomModal } from 'elements/Modal';

export default function DetailHeader({
  edit,
  onSave,
  detail,
  onEdit,
  onDispose,
  onFromRequest,
  disposeModal,
  handleModalClose,
  handleDispose,
}) {
  const { supplyId, isAdmin, isMySupply, modelName } = detail.supplyDetail;
  return (
    <DetailHeaderContainer>
      {isAdmin ? (
        <>
          {edit ? (
            <SaveButton
              onClick={() => {
                onSave(supplyId);
              }}
            >
              저장
            </SaveButton>
          ) : (
            <>
              <DisposeButton onClick={onDispose}>폐기</DisposeButton>
              <EditButton onClick={onEdit}>수정</EditButton>
              <CustomModal
                isOpen={disposeModal}
                onClose={handleModalClose}
                submit={() => handleDispose(supplyId)}
                text={'페기'}
              >
                비품을 폐기하시겠습니까?
              </CustomModal>
            </>
          )}
        </>
      ) : (
        <>
          {isMySupply && (
            <>
              <ReportButton
                value={STRING.REQUEST_TYPES.REPORT}
                onClick={e => {
                  onFromRequest(e, supplyId, modelName);
                }}
              >
                보고서 작성
              </ReportButton>
              <ReturnButton
                value={STRING.REQUEST_TYPES.RETURN}
                onClick={e => {
                  onFromRequest(e, supplyId, modelName);
                }}
              >
                반납 요청
              </ReturnButton>
              <RepairButton
                value={STRING.REQUEST_TYPES.REPAIR}
                onClick={e => {
                  onFromRequest(e, supplyId, modelName);
                }}
              >
                수리 요청
              </RepairButton>
            </>
          )}
        </>
      )}
    </DetailHeaderContainer>
  );
}

const DetailHeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 2.25rem 0;
  gap: 0.5rem;
`;

const DisposeButton = styled(Button)`
  width: 3.9375rem;
  height: 2.0625rem;
  margin: 0;
  color: #6d5517;
  background-color: #efecd9;
`;

const SaveButton = styled(DisposeButton)`
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor6};
`;

const EditButton = styled(SaveButton)``;

const ReportButton = styled(Button)`
  width: 6.375rem;
  height: 2.0625rem;
  margin: 0;
  color: ${props => props.theme.color.grey.brandColor6};
  border: 1px solid ${props => props.theme.color.grey.brandColor6}; ;
`;

const ReturnButton = styled(ReportButton)`
  color: ${props => props.theme.color.blue.brandColor6};
  border: 1px solid ${props => props.theme.color.blue.brandColor6}; ;
`;

const RepairButton = styled(ReportButton)`
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor6};
  border: 1px solid ${props => props.theme.color.blue.brandColor6}; ;
`;
