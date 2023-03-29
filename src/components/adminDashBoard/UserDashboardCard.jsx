import React from 'react';
import styled from 'styled-components';
import STRING from '../../constants/string';

export default function UserDashboardCard({
  image,
  status,
  supplyId,
  supplyName,
  categoryName,
  onDetailModal,
}) {
  return (
    <>
      <CardWrapper
        onClick={() => {
          onDetailModal(supplyId);
        }}
      >
        <CategoryTitle>
          <span>{categoryName}</span>
          <span>
            <Status status={status} />
            {STRING.EQUIPMENT_STATUS[status]}
          </span>
        </CategoryTitle>
        <CategoryContainer>
          <TotalCountTitle>
            <span>{supplyName}</span>
          </TotalCountTitle>
          <ImageContainer>
            <img src={image} alt="categoryImg" />
          </ImageContainer>
        </CategoryContainer>
      </CardWrapper>
    </>
  );
}

const CardWrapper = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: center;
  width: 15rem;
  padding: 1.5rem;
  background-color: white;
  border: 0.0625rem solid ${props => props.theme.color.grey.brandColor2};
  ${props => props.theme.Boxshadow};
  cursor: pointer;
`;

const CategoryContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter}
  gap: 1.25rem;
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.125rem;
  gap: 10px;

  span:last-child {
    font-weight: 400;
    font-size: 12px;
  }
`;

const TotalCountTitle = styled.span`
  color: ${props => props.theme.color.blue.brandColor6};

  span {
    font-weight: 500;
    font-size: 0.875rem;
  }
`;

const ImageContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  justify-content: space-between;

  img {
    width: 5.5rem;
    height: 5.5rem;
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
