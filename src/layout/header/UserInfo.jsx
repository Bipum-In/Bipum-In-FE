import React, { Suspense, lazy, useState } from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as ArrowDown } from 'styles/commonIcon/arrowDown.svg';
import useOutsideClick from 'hooks/useOutsideClick';
import { useSelector } from 'react-redux';
const UserInfoDetail = lazy(() => import('./UserInfoDetail'));

export default function UserInfo({
  isAdmin,
  userRole,
  logoutModal,
  headerData,
  handleLogoutBtn,
  handleModalClose,
}) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { getUserInfo } = useSelector(state => state.userInfo.userInfoList);

  const { empName, deptName, image } = getUserInfo || {};

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
  const dropDownRef = useOutsideClick(
    () => setIsDropdownVisible(false),
    isDropdownVisible
  );

  return (
    <LoginUserInfoDropDown
      onClick={toggleDropdown}
      dropDownVisible={isDropdownVisible ? 'visible' : ''}
      ref={dropDownRef}
    >
      <UserImgContainer userImg={image} userRole={userRole} />
      {getUserInfo && (
        <UserInfoDetailContainer>
          <InfoCompanyTitle>{deptName}</InfoCompanyTitle>
          <InfoUserName>
            {userRole !== 'MASTER' &&
              (isAdmin ? `${empName} 관리자` : `${empName} 님`)}
            {userRole === 'MASTER' && `${empName} 계정`}
          </InfoUserName>
        </UserInfoDetailContainer>
      )}
      <UserDropDown isRotated={isDropdownVisible}>
        <ArrowDown />
      </UserDropDown>
      {/* 드롭다운 디테일 */}
      <Suspense fallback={null}>
        <UserInfoDetail
          logoutModal={logoutModal}
          headerData={headerData}
          handleLogoutBtn={handleLogoutBtn}
          handleModalClose={handleModalClose}
        />
      </Suspense>
    </LoginUserInfoDropDown>
  );
}

const LoginUserInfoDropDown = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  align-items: center;
  padding: 0 0.375rem;
  width: 100%;
  min-width: 11.25rem;
  height: 3.75rem;
  gap: 0.375rem;
  background-color: white;
  border: 0.0625rem solid ${props => props.theme.color.grey.brandColor2};
  border-radius: 0.5rem;
  cursor: pointer;

  & > article {
    ${props =>
      props.dropDownVisible &&
      css`
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      `};
  }
`;

const UserImgContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.375rem;
  ${props =>
    props.userRole !== 'MASTER'
      ? css`
          background: url(${props => props.userImg}) no-repeat center center /
              cover,
            ${props => props.theme.color.grey.brandColor2};
        `
      : css`
          background: url(${props => props.userImg}) no-repeat
            ${props => props.theme.color.blue.brandColor2};
          background-size: 70%;
          background-position: center;
        `}
`;

const UserInfoDetailContainer = styled.div`
  ${props => props.theme.FlexCol};
  align-items: flex-start;
  justify-content: center;
  gap: 0.25rem;
  min-width: 5.625rem;
  white-space: nowrap;
`;
const InfoCompanyTitle = styled.span`
  font-size: 0.875rem;
  padding-top: 0.1875rem;
  color: ${props => props.theme.color.grey.brandColor6};
`;

const InfoUserName = styled.span`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.3125rem;
`;

const UserDropDown = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  margin-left: auto;
  width: 1.5rem;
  height: 1.5rem;
  transform: ${({ isRotated }) =>
    isRotated ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease;
  backface-visibility: hidden;
  will-change: transform;
`;
