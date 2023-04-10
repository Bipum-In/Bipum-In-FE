import React from 'react';
import { useSelector } from 'react-redux';
import MyDetails from 'components/myPage/myDetails';

export default function MyPage() {
  const { getUserInfo } = useSelector(state => state.userInfo.userInfoList);

  return <>{getUserInfo && <MyDetails getUserInfo={getUserInfo} />}</>;
}
