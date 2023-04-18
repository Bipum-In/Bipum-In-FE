import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Trash } from 'styles/commonIcon/trash.svg';
import { ReactComponent as Edit } from 'styles/commonIcon/edit.svg';
import { useModalState } from 'hooks/useModalState';
import { ReactComponent as CancelInput } from 'styles/commonIcon/cancelInput.svg';
import { CustomModal } from 'elements/Modal';
import Input from 'elements/Input';
import { api } from 'api/axios';

const DeptSidebar = ({
  deptList,
  setSelectedDeptId,
  activeDeptId,
  editedDeptName,
  setEditedDeptName,

  updateDeptList,
}) => {
  const handleDeleteDept = deptId =>
    api.delete(`/api/dept/${deptId}`).then(response => {
      updateDeptList();
    });

  const handleSaveClick = deptId =>
    api.put(`/api/dept/${deptId}`, { deptName: editedDeptName }).then(() => {
      updateDeptList();
    });

  const [idModalDept, setIdModalDept] = useState(null);
  const [idModalEdit, setIdModalEdit] = useState(null);
  const deleteModalClose = () => setDeleteModal(false);
  const editModalClose = () => setEditModal(false);
  const handleEditClear = () => setEditedDeptName('');
  const [deleteModal, setDeleteModal] = useModalState();
  const [editModal, setEditModal] = useModalState();

  return (
    <>
      {deptList.map(dept => (
        <LargeTypeContainer key={dept.deptId}>
          <LargeType
            active={dept.deptId === activeDeptId}
            onClick={() => {
              setSelectedDeptId(dept.deptId);
            }}
          >
            <p>{dept.deptName}</p>
            <IconBox active={dept.deptId === activeDeptId}>
              <Edit
                onClick={() => {
                  setIdModalEdit(dept.deptId);
                  setEditedDeptName(dept.deptName);
                  setEditModal(true);
                }}
              />
              <Trash
                onClick={() => {
                  setIdModalDept(dept.deptId);
                  setDeleteModal(true);
                }}
              />
            </IconBox>
            <CustomModal
              isOpen={deleteModal && idModalDept === dept.deptId}
              onClose={deleteModalClose}
              submit={() => {
                handleDeleteDept(dept.deptId);
                setDeleteModal(false);
                setIdModalDept(null);
              }}
              text={'삭제 완료'}
            >
              정말 삭제 하시겠습니까?
            </CustomModal>
            <CustomModal
              isOpen={editModal && idModalEdit === dept.deptId}
              onClose={editModalClose}
              text={'변경 완료'}
              submit={() => {
                handleSaveClick(dept.deptId);
                setEditModal(false);
                setEditedDeptName(null);
              }}
            >
              부서 이름 변경
              <AddInputBox>
                <Input
                  type="text"
                  value={editedDeptName}
                  setState={e => {
                    setEditedDeptName(e.target.value);
                  }}
                />
                {editedDeptName && (
                  <CancelInputWrapper onClick={handleEditClear}>
                    <CancelInput />
                  </CancelInputWrapper>
                )}
              </AddInputBox>
            </CustomModal>
          </LargeType>
        </LargeTypeContainer>
      ))}
    </>
  );
};

const CancelInputWrapper = styled.div`
  top: 50%;
  margin: auto;
  margin-top: 1.3125rem;
  transform: translateY(-50%);
  cursor: pointer;
  padding-right: 0.5rem;
`;

const AddInputBox = styled.div`
  margin-top: 1.25rem;
  background: #f7faff;
  border: 1px solid ${props => props.theme.color.blue.brandColor3};
  border-radius: 0.375rem;
  color: ${props => props.theme.color.blue.brandColor7};
  display: flex;
  padding: 0 0.5rem;

  input {
    padding: 8px;
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem 0.5rem 0.5rem 0;
    font-size: 1rem;
    line-height: 1.1875rem;
    ::placeholder {
      color: ${props => props.theme.color.blue.brandColor7};
    }
  }
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-right: 1.6875rem;
  svg {
    path {
      stroke: ${props =>
        props.active
          ? props.theme.color.blue.brandColor1
          : props.theme.color.blue.brandColor6};
    }
  }
`;
const LargeTypeContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  position: relative;
  font-size: 0.875rem;
  :hover {
    background-color: ${props => props.theme.color.blue.brandColor2};
  }
`;

const LargeType = styled.div`
  align-items: center;
  padding-left: 2.4375rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 4.5rem;
  border-bottom: 0.0625rem solid ${props => props.theme.color.grey.brandColor4};
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      background-color: ${props => props.theme.color.blue.brandColor5};
      color: ${props => props.theme.color.white};
      p {
        color: white;
        font-weight: 600;
      }
    `}
  svg {
    display: none;
  }
  &:hover {
    svg {
      display: block;
    }
  }
`;

export default DeptSidebar;
