import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DeptHeader from './dept/DeptHeader';
import Axios from 'api/axios';
import STRING from 'constants/string';
import DeptSidebar from './dept/DeptSidebar';
import { useModalState } from 'hooks/useModalState';
import UserShowBody from './dept/UserShowBody';
const axios = new Axios(process.env.REACT_APP_SERVER_URL);

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
            handleSubmit={handleSubmit}
            deptName={deptName}
            setDeptName={setDeptName}
            employeeList={employeeList}
            setFilteredEmployeeList={setFilteredEmployeeList}
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
  height: 100%;
  border-right: 0.0625rem solid ${props => props.theme.color.grey.brandColor3};
`;
