import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CustomModal } from 'elements/Modal';
import { v4 as uuidv4 } from 'uuid';

export default function UserInfoDetail({
  headerData,
  logoutModal,
  handleLogoutBtn,
  handleModalClose,
}) {
  const navigate = useNavigate();
  return (
    <DropdownContainer>
      <DropdownBox>
        {headerData.map(item => (
          <DropdownList
            key={uuidv4()}
            onClick={item.onclick || (() => navigate(item.path))}
          >
            {item.icon}
            {item.text}
          </DropdownList>
        ))}
        <CustomModal
          isOpen={logoutModal}
          onClose={handleModalClose}
          submit={handleLogoutBtn}
          text={'로그아웃'}
        >
          정말 로그아웃 하시겠습니까?
        </CustomModal>
      </DropdownBox>
    </DropdownContainer>
  );
}

const DropdownContainer = styled.article`
  position: absolute;
  top: 110%;
  right: 0;
  width: 100%;
  padding: 0.5rem 0;
  background-color: white;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  z-index: 10;
  opacity: 0;
  transform: translateY(-1.25rem);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
`;

const DropdownBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  * svg {
    cursor: pointer;
    width: 1.25rem;
    height: 1.125rem;
  }
`;

const DropdownList = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  padding: 0.5rem 1rem;
  gap: 1rem;
  &:hover {
    background-color: ${props => props.theme.color.grey.brandColor1};
  }
`;
