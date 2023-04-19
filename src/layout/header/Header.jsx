import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { ReactComponent as Rotate } from 'styles/headerIcon/rotate.svg';
import { ReactComponent as Useinfo } from 'styles/headerIcon/useinfo.svg';
import { ReactComponent as Logout } from 'styles/sidebarIcon/logout.svg';

import { ReactComponent as Setting } from 'styles/headerIcon/setting.svg';

import STRING from 'constants/string';
import ROUTER from 'constants/routerConst';

import SearchDetailModal from './SearchDetailModal';
import Search from 'layout/header/Search';
import useOutsideClick from 'hooks/useOutsideClick';
import useThrottleCallback from 'hooks/useThrottleCallback';
import useDebouncedCallback from 'hooks/useDebounce';

import { updateEncryptionStorage } from 'utils/encryptionStorage';

import SSE from 'api/sse';
import { api } from 'api/axios';
import logout from 'utils/logout';

import { userInfoSlice } from '../../redux/modules/userInfoSlice';
import {
  deleteAllAdminSseLength,
  deleteAllUerSseLength,
  setAdminSSE,
  setSSECount,
  setUserSSE,
} from 'redux/modules/sseAlertList';
import { getSearch, initSearchHeader } from 'redux/modules/searchHeader';
import { getCategoryList } from 'redux/modules/equipmentStatus';
import Alarm from './Alarm';
import QUERY from 'constants/query';
import UserInfo from './UserInfo';
import { useModalState } from 'hooks/useModalState';

export default function Header({ isAdmin, userRole }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutModal, setLogoutModal] = useModalState();
  const [showAlarm, setShowAlarm] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState({
    supplyShow: false,
    requestShow: false,
    id: null,
  });

  const searchOutsideRef = useOutsideClick(() => {
    initSearchData();
    setShowModal({ supplyShow: false, requestShow: false, id: null });
  }, searchValue);

  const alarmOutsideRef = useOutsideClick(() => {
    setShowAlarm(false);
  }, showAlarm);

  const {
    sseAlertList: {
      sseDatas: { sseAdminLength, sseUserLength },
    },
    searchHeader: {
      searchData: { search },
    },
    equipmentStatus: {
      category: { getCategory },
    },
  } = useSelector(state => state);

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
    const url = QUERY.END_POINT.SSE(process.env.REACT_APP_SERVER_URL);
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
    putSSECount(isAdmin);
  };

  const putSSECount = isAdmin => {
    api.put(
      QUERY.END_POINT.NOTIFICATION.SSE_COUNT(
        `?role=${STRING.IS_ADMIN(isAdmin)}`
      )
    );
  };

  const getSSECount = () => {
    api.get(QUERY.END_POINT.NOTIFICATION.SSE_COUNT()).then(res => {
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
              {userRole !== 'MASTER' && (
                <Alarm
                  isAdmin={isAdmin}
                  showAlarm={showAlarm}
                  alarmOutsideRef={alarmOutsideRef}
                  sseAdminLength={sseAdminLength}
                  sseUserLength={sseUserLength}
                  onClickAlaram={handleClickAlaram}
                />
              )}
              {/* 드롭다운 컨테이너 */}
              <UserInfo
                isAdmin={isAdmin}
                userRole={userRole}
                logoutModal={logoutModal}
                headerData={headerData}
                handleLogoutBtn={handleLogoutBtn}
                handleModalClose={handleModalClose}
              />
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
