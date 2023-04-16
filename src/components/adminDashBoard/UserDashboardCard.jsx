import React from 'react';
import styled from 'styled-components';
import STRING from 'constants/string';
import Button from 'elements/Button';

export default function UserDashboardCard({
  image,
  status,
  supplyId,
  supplyName,
  categoryName,
  onDetailModal,
  getCommonSupplyDtos,
  showCommonSupplyDtos,
}) {
  return (
    <>
      <CardWrapper
        onClick={() => {
          onDetailModal(supplyId);
        }}
      >
        <CategoryTitleContainer>
          <span>{categoryName}</span>
          <StatusContainer>
            <Status status={status} />
            {STRING.EQUIPMENT_STATUS[status]}
          </StatusContainer>
          {getCommonSupplyDtos && showCommonSupplyDtos && <Button>공용</Button>}
        </CategoryTitleContainer>
        <CategoryContainer>
          <SupplyNameTitle>
            <span>{supplyName}</span>
          </SupplyNameTitle>
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
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
`;

const CategoryTitleContainer = styled.div`
  display: flex;
  height: 1.875rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.125rem;
  gap: 0.375rem;
  padding-bottom: 1rem;
  button {
    font-size: 0.6875rem;
    margin: 0;
    padding: 0.375rem;
    background-color: ${props => props.theme.color.blue.brandColor5};
    color: white;
  }
`;

const SupplyNameTitle = styled.span`
  color: ${props => props.theme.color.blue.brandColor6};
  span {
    font-weight: 500;
    font-size: 0.875rem;
  }
`;

const ImageContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  img {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 1rem;
  }
`;

const StatusContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter}
  width: 3.875rem;
  height: 1.875rem;
  font-size: 0.75rem;
  background-color: ${props => props.theme.color.blue.brandColor1};
  border-radius: 0.5rem;
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
