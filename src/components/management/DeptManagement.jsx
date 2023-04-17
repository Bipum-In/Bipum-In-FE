import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DeptHeader from './dept/DeptHeader';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'api/axios';
import STRING from 'constants/string';
import Button from 'elements/Button';
import DeptSidebar from './dept/DeptSidebar';
import { CustomModal } from 'elements/Modal';
import { useModalState } from 'hooks/useModalState';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function DeptManagement() {
  const [ManagementTitle] = useState(STRING.MANAGEMENT_TITLE.DEPTAUTH);
  const [deptList, setDeptList] = useState([]);
  const [deptName, setDeptName] = useState('');
  const [editedDeptName, setEditedDeptName] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [idModalDept, setIdModalDept] = useState(null);
  const [idauthModal, setIdauthModal] = useState(null);

  const [userdeleteModal, setUserDeleteModal] = useModalState();
  const [authModal, setAuthModal] = useModalState();

  const deleteModalClose = () => setUserDeleteModal(false);
  const authModalClose = () => setAuthModal(false);

  const updateDeptList = () =>
    axios.get('/api/dept').then(response => setDeptList(response.data.data));
  const handleSubmit = () =>
    axios
      .post('/api/dept', { deptName })
      .then(() => {
        updateDeptList();
        setDeptName('');
      })
      .catch(console.error);

  useEffect(() => {
    updateDeptList();
  }, []);

  const handleChangeKeyword = e => setKeyword(e.target.value);

  useEffect(() => {
    if (selectedDeptId !== null) {
      axios.get(`/api/dept/${selectedDeptId}`).then(response => {
        setEmployeeList(response.data.data);
      });
    }
  }, [selectedDeptId]);

  const handleDeleteUser = userId => {
    axios
      .delete(`/api/user/${userId}`)
      .then(response => {
        setEmployeeList(prevList =>
          prevList.filter(emp => emp.userId !== userId)
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleAssignRole = userId => {
    axios
      .put(`/api/user/role/${userId}`)
      .then(response => {
        setEmployeeList(prevList =>
          prevList.map(employee => {
            if (employee.userId === userId) {
              return {
                ...employee,
                role: response.data.role,
              };
            }
            return employee;
          })
        );
      })
      .then(() => {
        updateEmployeeList();
      });
  };

  const updateEmployeeList = () => {
    if (selectedDeptId !== null) {
      axios.get(`/api/dept/${selectedDeptId}`).then(response => {
        setEmployeeList(response.data.data);
      });
    }
  };

  return (
    <>
      <DeptWrapper>
        <DeptHeaderWrapper>
          <DeptHeader
            setSelectName={ManagementTitle}
            keyword={keyword}
            setKeyword={handleChangeKeyword}
            handleSubmit={handleSubmit}
            deptName={deptName}
            setDeptName={setDeptName}
          />
        </DeptHeaderWrapper>
        <ContentWrapper>
          <Sidebar>
            <DeptSidebar
              deptList={deptList}
              setSelectedDeptId={setSelectedDeptId}
              editedDeptName={editedDeptName}
              setEditedDeptName={setEditedDeptName}
              updateDeptList={updateDeptList}
            />
          </Sidebar>
          <RequestShowBody>
            {employeeList.map(employee => (
              <Test key={uuidv4()}>
                <Teest>
                  <Ttteeest>
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
                      {employee.authority && employee.authority && (
                        <Span>공용 비품 책임자</Span>
                      )}
                    </td>
                    <td>
                      <Button
                        mainBtn="border"
                        type="button"
                        onClick={() => {
                          setIdModalDept(employee.userId);
                          setUserDeleteModal(true);
                        }}
                      >
                        삭제
                      </Button>
                      <CustomModal
                        isOpen={
                          userdeleteModal && idModalDept === employee.userId
                        }
                        onClose={deleteModalClose}
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
                  </Ttteeest>
                </Teest>
              </Test>
            ))}
          </RequestShowBody>
        </ContentWrapper>
      </DeptWrapper>
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
    }
  }
  tr:hover {
    background-color: ${props => props.theme.color.blue.brandColor2};
    Button {
      display: block;
      background-color: white;
    }
  }
  Button {
    display: none;
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

const Ttteeest = styled.tr``;

const Teest = styled.tbody`
  display: flex;
  flex-direction: row;
`;

const Test = styled.table`
  display: flex;
  flex-direction: column;
`;

const DeptWrapper = styled.div`
  ${props => props.theme.wh100};
  display: flex;
  flex-direction: column;
`;

const DeptHeaderWrapper = styled.div`
  height: 5.5rem;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 14.75rem;
  ${props => props.theme.FlexCol};
  height: 100%;
  border-right: 0.0625rem solid ${props => props.theme.color.grey.brandColor3};
`;
