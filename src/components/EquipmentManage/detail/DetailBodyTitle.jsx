import styled from 'styled-components';
import STRING from 'constants/string';

export default function DetailBodyTitle({ detail }) {
  const { modelName, status } = detail.supplyDetail;
  return (
    <DetailBodyTitleContainer>
      <span>{modelName}</span>
      <span>
        <Status status={status} />
        {STRING.EQUIPMENT_STATUS[status]}
      </span>
    </DetailBodyTitleContainer>
  );
}

const DetailBodyTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4375rem;
  margin-bottom: 1.25rem;

  span:first-child {
    font-weight: 600;
    font-size: 1.125rem;
  }

  span:last-child {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
  }
`;

const Status = styled.span`
  display: inline-block;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  margin-right: 0.25rem;

  ${props => props.status === 'USING' && `background-color: #37d259;`}
  ${props => props.status === 'REPAIRING' && `background-color: #f7b500;`}
  ${props => props.status === 'STOCK' && `background-color: #027cff;`}
`;
