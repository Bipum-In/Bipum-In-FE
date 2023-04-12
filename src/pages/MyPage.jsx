import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditMyInfo from 'components/myPage/EditMyInfo';
import CheckPwPage from 'components/myPage/CheckPwPage';

export default function MyPage() {
  const [editPage, setEditPage] = useState('checkPw');
  const { getUserInfo } = useSelector(state => state.userInfo.userInfoList);

  return (
    <>
      {getUserInfo && (
        <>
          {editPage === 'checkPw' ? (
            <CheckPwPage setEditPage={setEditPage} />
          ) : (
            <EditMyInfo getUserInfo={getUserInfo} setEditPage={setEditPage} />
          )}
        </>
      )}
    </>
  );
}
