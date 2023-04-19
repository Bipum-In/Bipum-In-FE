import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageAdd from 'components/equipmentAdd/single/ImageAdd';

import { api } from 'api/axios';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'redux/modules/userInfoSlice';

import QUERY from 'constants/query';
import alertModal from 'utils/alertModal';
import { CustomModal } from 'elements/Modal';
import { useModalState } from 'hooks/useModalState';
import useRegexInput from 'hooks/useRegexInput';

import { styles } from 'components/common/commonStyled';
import MyPageEmpName from './detailComponets/MyPageEmpName';
import MyPagePhone from './detailComponets/MyPagePhone';
import MypageDept from './detailComponets/MypageDept';
import MypageAlarm from './detailComponets/MypageAlarm';
import ChangePassword from './detailComponets/ChangePassword';
import ProcessBtn from './detailComponets/ProcessBtn';

export default function EditMyInfo({ getUserInfo }) {
  const {
    empName: myName,
    phone: myPhone,
    deptName: myDeptName,
    image: myImage,
    alarm: myAlarm,
  } = getUserInfo;

  const dispatch = useDispatch();

  const [deleteAccountModal, toggleDeleteAccountModal] = useModalState();
  const [editPasswordModal, toggleEditPasswordModal] = useModalState();

  const [state, setState] = useState({
    departmentList: '',
    departmentId: '',
    empName: myName,
    phone: myPhone,
    departmentName: myDeptName,
    formImage: null,
    userImg: myImage,
    preview: [myImage],
    checkedAlarm: myAlarm,
    editMode: false,
  });

  useEffect(() => {
    api.get(QUERY.END_POINT.DEPARTMENT.LIST).then(res => {
      const deptList = res.data.data;
      const deptId = parseMyDeptId(deptList, state.departmentName);
      setState(state => ({
        ...state,
        departmentList: deptList,
        departmentId: deptId,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeDepartmentId = e => {
    const { ko: deptId } = JSON.parse(e.target.value);
    const departmentName = e.target.options[e.target.selectedIndex].innerText;
    setState(state => ({
      ...state,
      departmentId: deptId,
      departmentName: departmentName,
    }));
  };

  function handleEmpNameBlur(event) {
    const { value } = event.target;
    const filteredValue = value.replace(/[^a-z|A-Z|ㄱ-ㅎ|가-힣]/g, '');
    setState(state => ({ ...state, empName: filteredValue }));
  }

  function handleChangePhone(event) {
    const { value } = event.target;
    const formattedValue = value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setState(state => ({ ...state, phone: formattedValue }));
  }

  const handleLoginInfoAdd = () => {
    const formData = new FormData();
    const stringToNumPrice = state.phone.replace(/-/g, '');

    formData.append('deptId', state.departmentId);
    formData.append('empName', state.empName);
    formData.append('phone', stringToNumPrice);
    formData.append('alarm', state.checkedAlarm);
    if (state.formImage) {
      formData.append('multipartFile', state.formImage[0]);
    } else {
      formData.append('image', state.userImg);
    }

    dispatch(
      setUserInfo({
        deptName: state.departmentName,
        empName: state.empName,
        image: state.preview,
      })
    );

    api.put(QUERY.END_POINT.USER.EDIT_USER_DATA, formData).then(() => {
      alertModal(true, '정보가 성공적으로 수정되었습니다.', 2);
      setState(state => ({ ...state, editMode: false }));
    });
  };

  const parseMyDeptId = (deptList, deptName) => {
    return deptList.filter(dept => dept.deptName === deptName)[0].deptId;
  };

  const handleDeleteImage = () => {
    setState(state => ({ ...state, formImage: [], preview: [] }));
  };

  const onChangeimge = e => {
    const img = e.target.files[0];
    console.log(img);
    setPreviewImage(img);
    setState(state => ({ ...state, formImage: [img], userImg: '' }));
  };

  const handleChange = event =>
    setState(state => ({ ...state, checkedAlarm: event.target.checked }));

  const setPreviewImage = img => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setState(state => ({ ...state, preview: [reader.result] }));
    };
    reader.readAsDataURL(img);
  };

  console.log(state.formImage);
  const currentUrl = () => {
    const sliceUrl = document.location.href.split('//')[1].slice(0, 5);
    const href = sliceUrl === 'local';

    return href
      ? process.env.REACT_APP_LOCALHOST_URL
      : process.env.REACT_APP_VERCEL_URL;
  };

  const handleDeleteAccount = async () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      process.env.REACT_APP_GOOGLE_CLIENT_ID
    }&response_type=code&redirect_uri=${currentUrl()}/delete-user&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

  const pwRegex = /^\d{6}$/;
  const [inputPw, inputPwHandler, alertPw, checkPwRegex, reset] = useRegexInput(
    '6자리 숫자로 이루어진 비밀번호를 입력해주세요.',
    '사용 가능한 비밀번호 입니다.',
    pwRegex
  );

  const [inputCheckPw, , alertCheckPw, doubleCheckPwRegex, checkSame] =
    useRegexInput(
      '비밀번호가 같지 않습니다. 다시 입력해주세요.',
      '비밀번호가 같습니다.',
      pwRegex,
      inputPw
    );

  const handleSecondPwEdit = () => {
    api
      .put(QUERY.END_POINT.USER.CHANGE_PASSWORD, { password: inputPw })
      .then(() => {
        alertModal(true, '2차 비밀번호가 성공적으로 수정되었습니다.', 2);
        setState({ ...state, editMode: false });
        toggleEditPasswordModal(false);
        reset();
      });
  };

  const handleEmpNameClear = () =>
    setState(state => ({ ...state, empName: '' }));
  const handlePhoneClear = () => setState(state => ({ ...state, phone: '' }));
  const showDeleteAccountModal = () => toggleDeleteAccountModal();
  const showEditPasswordModal = () => toggleEditPasswordModal();
  const hideEditModal = () =>
    setState(state => ({ ...state, editMode: !state.editMode }));
  const hideDeleteAccountModal = () => toggleDeleteAccountModal(false);
  const hideEditPasswordModal = () => toggleEditPasswordModal(false);

  return (
    <>
      <AddComponentsContainer>
        <styles.AddEquipmentWrapper mypage>
          <styles.AddEquipmentArticle>
            <styles.EquipmentDetailContainer>
              <styles.EquipmentLeftContainer>
                <MyPageEmpName
                  state={state}
                  handleEmpNameBlur={handleEmpNameBlur}
                  handleEmpNameClear={handleEmpNameClear}
                />
                <MyPagePhone
                  state={state}
                  handleChangePhone={handleChangePhone}
                  handlePhoneClear={handlePhoneClear}
                />
                <MypageDept
                  state={state}
                  handleChangeDepartmentId={handleChangeDepartmentId}
                  myDeptName={myDeptName}
                />
                <MypageAlarm state={state} handleChange={handleChange} />
              </styles.EquipmentLeftContainer>
              <styles.Hr />
              <ImageAdd
                preview={state.preview}
                onChangeimge={onChangeimge}
                onDeleteImage={handleDeleteImage}
                editMode={state.editMode}
              />
            </styles.EquipmentDetailContainer>
            <ProcessBtn
              state={state}
              handleLoginInfoAdd={handleLoginInfoAdd}
              showDeleteAccountModal={showDeleteAccountModal}
              showEditPasswordModal={showEditPasswordModal}
              hideEditModal={hideEditModal}
            />
          </styles.AddEquipmentArticle>
        </styles.AddEquipmentWrapper>
      </AddComponentsContainer>
      <CustomModal
        width={'26rem'}
        isOpen={editPasswordModal}
        onClose={hideEditPasswordModal}
        text={'완료'}
        submit={handleSecondPwEdit}
        disabled={
          !(state.departmentId && checkPwRegex && doubleCheckPwRegex) ||
          state.empName.length < 2 ||
          state.phone.replace(/-/g, '').length < 11
        }
      >
        <ChangePassword
          inputPw={inputPw}
          inputPwHandler={inputPwHandler}
          checkSame={checkSame}
          inputCheckPw={inputCheckPw}
          checkPwRegex={checkPwRegex}
          doubleCheckPwRegex={doubleCheckPwRegex}
          alertPw={alertPw}
          alertCheckPw={alertCheckPw}
        />
      </CustomModal>
      <CustomModal
        isOpen={deleteAccountModal}
        onClose={hideDeleteAccountModal}
        submit={handleDeleteAccount}
        text={'회원 탈퇴'}
      >
        <WarningMessageContainer>
          <span>정말 탈퇴하시겠습니까?</span>
          <span>탈퇴 후에는 복구할 수 없습니다.</span>
        </WarningMessageContainer>
      </CustomModal>
    </>
  );
}

const AddComponentsContainer = styled.main`
  ${props => props.theme.FlexRow};
  width: 100%;
  height: calc(100vh - 12.8125rem);
  background-color: white;
  box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4628rem;
  ${styles.TypeBox} {
    svg * {
      stroke: ${props => props.theme.color.grey.brandColor7};
    }
  }
`;

const WarningMessageContainer = styled.div`
  ${props => props.theme.FlexCol};
  span:last-child {
    padding-top: 0.5rem;
    color: ${props => props.theme.color.reject};
  }
`;
