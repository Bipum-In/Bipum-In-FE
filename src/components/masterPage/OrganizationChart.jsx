import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Button from 'elements/Button';
import { api } from 'api/axios';
import chartData from './chartData';
import ROUTER from 'constants/routerConst';
import { useNavigate } from 'react-router-dom';
import QUERY from 'constants/query';

export default function OrganizationChart() {
  const navigate = useNavigate();
  const [currentBtnData, setCurrentBtnData] = useState([]);

  const handleCurrentChart = e => {
    const teatName = e.target.innerHTML;

    if (currentBtnData.includes(teatName)) {
      setCurrentBtnData(
        currentBtnData.filter(currentBtn => currentBtn !== teatName)
      );
    } else {
      setCurrentBtnData([...currentBtnData, teatName]);
    }
  };

  const handlePostChart = () => {
    api
      .post(QUERY.END_POINT.DEPARTMENT.MASTER_LIST, {
        deptList: currentBtnData,
      })
      .then(() => navigate(ROUTER.PATH.MASTER.APPOINTMENT));
  };

  return (
    <>
      <SetUserInfo>
        <ChartTitleContainer>
          <ChartTitle>조직도 설정</ChartTitle>
          <ChartSubTitle>
            회사 내 부서를 추가해주세요. 부서 이름은 나중에 수정하거나 추가할 수
            있습니다.
          </ChartSubTitle>
        </ChartTitleContainer>
        <ChartContainer>
          {chartData.map(chart => (
            <ChartBtn
              key={uuidv4()}
              onClick={handleCurrentChart}
              active={currentBtnData.includes(chart.team)}
            >
              {chart.team}
            </ChartBtn>
          ))}
        </ChartContainer>
        <Button
          onClick={handlePostChart}
          submit
          disabled={currentBtnData.length === 0}
        >
          완료
        </Button>
      </SetUserInfo>
    </>
  );
}

const SetUserInfo = styled.div`
  position: absolute;
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  ${props => props.theme.Boxshadow};
  background: white;
  padding: 5rem 6.5625rem;
  gap: 3rem;
`;

const ChartTitleContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
`;

const ChartTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.79rem;
  color: ${props => props.theme.color.blue.brandColor6};
`;

const ChartSubTitle = styled.span`
  color: ${props => props.theme.color.grey.brandColor7};
  margin-top: 1rem;
`;

const ChartContainer = styled.div`
  margin: 0 auto;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 1rem;
  display: grid;
  justify-items: center;
`;

const ChartBtn = styled(Button)`
  border: ${props =>
    props.active ? 'none' : `1px solid ${props.theme.color.grey.brandColor5}`};
  width: 5.625rem;
  color: ${props =>
    props.active ? 'white' : props.theme.color.grey.brandColor5};
  background: ${props =>
    props.active ? props.theme.color.blue.brandColor6 : 'transparent'};
  transition: background-color 0.1s ease;
  ${props =>
    !props.active &&
    `
    &:hover {
      border: 1px solid ${props.theme.color.blue.brandColor5};
      background-color: ${props.theme.color.blue.brandColor2};
      color: ${props.theme.color.blue.brandColor5};
    }
  `}
`;
