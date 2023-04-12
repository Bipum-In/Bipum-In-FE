import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MyDetails from 'components/myPage/myDetails';
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
            <MyDetails getUserInfo={getUserInfo} setEditPage={setEditPage} />
          )}
        </>
      )}
    </>
  );
}
