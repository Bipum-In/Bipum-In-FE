import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Button from 'elements/Button';
import { useModalState } from 'hooks/useModalState';
import { CustomModal } from 'elements/Modal';
import { useState } from 'react';
import { getEncryptionStorage } from 'utils/encryptionStorage';

export default function UserShowBody({
  filteredEmployeeList,
  setUserDeleteModal,
  userdeleteModal,
  setIdModalDept,
  idModalDept,
  handleDeleteUser,
  handleAssignRole,
}) {
  const [authModal, setAuthModal] = useModalState();
  const [idauthModal, setIdauthModal] = useState(null);
  const authModalClose = () => setAuthModal(false);
  const { userRole } = getEncryptionStorage();

  return (
    <>
      <RequestShowBody>
        <ListTable>
          <ListBody>
            <ListBodyTopTrContainer>
              <td></td>
              <td>이름</td>
              <td>전화번호</td>
              <td>이메일</td>
              <td>권한</td>
              <td></td>
            </ListBodyTopTrContainer>
            {filteredEmployeeList.map(employee => (
              <tr key={uuidv4()}>
                <td>
                  <img src={employee.image} alt={employee.empName} />
                </td>
                <td>{employee.empName}</td>
                <td>{employee.phone}</td>
                <td>
                  {employee.username.length > 24
                    ? `${employee.username.slice(0, 24)}...`
                    : employee.username}
                </td>

                <td>
                  {employee.authority === null && (
                    <Button
                      mainBtn="border"
                      type="button"
                      onClick={() => {
                        setIdauthModal(employee.userId);
                        setAuthModal(true);
                      }}
                    >
                      {userRole === 'MASTER'
                        ? '비품 총괄 관리자 선임'
                        : '공용 비품 책임자 선임'}
                    </Button>
                  )}
                  {employee.authority === '공용 비품 책임자' && (
                    <Button
                      mainBtn="border"
                      type="button"
                      onClick={() => {
                        setIdauthModal(employee.userId);
                        setAuthModal(true);
                      }}
                    >
                      {userRole === 'MASTER'
                        ? '비품 총괄 관리자 해임'
                        : '공용 비품 책임자 해임'}
                    </Button>
                  )}
                  {employee.authority === '비품 총괄 관리자' &&
                    (userRole === 'MASTER' ? (
                      <>
                        <Button
                          mainBtn="border"
                          type="button"
                          onClick={() => {
                            setIdauthModal(employee.userId);
                            setAuthModal(true);
                          }}
                        >
                          비품 총괄 관리자 해임
                        </Button>
                        <AuthTitleCanHide>비품 총괄 관리자</AuthTitleCanHide>
                      </>
                    ) : (
                      <AuthTitle>비품 총괄 관리자</AuthTitle>
                    ))}
                  {employee.authority === '공용 비품 책임자' && (
                    <AuthTitleCanHide>공용 비품 책임자</AuthTitleCanHide>
                  )}
                </td>
                <td>
                  <DeleteBtn
                    onClick={() => {
                      setIdModalDept(employee.userId);
                      setUserDeleteModal(true);
                    }}
                  >
                    삭제
                  </DeleteBtn>
                  <CustomModal
                    isOpen={userdeleteModal && idModalDept === employee.userId}
                    onClose={() => setUserDeleteModal(false)}
                    submit={() => {
                      handleDeleteUser(employee.userId);
                      setUserDeleteModal(false);
                      setIdModalDept(null);
                    }}
                    text={'네'}
                  >
                    {employee.empName} 님을 삭제 하시겠습니까?
                  </CustomModal>
                  <CustomModal
                    isOpen={authModal && idauthModal === employee.userId}
                    onClose={authModalClose}
                    submit={() => {
                      handleAssignRole(employee.userId);
                      setAuthModal(false);
                      setIdauthModal(null);
                    }}
                    text={'네'}
                  >
                    {employee.authority === null ? (
                      <>
                        {employee.empName}
                        {userRole === 'MASTER'
                          ? '님을 비품 총괄 관리자로'
                          : '님을 공용 비품 책임자로'}
                        <p>선임하시겠습니까?</p>
                      </>
                    ) : (
                      <>
                        {employee.empName}
                        {userRole === 'MASTER'
                          ? '님의 비품 총괄 관리자 권한을'
                          : '님의 공용 비품 책임자 권한을'}
                        <p>해임하시겠습니까?</p>
                      </>
                    )}
                  </CustomModal>
                </td>
              </tr>
            ))}
          </ListBody>
        </ListTable>
      </RequestShowBody>
    </>
  );
}
const AuthTitle = styled.div`
  background-color: ${props => props.theme.color.blue.brandColor6};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: 112px;
  height: 41px;
  color: white;
`;

const ListBodyTopTrContainer = styled.tr`
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 2.3125rem;
  height: 3.125rem;
  padding: 13px 16px;
  width: 100%;
  color: ${props => props.theme.color.blue.brandColor6};
  border-bottom: 0.0625rem solid ${props => props.theme.color.grey.brandColor2};
  background-color: ${props => props.theme.color.blue.brandColor1};
  top: 0;
  z-index: 1;
  td {
    min-width: 120px;
  }

  td:nth-child(5) {
    min-width: 9.6875rem;
  }
`;

const AuthTitleCanHide = styled(AuthTitle.withComponent('div'))``;

const RequestShowBody = styled.div`
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
    table-layout: auto;
  }

  tbody {
    justify-content: center;
  }

  tr:not(:first-child) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    gap: 30px;
    line-height: 53px;
    padding: 13px 16px;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.color.grey.brandColor4};
    &:hover:not(:first-child) {
      background-color: ${props => props.theme.color.blue.brandColor2};
      Button {
        display: block;
        background-color: white;
        height: 2.5625rem;
      }
    }
    &:hover ${AuthTitleCanHide} {
      display: none;
    }
    Button {
      display: none;
    }
    td {
      display: flex;
      text-align: center;
      text-overflow: ellipsis;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
    }
    td:nth-child(1),
    td:nth-child(2),
    td:nth-child(3) {
      min-width: 100px;
    }
    td:nth-child(4) {
      min-width: 180px;
      max-width: 180px;
    }
    td:nth-child(5) {
      min-width: 160px;
    }
    td:nth-child(6) {
      min-width: 80px;
    }
  }
  td img {
    display: flex;
    width: 76px;
    height: 76px;
    border-radius: 6px;
  }
`;

const DeleteBtn = styled.button`
  width: 45px;
  height: 33px;
  border-radius: 6px;
  border: 1px solid red;
  color: red;
  cursor: pointer;
`;

const ListBody = styled.tbody`
  ${props => props.theme.FlexCol};
`;

const ListTable = styled.table`
  ${props => props.theme.FlexCol};
  height: calc(100vh - 21.5rem);
`;
