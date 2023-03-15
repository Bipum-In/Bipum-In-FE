import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import RequestMenu from '../../components/requestStatus/RequestMenu';
import RequestShow from '../../components/requestStatus/RequestShow';
import useSelectMenu from '../../hooks/useSelectMenu';

export default function RequestStatus() {
  const [menuStyle, handleClickMenu] = useSelectMenu([
    { name: '전체', status: true },
    { name: '비품 요청', status: false },
    { name: '반납 요청', status: false },
    { name: '수리 요청', status: false },
  ]);

  const a = useLocation();
  console.log(a);

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=bad08c2762b0ad4460013109d47675f2&redirect_uri=http://localhost:3000/api/user/kakao/callback&response_type=code`;
  };

  return (
    <RequestStatusWrapper>
      <RequestMenu menuStyle={menuStyle} onClickMenu={handleClickMenu} />
      <RequestShow />
      {/* <button onClick={handleKakaoLogin}>카카오 로그인</button> */}
    </RequestStatusWrapper>
  );
}

const RequestStatusWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.color.blue.brandColor1};
  padding: 2.25rem 3.25rem 3.25rem 3.25rem;
`;
