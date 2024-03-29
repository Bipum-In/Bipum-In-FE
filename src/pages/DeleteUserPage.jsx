import { api } from 'api/axios';
import QUERY from 'constants/query';
import ROUTER from 'constants/routerConst';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import alertModal, { alertModalButton } from 'utils/alertModal';
import logout from 'utils/logout';

export default function DeleteUserPage() {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const code = search.split('=')[1];
    const currentUrl = document.location.href.split('//')[1].substring(0, 5);
    fetchDeleteUser(code, currentUrl);
  }, []);

  const fetchDeleteUser = async (code, urlType) => {
    try {
      await api.post(QUERY.END_POINT.USER.DELETE_USER(code, urlType));

      alertModalButton(true, '회원 탈퇴 완료', () => {
        navigate(ROUTER.PATH.MAIN);
      });
    } catch (error) {
      logout();

      alertModalButton(false, '회원 탈퇴중 에러가 발생 했습니다.', () => {
        navigate(ROUTER.PATH.BACK);
      });
    }
  };

  return <div></div>;
}
