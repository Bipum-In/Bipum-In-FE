import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import RequestMenu from '../../components/requestStatus/RequestMenu';

export default function RequestStatus() {
  const a = useLocation();
  console.log(a);

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=bad08c2762b0ad4460013109d47675f2&redirect_uri=http://localhost:3000/api/user/kakao/callback&response_type=code`;
  };
  return (
    <RequestStatusWrapper>
      <RequestMenu />
      <button onClick={handleKakaoLogin}>카카오 로그인</button>
    </RequestStatusWrapper>
  );
}

const RequestStatusWrapper = styled.section`
  width: 100%;
  height: 100%;
`;
