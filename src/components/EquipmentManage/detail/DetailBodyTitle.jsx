import styled from 'styled-components';
import STRING from 'constants/string';

export default function DetailBodyTitle({ detail }) {
  const { category, modelName, status } = detail.supplyDetail;
  return (
    <DetailBodyTitleContainer>
      <p>{category}</p>
      <div>
        <span>{modelName}</span>
        <span>
          <Status status={status} />
          {STRING.EQUIPMENT_STATUS[status]}
        </span>
      </div>
    </DetailBodyTitleContainer>
  );
}

const DetailBodyTitleContainer = styled.div`
  ${props => props.theme.flexRow}
  align-items: center;
  margin-bottom: 1.25rem;

  & > p {
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  & > div {
    display: flex;
    gap: 1.4375rem;
    span:first-child {
      color: ${props => props.theme.color.blue.brandColor5};
      font-weight: 600;
      font-size: 1.125rem;
    }

    span:last-child {
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 12px;
    }
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
