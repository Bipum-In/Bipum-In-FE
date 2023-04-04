import React, { useRef } from 'react';
import styled from 'styled-components';
import { styleds } from './AdminDashBaordStyled';
import { useNavigate } from 'react-router-dom';
import AnchorBtn from '../AnchorBtn';
import { ReactComponent as RequestIcon } from 'styles/commonIcon/requestIcon.svg';
import { ReactComponent as ArrowIcon } from 'styles/commonIcon/arrowDown.svg';
import { ReactComponent as List } from 'styles/commonIcon/list.svg';
import { ManagementCards } from '../ManagementCard';
import ROUTER from 'constants/routerConst';
import STRING, { REQUEST_PAGES } from 'constants/string';
import { useDispatch } from 'react-redux';
import { initRequest, setRequestData } from 'redux/modules/requestStatus';

export default function ManagementStatus({ isAdmin, getDashboard }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminStr = STRING.IS_ADMIN(isAdmin);
  const {
    requestsCountDto: { countMap, modifiedAtMap },
  } = getDashboard.data;

  const requestTypeKey = useRef(
    Object.values(STRING.REQUEST_TYPES).filter(item => item !== 'ALL')
  ).current;

  const moveToRequset = key => {
    dispatch(initRequest());
    dispatch(setRequestData(REQUEST_PAGES[key]));
    navigate(
      ROUTER.PATH[isAdminStr][isAdmin ? 'REQUEST_STATUS' : 'REQUEST_LIST']
    );
  };
  return (
    <>
      {getDashboard && (
        <styleds.EquipmentTopContainer col="true" manage>
          <AnchorBtn
            onClick={() =>
              navigate(
                ROUTER.PATH[isAdminStr][
                  isAdmin ? 'REQUEST_STATUS' : 'REQUEST_LIST'
                ]
              )
            }
          >
            {isAdmin ? '요청 현황' : '요청 내역'}
            <ArrowIcon />
          </AnchorBtn>
          <ManagementWrapper>
            <ManagementAlertTopContainer>
              <NewAlertContainer
                onClick={() => {
                  moveToRequset('UNPROCESSED');
                }}
              >
                {isAdmin ? <RequestIcon /> : <List />}
                <NewAlertTitle>
                  {isAdmin ? '처리대기 요청' : '전체 요청 내역'}
                </NewAlertTitle>
                <NewAlertNum>
                  {isAdmin
                    ? countMap.UnProcessedRequests
                    : countMap.UnProcessedUserRequests}
                  건
                </NewAlertNum>
              </NewAlertContainer>
            </ManagementAlertTopContainer>
            <ManagementAlertBottomContainer>
              <ManagementCards
                requestTypeKey={requestTypeKey}
                requestsCountData={countMap}
                requestsDate={modifiedAtMap}
                moveToRequset={moveToRequset}
                requestKey={
                  isAdmin
                    ? [
                        'supplyRequests',

                        'returnRequests',
                        'repairRequests',
                        'ReportRequests',
                      ]
                    : [
                        'userCountSupply',

                        'userCountReturn',
                        'userCountRepair',
                        'userCountReport',
                      ]
                }
                modifiedAtKey={
                  isAdmin
                    ? [
                        'supplyModifiedAt',
                        'returnModifiedAt',
                        'repairModifiedAt',
                        'ReportModifiedAt',
                      ]
                    : [
                        'supplyUserModifiedAt',
                        'returnUserModifiedAt',
                        'repairUserModifiedAt',
                        'ReportUserModifiedAt',
                      ]
                }
              />
            </ManagementAlertBottomContainer>
          </ManagementWrapper>
        </styleds.EquipmentTopContainer>
      )}
    </>
  );
}

const ManagementWrapper = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: space-between;
`;

const ManagementAlertTopContainer = styled.div`
  position: relative;
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
  &:before {
    content: '';
    ${props => props.theme.AbsoluteTL};
    ${props => props.theme.wh100};
    ${props => props.theme.CursorActive};
  }
`;

const NewAlertTitle = styled.span`
  font-size: 1.125rem;
`;

const NewAlertNum = styled.span`
  font-size: 1.75rem;
  font-weight: bold;
`;
