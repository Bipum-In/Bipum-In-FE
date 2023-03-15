import Axios from '../../api/axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import RequestMenu from '../../components/requestStatus/RequestMenu';
import RequestShow from '../../components/requestStatus/RequestShow';
import useSelectMenu from '../../hooks/useSelectMenu';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function RequestStatus() {
  const [menuStyle, handleClickMenu, setSelectName] = useSelectMenu(
    [
      { name: '전체', status: true },
      { name: '비품 요청', status: false },
      { name: '반납 요청', status: false },
      { name: '수리 요청', status: false },
    ],
    'RequestStorgeKey'
  );

  useEffect(() => {
    axios
      .get('/api/admin/requests?status=UNPROCESSED&page=1')
      .then(response => console.log(response));
  }, []);

  return (
    <RequestStatusWrapper>
      <RequestMenu menuStyle={menuStyle} onClickMenu={handleClickMenu} />
      <RequestShow setSelectName={setSelectName} />
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
