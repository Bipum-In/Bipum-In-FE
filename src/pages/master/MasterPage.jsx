import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { rendingStyles } from 'components/rending/pages/RendingPageStyled';
import KakaoUserInfo from 'styles/rendingIcon/kakaoUserInfo.svg';

import MasterHeader from '../../components/masterPage/MasterHeader';
import OrganizationChart from 'components/masterPage/OrganizationChart';
import MasterLogin from 'components/masterPage/MasterLogin';

import { api } from 'api/axios';
import logout from 'utils/logout';

import { encrypt } from '../../utils/encryption';
import Storage from 'utils/localStorage';
import QUERY from 'constants/query';
import { getEncryptionStorage } from 'utils/encryptionStorage';
import ROUTER from 'constants/routerConst';

export default function MasterPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: '',
    password: '',
    settingPg: 'login',
    checkDept: getEncryptionStorage().checkDept,
    userRole: getEncryptionStorage().userRole,
  });

  useEffect(() => {
    if (state.userRole === 'MASTER' && state.checkDept) {
      navigate(ROUTER.PATH.MASTER.APPOINTMENT);
    } else if (state.userRole === 'USER' || state.userRole === 'ADMIN') {
      navigate(ROUTER.PATH.MAIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.checkDept, state.settingPg, state.userRole]);

  const handleInput = e => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleLogoutBtn = e => {
    e.preventDefault();
    logout(() =>
      setState({ ...state, settingPg: 'login', userRole: '', checkDept: '' })
    );
  };

  const handleMasterLogin = e => {
    e.preventDefault();
    const { username, password } = state;
    api
      .post(QUERY.END_POINT.USER.LOGIN_MASTER, { username, password })
      .then(res => {
        const masterData = res.data.data;
        setState({
          ...state,
          checkDept: masterData.checkDept,
          userRole: masterData.userRole,
          username: '',
          password: '',
        });
        const encryptedUserInfo = encrypt(masterData);
        Storage.setLocalStorageJSON(
          QUERY.STORAGE.LOCAL_NAME,
          encryptedUserInfo
        );
        if (!masterData.checkDept) setState({ ...state, settingPg: 'chart' });
      })
      .catch(() => {
        setState({
          ...state,
          username: '',
          password: '',
        });
      });
  };

  return (
    <>
      <MasterHeader
        logoutClick={handleLogoutBtn}
        isLogin={state.userRole}
        navigate={navigate}
      />
      <rendingStyles.LoginWrapper bg={KakaoUserInfo}>
        {state.settingPg === 'login' && !state.userRole && (
          <MasterLogin
            state={state}
            onchange={handleInput}
            onclick={handleMasterLogin}
          />
        )}

        {state.settingPg === 'chart' && (
          <OrganizationChart
            setSettingPg={newSettingPg =>
              setState({ ...state, settingPg: newSettingPg })
            }
          />
        )}
      </rendingStyles.LoginWrapper>
    </>
  );
}
