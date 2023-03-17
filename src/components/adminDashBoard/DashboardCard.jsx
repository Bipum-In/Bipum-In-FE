import React from 'react';
import styled from 'styled-components';

export default function DashboardCard({
  categoryName,
  categoryImage,
  totalCount,
  useCount,
  repairCount,
  stockCount,
}) {
  return (
    <EquipementTypeContainer>
      <EquipementTypeBox>
        <EquipementType>
          <EquipementTypeImage categoryImage={categoryImage} />
          <EquipementTypeTitle>{categoryName}</EquipementTypeTitle>
          <EquipementTypeTotalContainer>
            <TypeTotal>총수량</TypeTotal>
            <Total>{totalCount}개</Total>
          </EquipementTypeTotalContainer>
          <EquipementTypeStatusContainer>
            <EquipementTypeUsingContainer>
              <TypeUsing>사용중</TypeUsing>
              <Using>{useCount}개</Using>
            </EquipementTypeUsingContainer>
            <EquipementTypeRepairContainer>
              <TypeRepair>수리 중</TypeRepair>
              <Repair>{repairCount}개</Repair>
            </EquipementTypeRepairContainer>
            <EquipementTypeStockContainer>
              <TypeStock>
                재고량
                <Stock>{stockCount}개</Stock>
              </TypeStock>
            </EquipementTypeStockContainer>
          </EquipementTypeStatusContainer>
        </EquipementType>
      </EquipementTypeBox>
    </EquipementTypeContainer>
  );
}

const EquipementTypeContainer = styled.div`
  border: 1px solid red;
  ${props => props.theme.FlexCol};
  width: 16.875rem;
  height: auto;
  min-height: 18.5625rem;
  background-color: white;
  box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4628rem;
  align-items: flex-start;
  margin-right: 1.5rem;
  margin-bottom: 1.5625rem;
`;

const EquipementTypeBox = styled.div`
  width: 12.9375rem;
  height: 14.25rem;
  margin-left: 1.9375rem;
  margin-top: 2.125rem;
`;

const EquipementType = styled.div`
  width: 3.9375rem;
  height: 6.5rem;
`;

const EquipementTypeImage = styled.div`
  background: url(${props => props.categoryImage});
  width: 3.9375rem;
  height: 3.9375rem;
`;

const EquipementTypeTitle = styled.p`
  font-size: 1.47rem;
  font-weight: 700;
  line-height: 1.2rem;
  margin-top: 1.2419rem;
`;

const EquipementTypeStatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1.1563rem;
  width: 12.9375rem;
  height: 3.1875rem;
`;

const EquipementTypeUsingContainer = styled.div`
  width: 2.8125rem;
  height: 3.1875rem;
`;
const TypeUsing = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0;
  margin-right: 1rem;
  margin-bottom: 0;
  color: #5f5f5f;
  font-size: 1.0625rem;
  line-height: 1.25rem;
  width: 2.8125rem;
  height: 1.25rem;
`;

const Using = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: black;
  margin-top: 0;
`;

const EquipementTypeRepairContainer = styled.div`
  gap: 0.375rem;
  width: 3.0625rem;
  height: 3.125rem;
  margin-left: 2rem;
`;

const TypeRepair = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3.0625rem;
  height: 1.25rem;
  margin-top: 0;
  font-size: 1.0625rem;
  line-height: 1.25rem;
  margin-bottom: 0;
`;

const Repair = styled.p`
  margin: 0 0.3125rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: black;
`;

const EquipementTypeStockContainer = styled.div`
  width: 3.0625rem;
  height: 3.125rem;
  margin-left: 2rem;
  gap: 0.375rem;
`;

const TypeStock = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
  width: 3.0625rem;
  height: 1.25rem;
  font-weight: 500;
  font-size: 1.0625rem;
  line-height: 1.25rem;
  text-align: center;
`;

const Stock = styled.p`
  margin: 0 0.3125rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: black;
`;

const EquipementTypeTotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.9375rem;

  width: 6rem;
  height: 1.5rem;
`;

const TypeTotal = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.125rem;
  width: 3.0625rem;
  height: 1.25rem;
  font-weight: 500;
  font-size: 1.0625rem;
  line-height: 1.25rem;
  text-align: center;
  color: #1479ff;
`;

const Total = styled.p`
  margin: 0 5px;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: ${props => props.theme.color.blue.brandColor6};
`;
