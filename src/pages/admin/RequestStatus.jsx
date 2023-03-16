import Axios from '../../api/axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import RequestMenu from '../../components/requestStatus/RequestMenu';
import RequestShow from '../../components/requestStatus/RequestShow';
import useSelectMenu from '../../hooks/useSelectMenu';
import { useDispatch, useSelector } from 'react-redux';
import { __requestStatus } from '../../redux/modules/requestStatus';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function RequestStatus() {
  const dispatch = useDispatch();
  const { getRequest, isStatusLoading, isStatusError } = useSelector(
    state => state.requestStatus
  );
  const [menuStyle, clickMenu, setSelectName] = useSelectMenu(
    [
      { name: '전체', status: true },
      { name: '비품 요청', status: false },
      { name: '반납 요청', status: false },
      { name: '수리 요청', status: false },
    ],
    'RequestStorgeKey'
  );

  const [page, setPage] = useState(1);
  const [type, setType] = useState('ALL');
  // const type = useRef('ALL');
  const [status, setStatus] = useState('UNPROCESSED');

  useEffect(() => {
    dispatch(__requestStatus({ type, status, page }));
  }, [dispatch, page, type, status]);

  const handlePage = e => {
    setPage(e);
  };

  const handleClickMenu = e => {
    const menuName = e.target.innerText;
    clickMenu(e);
    setPage(1);
    menuName === '전체' && setType('ALL');
    menuName === '비품 요청' && setType('SUPPLY');
    menuName === '반납 요청' && setType('RETURN');
    menuName === '수리 요청' && setType('REPAIR');
  };

  const handleChangeStatus = e => {
    const selectName = e.target.value;
    setStatus(e);
    setPage(1);
    selectName === '처리전' && setStatus('UNPROCESSED');
    selectName === '처리중' && setStatus('REPAIRING');
    selectName === '처리 완료' && setStatus('PROCESSED');
  };

  console.log(type.current);

  // const handleKakaoLogin = () => {
  //   window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=bad08c2762b0ad4460013109d47675f2&redirect_uri=https://bipum-in.shop/api/user/kakao/callback&response_type=code
  //     `;

  //   // axios.post('/api/user/loginadd').then(response => console.log(response));
  // };

  if (isStatusError) return <div>에러 발생</div>;
  return (
    <RequestStatusWrapper>
      {getRequest && (
        <>
          <RequestMenu menuStyle={menuStyle} onClickMenu={handleClickMenu} />
          <RequestShow
            requestData={getRequest}
            setSelectName={setSelectName}
            page={page}
            onPage={handlePage}
            onChangeStatus={handleChangeStatus}
          />
        </>
      )}
      {/* <button onClick={handleKakaoLogin}>카카오</button> */}
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

const Loading = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
