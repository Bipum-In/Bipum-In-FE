import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import DashboardCard from '../../components/adminDashBoard/DashboardCard';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as NewIcon } from '../../styles/commonIcon/new.svg';
import AnchorBtn from '../../components/adminDashBoard/AnchorBtn';
import { useDispatch, useSelector } from 'react-redux';
import { __dashboardStatus } from '../../redux/modules/dashboardStatus';
import { ManagementCards } from '../../components/adminDashBoard/ManagementCard';
import { dashboardAlertData } from '../../mock/dashboardAlertData';
import { FormatKoreanTime } from '../../utils/formatDate';

export default function AdminDashBoard() {
  const dispatch = useDispatch();

  const { getDashboard, isDashboardError } = useSelector(
    state => state.dashboardStatus.dashboardStatus
  );

  useEffect(() => {
    dispatch(__dashboardStatus());
  }, [dispatch]);

  if (isDashboardError) return <div>에러 발생</div>;

  const categoryCardData = getDashboard?.data?.supplyCountDtos;
  const requestsCountData = getDashboard?.data?.requestsCountDto.countMap;
  const requestsDate = getDashboard?.data?.requestsCountDto.modifiedAtMap;
  const totalRequestCount = requestsCountData
    ? Object.values(requestsCountData).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    : 0;

  //mookdata
  const alertData = dashboardAlertData.data.alertDtos;
  console.log(alertData);

  return (
    <>
      {getDashboard && (
        <AdminDashBoardWrapper>
          <TopSideContainer>
            <EquipmentTopContainer col="true">
              <AnchorBtn onClick={() => {}}>관리 현황</AnchorBtn>
              <ManagementWrapper>
                <ManagementAlertTopContainer>
                  <NewAlertContainer>
                    <NewIcon />
                    <NewAlertTitle>새로운 요청</NewAlertTitle>
                    <NewAlertNum>{totalRequestCount}건</NewAlertNum>
                  </NewAlertContainer>
                </ManagementAlertTopContainer>
                <ManagementAlertBottomContainer>
                  <ManagementCards
                    requestsCountData={requestsCountData}
                    requestsDate={requestsDate}
                  />
                </ManagementAlertBottomContainer>
              </ManagementWrapper>
            </EquipmentTopContainer>

            <EquipmentTopContainer col="true">
              <AnchorBtn onClick={() => {}}>알림</AnchorBtn>
              <AlertAndAddContainer>
                {alertData.map(data => (
                  <AlertListContainer>
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
              </AlertAndAddContainer>
            </EquipmentTopContainer>

            <EquipmentTopContainer>
              <AnchorBtn onClick={() => {}}>추가기능</AnchorBtn>
              <AlertAndAddContainer></AlertAndAddContainer>
            </EquipmentTopContainer>
          </TopSideContainer>
          <CategorySideWrapper>
            <AnchorBtn onClick={() => {}}>비품 카테고리</AnchorBtn>
            <EquipmentBottomContainer>
              {categoryCardData.map(card => (
                <DashboardCard
                  key={uuidv4()}
                  totalCount={card.totalCount}
                  categoryName={card.categoryName}
                  useCount={card.useCount}
                  repairCount={card.repairCount}
                  stockCount={card.stockCount}
                />
              ))}
            </EquipmentBottomContainer>
          </CategorySideWrapper>
        </AdminDashBoardWrapper>
      )}
    </>
  );
}

const AdminDashBoardWrapper = styled.div`
  ${props => props.theme.FlexCol};
`;

const TopSideContainer = styled.div`
  ${props => props.theme.FlexRow};
  width: 100%;
  padding-bottom: 2.5rem;
  gap: 3.5rem;
  @media (max-width: ${props => props.theme.screen.dashboardFullWidth}) {
    ${props => props.theme.FlexRow};
    flex-wrap: wrap;
  }
  @media (max-width: ${props => props.theme.screen.fullWideDesktop}) {
    ${props => props.theme.FlexCol};
  }
`;

const EquipmentTopContainer = styled.div`
  ${props => props.theme.FlexCol};
  /* width: 33%; */

  /* ${props =>
    props.col === 'true' &&
    css`
      @media (max-width: ${props => props.theme.screen.dashboardFullWidth}) {
        width: 47%;
      }
    `} */

  @media (max-width: ${props => props.theme.screen.fullWideDesktop}) {
    width: 100%;
  }
`;

const CategorySideWrapper = styled.div`
  position: relative;
  ${props => props.theme.FlexCol};
  align-items: flex-start;
  width: 100%;
`;

const EquipmentBottomContainer = styled.div`
  ${props => props.theme.FlexRow};
  margin: 1.5625rem auto;
  flex-wrap: wrap;
  width: 100%;
  gap: 1.25rem;
`;

const ManagementWrapper = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: space-between;
`;

const ManagementAlertTopContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  background-color: ${props => props.theme.color.blue.brandColor6};
  box-shadow: 0.1888rem 0.1888rem 0.944rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 100%;
  min-width: 39.8125rem;
  padding: 1rem;
  height: 9.25rem;
  margin-bottom: 1rem;
  * {
    color: white;
    stroke: white;
  }
`;

const ManagementAlertBottomContainer = styled.div`
  ${props => props.theme.FlexRow};
  gap: 1rem;
`;

const NewAlertContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  gap: 1rem;
`;

const NewAlertTitle = styled.span`
  font-size: 1.125rem;
`;

const NewAlertNum = styled.span`
  font-size: 1.75rem;
  font-weight: bold;
`;

const AlertAndAddContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.Boxshadow};
  border: 0.0625rem solid ${props => props.theme.color.grey.brandColor2};
  background-color: white;
  padding: 1.5625rem;
  width: 28.25rem;
  min-height: 19.5rem;
`;

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
