import React from 'react';
import styled from 'styled-components';
import { styleds } from './AdminDashBaordStyled';
import AnchorBtn from '../AnchorBtn';
import { dashboardAlertData } from '../../../mock/dashboardAlertData';
import { v4 as uuidv4 } from 'uuid';
import { FormatKoreanTime } from '../../../utils/formatDate';

export default function AlertStatus() {
  //mookdata
  const { alertDtos } = dashboardAlertData.data;

  return (
    <>
      {alertDtos && (
        <styleds.EquipmentTopContainer col="true">
          <AnchorBtn onClick={() => {}}>알림</AnchorBtn>
          <styleds.AlertAndAddContainer>
            {alertDtos.map(data => (
              <AlertListContainer key={uuidv4()}>
                <AlertImgContainer>
                  <AlertImg src={data.alertImg} alt="" />
                </AlertImgContainer>
                <AlertDetailContainer>
                  <AlertTitle>{data.alertTitle}</AlertTitle>
                  <AlertData>
                    {FormatKoreanTime(data.alertModifiedAt)}
                  </AlertData>
                </AlertDetailContainer>
              </AlertListContainer>
            ))}
          </styleds.AlertAndAddContainer>
        </styleds.EquipmentTopContainer>
      )}
    </>
  );
}

const AlertListContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.0625rem;
  &:before {
    content: '';
    position: absolute;
    bottom: -1.03125rem;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.color.grey.brandColor2};
  }
  &:last-child {
    margin-bottom: 0;
  }
  &:last-child:before {
    display: none;
  }
`;

const AlertImgContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.3125rem;
`;
const AlertImg = styled.img`
  object-fit: cover;
  ${props => props.theme.wh100};
`;

const AlertDetailContainer = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: space-around;
  height: 100%;
`;

const AlertTitle = styled.span`
  font-size: 0.875rem;
`;
const AlertData = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.color.grey.brandColor5};
`;
