import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DeptHeader from './dept/DeptHeader';
import { api } from 'api/axios';
import STRING from 'constants/string';
import DeptSidebar from './dept/DeptSidebar';
import { useModalState } from 'hooks/useModalState';
import UserShowBody from './dept/UserShowBody';
import { getEncryptionStorage } from 'utils/encryptionStorage';
import QUERY from 'constants/query';

export default function DeptManagement() {
  const [ManagementTitle] = useState(STRING.MANAGEMENT_TITLE.DEPTAUTH);
  const [deptList, setDeptList] = useState([]);
  const [deptName, setDeptName] = useState('');
  const [editedDeptName, setEditedDeptName] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState(1);

  const [employeeList, setEmployeeList] = useState([]);
  const [idModalDept, setIdModalDept] = useState(null);
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [userdeleteModal, setUserDeleteModal] = useModalState();

  const updateDeptList = () =>
    api.get(QUERY.END_POINT.DEPARTMENT.LIST).then(response => {
      setDeptList(response.data.data);
      setSelectedDeptId(response.data.data[0].deptId);
    });
  const handleSubmit = () =>
    api.post(QUERY.END_POINT.DEPARTMENT.LIST, { deptName }).then(() => {
      updateDeptList();
      setDeptName('');
    });

  useEffect(() => {
    updateDeptList();
  }, []);

  useEffect(() => {
    if (selectedDeptId !== null) {
      api
        .get(QUERY.END_POINT.DEPARTMENT.CHANGE(selectedDeptId))
        .then(response => {
          setEmployeeList(response.data.data);
        });
    }
  }, [selectedDeptId]);

  const handleDeleteUser = userId => {
    api.delete(QUERY.END_POINT.USER.SEARCH_USER(userId)).then(() => {
      setEmployeeList(prevList =>
        prevList.filter(emp => emp.userId !== userId)
      );
    });
  };

  const handleAssignRole = userId => {
    api
      .put(QUERY.END_POINT.USER.GIVE_ROLE(userId))
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
      api
        .get(QUERY.END_POINT.DEPARTMENT.SEARCH(selectedDeptId))
        .then(response => {
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
            handleSubmit={handleSubmit}
            deptName={deptName}
            setDeptName={setDeptName}
            employeeList={employeeList}
            setFilteredEmployeeList={setFilteredEmployeeList}
          />
        </DeptHeaderWrapper>
        <ContentWrapper>
          <Sidebar ismaster={`${getEncryptionStorage().userRole}`}>
            <DeptSidebar
              deptList={deptList}
              setSelectedDeptId={setSelectedDeptId}
              editedDeptName={editedDeptName}
              setEditedDeptName={setEditedDeptName}
              updateDeptList={updateDeptList}
              activeDeptId={selectedDeptId}
            />
          </Sidebar>
          <UserShowBody
            filteredEmployeeList={filteredEmployeeList}
            setUserDeleteModal={setUserDeleteModal}
            userdeleteModal={userdeleteModal}
            setIdModalDept={setIdModalDept}
            idModalDept={idModalDept}
            handleDeleteUser={handleDeleteUser}
            handleAssignRole={handleAssignRole}
          />
        </ContentWrapper>
      </DeptWrapper>
    </>
  );
}

const DeptWrapper = styled.div`
  ${props => props.theme.wh100};
  ${props => props.theme.FlexCol};
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
  height: ${props =>
    props.ismaster === 'MASTER'
      ? 'calc(100vh - 18.3rem)'
      : 'calc(100vh - 21.5rem)'};
  border-right: 0.0625rem solid ${props => props.theme.color.grey.brandColor3};
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.color.grey.brandColor2};
    border-radius: 20px;
  }
`;
