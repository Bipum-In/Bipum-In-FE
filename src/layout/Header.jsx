import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styled, { css } from 'styled-components';
import { ReactComponent as Search } from 'styles/commonIcon/search.svg';
import { ReactComponent as Alaram } from 'styles/commonIcon/alarm.svg';
import { ReactComponent as Rotate } from 'styles/headerIcon/rotate.svg';
import { ReactComponent as Useinfo } from 'styles/headerIcon/useinfo.svg';
import { ReactComponent as Logout } from 'styles/sidebarIcon/logout.svg';
import { ReactComponent as ArrowDown } from 'styles/commonIcon/arrowDown.svg';
import { ReactComponent as Setting } from 'styles/headerIcon/setting.svg';

import STRING from 'constants/string';
import QUERY from 'constants/query';
import ROUTER from 'constants/routerConst';

import { CustomModal } from 'elements/Modal';
import useOutsideClick from 'hooks/useOutsideClick';
import { useModalState } from 'hooks/useModalState';

import {
  getEncryptionStorage,
  updateEncryptionStorage,
} from 'utils/encryptionStorage';
import Storage from 'utils/localStorage';
import { removeCookie } from 'utils/cookie';

import SSE from 'api/sse';
import { setAdminSSE, setUserSSE } from 'redux/modules/sseSlice';

export default function Header() {
  const [logoutModal, setLogoutModal] = useModalState();
  const handleModalShow = () => setLogoutModal();
  const handleModalClose = () => setLogoutModal(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropDownRef = useOutsideClick(() => setIsDropdownVisible(false));

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const { empName, deptName, image, isAdmin, userRole } =
    getEncryptionStorage();

  const { sseAdminLength, sseUserLength } = useSelector(
    state => state.sseSlice
  );

  const headerData = [
    {
      icon: <Useinfo />,
      text: STRING.HEADER_DROPDOWN.USERINFO,
      path: '',
    },
    {
      icon: <Rotate />,
      text: isAdmin
        ? STRING.HEADER_DROPDOWN.USERMODE
        : STRING.HEADER_DROPDOWN.ADMINMODE,
      onclick: () => {
        updateEncryptionStorage('isAdmin', !isAdmin);
        navigate(
          isAdmin ? ROUTER.PATH.USER.DASHBOARD : ROUTER.PATH.ADMIN.DASHBOARD
        );
      },
    },
    {
      icon: <Logout />,
      text: STRING.HEADER_DROPDOWN.LOGOOUT,
      onclick: handleModalShow,
    },
  ];

  if (isAdmin) {
    headerData.splice(2, 0, {
      icon: <Setting />,
      text: STRING.HEADER_DROPDOWN.SETTINGS,
      path: ROUTER.PATH.ADMIN.MANAGEMENT,
    });
  }

  const handleLogoutBtn = e => {
    e.preventDefault();
    removeCookie(QUERY.COOKIE.COOKIE_NAME);
    Storage.clearLocalStorage();
    navigate('/');
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/subscribe`;
    const sse = new SSE(url, 20);

    sse.onOpen(event => {
      console.log('open', event);
    });

    sse.onMessage(event => {
      const checkJSON = event.data.split(' ')[0];
      const data = checkJSON !== 'EventStream' && JSON.parse(event.data);
      data && data.acceptResult && dispatch(setUserSSE(data));
      data && !data.acceptResult && dispatch(setAdminSSE(data));
    });

    sse.onError(error => {
      console.log(error);
    });

    return () => {
      sse.close();
      console.log('close');
    };
  }, []);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <ItemContainer>
          {/* 검색창 */}
          <SearchContainer>
            <IconContainer search="true">
              <Search />
            </IconContainer>
            <SearchInput placeholder="검색어를 입력하세요." />
          </SearchContainer>
          {/* 헤더 오른쪽 아이템 */}
          <HeaderRightContainer>
            <IconContainer>
              <Alaram />
              {isAdmin
                ? sseAdminLength && <AlaramCount>{sseAdminLength}</AlaramCount>
                : sseUserLength && <AlaramCount>{sseUserLength}</AlaramCount>}
            </IconContainer>
            {/* 드롭다운 컨테이너 */}
            <LoginUserInfoDropDown
              onClick={toggleDropdown}
              className={isDropdownVisible ? 'visible' : ''}
              ref={dropDownRef}
            >
              <UserImgContainer userImg={image} />
              <UserInfoDetailContainer>
                <InfoCompanyTitle>{deptName}</InfoCompanyTitle>
                <InfoUserName>
                  {empName} {isAdmin && '관리자'}님
                </InfoUserName>
              </UserInfoDetailContainer>
              <UserDropDown isRotated={isDropdownVisible}>
                <ArrowDown />
              </UserDropDown>
              {/* 드롭다운 디테일 */}
              <DropdownContainer>
                <DropdownBox>
                  {headerData.map(item => (
                    <DropdownList
                      key={uuidv4()}
                      onClick={item.onclick || (() => navigate(item.path))}
                    >
                      {item.icon}
                      {item.text}
                    </DropdownList>
                  ))}
                  <CustomModal
                    isOpen={logoutModal}
                    onClose={handleModalClose}
                    submit={handleLogoutBtn}
                    text={'로그아웃'}
                  >
                    정말 로그아웃 하시겠습니까?
                  </CustomModal>
                </DropdownBox>
              </DropdownContainer>
            </LoginUserInfoDropDown>
          </HeaderRightContainer>
        </ItemContainer>
      </HeaderContainer>
    </HeaderWrapper>
  );
}
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 6.25rem;
  z-index: 999;
  background-color: ${props => props.theme.color.blue.brandColor7};
`;

const DropdownBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  * svg {
    cursor: pointer;
    width: 1.25rem;
    height: 1.125rem;
  }
`;

const DropdownList = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  padding: 0.5rem 1rem;
  gap: 1rem;
  &:hover {
    background-color: ${props => props.theme.color.grey.brandColor1};
  }
`;

const HeaderContainer = styled.div`
  width: calc(100vw - 12.5rem);
  margin-left: auto;
  height: 100%;
  @media (max-width: ${props => props.theme.screen.desktop}) {
    width: calc(100vw);
  }
`;

const ItemContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 3.25rem;
  * svg {
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  min-width: 25.875rem;
  width: 28.375rem;
  height: 3.125rem;
  background-color: white;
  border-radius: 0.5rem;
  margin-right: 2rem;
  @media (max-width: ${props => props.theme.screen.desktop}) {
    margin-left: 2rem;
  }
`;

const IconContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  width: 1.875rem;
  height: 1.875rem;
  ${props =>
    props.search === 'true' &&
    css`
      margin: 0 0.8125rem 0 1.3125rem;
    `}
  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const AlaramCount = styled.div`
  position: absolute;
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  width: 0.9375rem;
  height: 0.9375rem;
  color: white;
  border-radius: 50%;
  background-color: red;
  transform: translate(0.7rem, -0.7rem);
`;

const SearchInput = styled.input`
  border: none;
  width: 100%;
  line-height: 1.3125rem;
  font-size: 1rem;
  color: ${props => props.theme.color.grey.brandColor7};
`;

const HeaderRightContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  margin-left: auto;
  gap: 1.875rem;
`;

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
`;

const UserImgContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.375rem;
  background: url(${props => props.userImg}) no-repeat center center / cover,
    ${props => props.theme.color.grey.brandColor2};
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

const DropdownContainer = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  width: 100%;
  padding: 0.5rem 0;
  background-color: white;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  z-index: 10;
  opacity: 0;
  transform: translateY(-1.25rem);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  ${LoginUserInfoDropDown}.visible & {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;
