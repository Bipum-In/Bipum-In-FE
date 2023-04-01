import React from 'react';
import styled from 'styled-components';
import { ReactComponent as NotFound } from 'styles/rendingIcon/NotFound.svg';
import Button from 'elements/Button';
import ROUTER from 'constants/routerConst';
import { useNavigate } from 'react-router-dom';
import { getEncryptionStorage } from '../utils/encryptionStorage';

export default function EmptyPage() {
  const navigate = useNavigate();
  const { isAdmin } = getEncryptionStorage();

  const handleReturnDashboard = () => {
    const local = Storage.getLocalStorageJSON(QUERY.STORAGE.LOCAL_NAME);
    if (local) {
      const { isAdmin } = local;
      const targetPath = isAdmin
        ? ROUTER.PATH.ADMIN.DASHBOARD
        : ROUTER.PATH.USER.DASHBOARD;
      navigate(targetPath);
    }
  };

  return (
    <>
      <EmptyPageWrapper>
        <EmptyContainer>
          <NotFound />
          <EmptyTextBox>
            <NotFoundTitle>페이지를 찾을 수 없습니다</NotFoundTitle>
            <NotFoundDesc>존재하지 않는 주소를 입력하셨거나,</NotFoundDesc>
            <NotFoundDesc>
              요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </NotFoundDesc>
            <ButtonBox>
              <Button onClick={() => navigate(-1)}>이전 페이지</Button>
              <Button onClick={handleReturnDashboard}>홈으로 이동</Button>
            </ButtonBox>
          </EmptyTextBox>
        </EmptyContainer>
      </EmptyPageWrapper>
    </>
  );
}

const ButtonBox = styled.div`
  ${props => props.theme.FlexRow};
  position: absolute;
  min-width: 264px;
  height: 3.3125rem;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  Button:first-child {
    color: ${props => props.theme.color.blue.brandColor6};
    border: 0.0625rem solid ${props => props.theme.color.blue.brandColor6};
    width: 7.6875rem;
    margin: auto;
    height: 3.3125rem;
    background-color: white;
  }

  Button:last-child {
    color: white;

    width: 7.6875rem;
    margin: auto;
    height: 3.3125rem;
    background-color: ${props => props.theme.color.blue.brandColor6};
  }
`;

const NotFoundDesc = styled.p`
  text-align: center;
  margin-top: 0;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 27px;
  margin-bottom: 0;
`;

const NotFoundTitle = styled.p`
  color: ${props => props.theme.color.blue.brandColor6};
  text-align: center;
  margin-top: 0;
  font-size: 3rem;
  font-weight: 600;
  line-height: 3.5625rem;
`;

const EmptyTextBox = styled.div`
  ${props => props.theme.FlexCol};
  align-items: center;
  margin-left: 5rem;
  width: 100%;
  max-width: 31.5rem;
  height: 15.3125rem;
  position: relative;
`;

const EmptyContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  width: 100%;
  max-width: 77.5rem;
  position: relative;
`;

const EmptyPageWrapper = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  ${props => props.theme.wh100};
  background-color: white;
`;
