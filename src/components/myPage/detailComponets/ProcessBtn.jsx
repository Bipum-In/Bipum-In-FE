import React from 'react';
import styled from 'styled-components';
import { styles } from 'components/common/commonStyled';
import Button from 'elements/Button';

export default function ProcessBtn({
  state,
  handleLoginInfoAdd,
  showDeleteAccountModal,
  showEditPasswordModal,
  hideEditModal,
}) {
  return (
    <>
      <styles.SubminPostContainer>
        {state.editMode ? (
          <>
            <Button type="button" cancel onClick={hideEditModal}>
              취소
            </Button>
            <Button
              type="button"
              submit
              onClick={handleLoginInfoAdd}
              disabled={
                !state.departmentId ||
                state.empName?.length < 2 ||
                state.phone?.length < 11 ||
                state.preview.length < 1
              }
            >
              저장
            </Button>
          </>
        ) : (
          <>
            <DeleteButton type="button" cancel onClick={showDeleteAccountModal}>
              회원 탈퇴
            </DeleteButton>
            <Button type="button" cancel onClick={showEditPasswordModal}>
              2차 비밀번호 변경
            </Button>
            <Button type="button" submit onClick={hideEditModal}>
              수정
            </Button>
          </>
        )}
      </styles.SubminPostContainer>
    </>
  );
}

const DeleteButton = styled(Button)`
  border: 0.0625rem solid #e91111;
  color: #e91111;
`;
