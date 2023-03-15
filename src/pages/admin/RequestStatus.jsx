import React from 'react';
import styled from 'styled-components';
import RequestMenu from '../../components/requestStatus/RequestMenu';
import RequestShow from '../../components/requestStatus/RequestShow';
import useSelectMenu from '../../hooks/useSelectMenu';

export default function RequestStatus() {
  const [menuStyle, handleClickMenu, setSelectName] = useSelectMenu([
    { name: '전체', status: true },
    { name: '비품 요청', status: false },
    { name: '반납 요청', status: false },
    { name: '수리 요청', status: false },
  ]);

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
