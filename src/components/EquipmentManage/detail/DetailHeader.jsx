import styled from 'styled-components';
import Button from '../../../elements/Button';

export default function DetailHeader({
  edit,
  onSave,
  detail,
  onEdit,
  onDispose,
}) {
  const { supplyId, isAdmin } = detail.supplyDetail;
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
              <DisposeButton
                onClick={() => {
                  onDispose(supplyId);
                }}
              >
                폐기
              </DisposeButton>
              <EditButton onClick={onEdit}>수정</EditButton>
            </>
          )}
        </>
      ) : (
        <>
          <ReportButton>보고서 작성</ReportButton>
          <ReturnButton>반납요청</ReturnButton>
          <RepairButton>수리요청</RepairButton>
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
