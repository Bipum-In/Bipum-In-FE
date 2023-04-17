import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styled, { css } from 'styled-components';

import { ReactComponent as Rotate } from 'styles/headerIcon/rotate.svg';
import { ReactComponent as Useinfo } from 'styles/headerIcon/useinfo.svg';
import { ReactComponent as Logout } from 'styles/sidebarIcon/logout.svg';
import { ReactComponent as ArrowDown } from 'styles/commonIcon/arrowDown.svg';
import { ReactComponent as Setting } from 'styles/headerIcon/setting.svg';

import STRING from 'constants/string';
import ROUTER from 'constants/routerConst';

import SearchDetailModal from './SearchDetailModal';
import Search from 'layout/header/Search';
import { CustomModal } from 'elements/Modal';
import { useModalState } from 'hooks/useModalState';
import useOutsideClick from 'hooks/useOutsideClick';
import useThrottleCallback from 'hooks/useThrottleCallback';
import useDebouncedCallback from 'hooks/useDebounce';

import { updateEncryptionStorage } from 'utils/encryptionStorage';

import SSE from 'api/sse';
import Axios from 'api/axios';
import logout from 'utils/logout';

import { userInfoSlice } from '../../redux/modules/userInfoSlice';
import {
  deleteAllAdminSseLength,
  deleteAllUerSseLength,
  setAdminSSE,
  setSSECount,
  setUserSSE,
} from 'redux/modules/sseSlice';
import { getSearch, initSearchHeader } from 'redux/modules/searchHeader';
import { getCategoryList } from 'redux/modules/equipmentStatus';
import Alarm from './Alarm';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function Header({ isAdmin, userRole }) {
  const [logoutModal, setLogoutModal] = useModalState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAlarm, setShowAlarm] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState({
    supplyShow: false,
    requestShow: false,
    id: null,
  });

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const dropDownRef = useOutsideClick(
    () => setIsDropdownVisible(false),
    isDropdownVisible
  );

  const searchOutsideRef = useOutsideClick(() => {
    initSearchData();
    setShowModal({ supplyShow: false, requestShow: false, id: null });
  }, searchValue);

  const alarmOutsideRef = useOutsideClick(() => {
    setShowAlarm(false);
  }, showAlarm);

  const {
    sseSlice: { sseAdminLength, sseUserLength },
    searchHeader: {
      searchData: { search },
    },
    equipmentStatus: {
      category: { getCategory },
    },
  } = useSelector(state => state);

  const { getUserInfo } = useSelector(state => state.userInfo.userInfoList);
  const { empName, deptName, image } = getUserInfo || {};

  const singleAddLargeCategory = Object.values(STRING.CATEGORY_ENG).map(
    value => {
      return { name: value };
    }
  );

  const throttledDispatch = useThrottleCallback(
    useCallback(() => {
      const isAdminPath = isAdmin ? '/admin' : '';
      dispatch(getSearch({ isAdmin: isAdminPath, keyword: searchValue }));
    }, [dispatch, isAdmin, searchValue]),
    400
  );

  const debouncedSearch = useDebouncedCallback(
    useCallback(() => {
      const isAdminPath = isAdmin ? '/admin' : '';
      dispatch(getSearch({ isAdmin: isAdminPath, keyword: searchValue }));
    }, [dispatch, isAdmin, searchValue]),
    500
  );

  useEffect(() => {
    dispatch(userInfoSlice());
    getSSECount();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch, showModal]);

  useEffect(() => {
    if (searchValue === '') return;
    throttledDispatch();
    debouncedSearch();
  }, [dispatch, searchValue, isAdmin, debouncedSearch, throttledDispatch]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/subscribe`;
    const sse = new SSE(url, 20);

    sse.onMessage(event => {
      const checkJSON = event.data.split(' ')[0];
      const data = checkJSON !== 'EventStream' && JSON.parse(event.data);
      data && data.acceptResult && dispatch(setUserSSE(data));
      data && !data.acceptResult && dispatch(setAdminSSE(data));
    });

    return () => {
      sse.close();
    };
  }, [dispatch]);

  const initSearchData = () => {
    setSearchValue('');
    dispatch(initSearchHeader());
  };

  const handleModalShow = () => setLogoutModal();
  const handleModalClose = () => setLogoutModal(false);

  const handleOnChagneSearch = e => {
    const { value } = e.target;
    if (!value) {
      dispatch(initSearchHeader());
    }

    setSearchValue(value);
  };

  let headerData;
  if (userRole !== 'MASTER') {
    headerData = [
      {
        icon: <Useinfo />,
        text: STRING.HEADER_DROPDOWN.USERINFO,
        path: ROUTER.PATH.MYPAGE,
      },
      {
        icon: <Logout />,
        text: STRING.HEADER_DROPDOWN.LOGOOUT,
        onclick: handleModalShow,
      },
    ];

    if (userRole === 'ADMIN') {
      const adminItems = [
        {
          icon: <Rotate />,
          text: isAdmin
            ? STRING.HEADER_DROPDOWN.USERMODE
            : STRING.HEADER_DROPDOWN.ADMINMODE,
          onclick: () => {
            updateEncryptionStorage({ isAdmin: !isAdmin });
            navigate(
              isAdmin ? ROUTER.PATH.USER.DASHBOARD : ROUTER.PATH.ADMIN.DASHBOARD
            );
          },
        },
      ];
      headerData.splice(1, 0, ...adminItems);
    }
    if (isAdmin) {
      headerData.splice(2, 0, {
        icon: <Setting />,
        text: STRING.HEADER_DROPDOWN.SETTINGS,
        path: ROUTER.PATH.ADMIN.MANAGEMENT,
      });
    }
  } else {
    headerData = [
      {
        icon: <Logout />,
        text: STRING.HEADER_DROPDOWN.LOGOOUT,
        onclick: handleModalShow,
      },
    ];
  }

  const handleLogoutBtn = async e => {
    e.preventDefault();

    try {
      axios.post('/api/user/logout');
      logout(() => {
        navigate(ROUTER.PATH.MAIN);
      });
    } catch (error) {
      logout(() => {
        window.location.reload();
      });
    }
  };

  const handleSearchDetail = item => {
    const supplyId = item['supplyId'];
    const requestId = item['requestId'];
    const showType = supplyId ? 'supplyShow' : 'requestShow';
    const id = supplyId || requestId;
    if (id) {
      setShowModal({ ...showModal, [showType]: true, id });
    } else {
      setShowModal({ supplyShow: false, requestShow: false, id: null });
    }

    initSearchData();
  };

  const handleClickAlaram = () => {
    setShowAlarm(state => !state);
    if (isAdmin) {
      dispatch(deleteAllAdminSseLength());
    } else {
      dispatch(deleteAllUerSseLength());
    }
  };

  const getSSECount = () => {
    axios.get(`/api/notification/count`).then(res => {
      dispatch(setSSECount(res.data.data));
    });
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <ItemContainer>
            {/* 검색창 */}
            {userRole !== 'MASTER' && (
              <Search
                searchOutsideRef={searchOutsideRef}
                search={search}
                searchValue={searchValue}
                onChagneSearch={handleOnChagneSearch}
                onSearchDetail={handleSearchDetail}
              />
            )}
            {/* 헤더 오른쪽 아이템 */}
            <HeaderRightContainer>
              <Alarm
                isAdmin={isAdmin}
                showAlarm={showAlarm}
                alarmOutsideRef={alarmOutsideRef}
                sseAdminLength={sseAdminLength}
                sseUserLength={sseUserLength}
                onClickAlaram={handleClickAlaram}
              />
              {/* 드롭다운 컨테이너 */}
              <LoginUserInfoDropDown
                onClick={toggleDropdown}
                className={isDropdownVisible ? 'visible' : ''}
                ref={dropDownRef}
              >
                <UserImgContainer userImg={image} userRole={userRole} />
                <UserInfoDetailContainer>
                  <InfoCompanyTitle>{deptName}</InfoCompanyTitle>
                  <InfoUserName>
                    {userRole !== 'MASTER' &&
                      (isAdmin ? `${empName} 관리자` : `${empName} 님`)}
                    {userRole === 'MASTER' && `${empName} 계정`}
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
      <SearchDetailModal
        isAdmin={isAdmin}
        showModal={showModal}
        category={getCategory?.category}
        largeCategory={singleAddLargeCategory}
        onDetailModal={handleSearchDetail}
      ></SearchDetailModal>
    </>
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
