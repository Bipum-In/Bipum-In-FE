import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Button from 'elements/Button';
import { useModalState } from 'hooks/useModalState';
import { CustomModal } from 'elements/Modal';
import { useState } from 'react';
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

  return (
    <>
      <RequestShowBody>
        {filteredEmployeeList.map(employee => (
          <ListTable key={uuidv4()}>
            <ListBody>
              <tr>
                <td>
                  <img src={employee.image} alt={employee.empName} />
                </td>
                <td>{employee.empName}</td>
                <td>{employee.phone}</td>
                <td>{employee.username}</td>

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
                      공용 비품 책임자 선임
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
                      공용 비품 책임자 해임
                    </Button>
                  )}
                  {employee.authority === '비품 총괄 관리자' && (
                    <Span>비품 총괄 관리자</Span>
                  )}
                  {employee.authority === '공용 비품 책임자' && (
                    <Span>공용 비품 책임자</Span>
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
                        {employee.empName} 님을 공용 비품 책임자로
                        <p>선임하시겠습니까?</p>
                      </>
                    ) : (
                      <>
                        {employee.empName} 님의 공용 비품 책임자 권한을
                        <p>해임하시겠습니까?</p>
                      </>
                    )}
                  </CustomModal>
                </td>
              </tr>
            </ListBody>
          </ListTable>
        ))}
      </RequestShowBody>
    </>
  );
}

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

  tr {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    gap: 1.875rem;
    line-height: 3.3125rem;
    padding: 0.8125rem 8.6875rem;
    width: 100%;
    border-bottom: 0.0625rem solid
      ${props => props.theme.color.grey.brandColor4};
    :hover {
      background-color: ${props => props.theme.color.blue.brandColor2};
      Button {
        display: block;
        background-color: white;
      }
    }

    Button {
      display: none;
    }
  }

  td {
    flex: 1;
    text-align: center;
    text-overflow: ellipsis;
    font-size: 0.875rem;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
  }

  td img {
    display: flex;
    width: 4.75rem;
    height: 4.75rem;
    border-radius: 0.375rem;
  }
`;

const Span = styled.div`
  background-color: ${props => props.theme.color.blue.brandColor6};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  width: 7rem;
  height: 2.5625rem;
  color: white;
`;

const DeleteBtn = styled.button`
  width: 2.8125rem;
  height: 2.0625rem;
  border-radius: 0.375rem;
  border: 0.0625rem solid red;
  color: red;
  cursor: pointer;
`;

const ListBody = styled.tbody`
  ${props => props.theme.FlexRow};
`;

const ListTable = styled.table`
  ${props => props.theme.FlexCol};
`;
