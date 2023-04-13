import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ClearIcon } from 'styles/commonIcon/cancelInput.svg';

import Input from 'elements/Input';
import Button from 'elements/Button';
import ROUTER from 'constants/routerConst';

import Axios from 'api/axios';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'redux/modules/userInfoSlice';

import alertModal from 'utils/alertModal';
import { CustomModal } from 'elements/Modal';
import { useModalState } from 'hooks/useModalState';
import useRegexInput from 'hooks/useRegexInput';

import ImageAdd from 'components/equipmentAdd/single/ImageAdd';
import SelectCategory from 'components/common/SelectCategory';
import { styles } from 'components/common/commonStyled';
import logout from 'utils/logout';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function EditMyInfo({ getUserInfo }) {
  const {
    empName: myName,
    phone: myPhone,
    deptName: myDeptName,
    image: myImage,
    alarm: myAlarm,
  } = getUserInfo;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteAccountModal, toggleDeleteAccountModal] = useModalState();
  const [editPasswordModal, toggleEditPasswordModal] = useModalState();
  const [departmentList, setDepartmentList] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [empName, setEmpName] = useState(myName);
  const [phone, setPhone] = useState(myPhone);
  const [departmentName, setDepartmentName] = useState(myDeptName);
  const [formImage, setFormImage] = useState(null);
  const [userImg, setUserImg] = useState(myImage);
  const [preview, setPreview] = useState([myImage]);
  const [checkedAlarm, setCheckedAlarm] = useState(myAlarm);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get(`/api/dept`).then(res => {
      const deptList = res.data.data;
      const deptId = parseMyDeptId(deptList, departmentName);
      setDepartmentId(deptId);
      setDepartmentList(deptList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeDepartmentId = e => {
    const { ko: deptId } = JSON.parse(e.target.value);
    const departmentName = e.target.options[e.target.selectedIndex].innerText;
    setDepartmentName(departmentName);
    setDepartmentId(deptId);
  };

  function handleEmpNameBlur(event) {
    const { value } = event.target;
    const filteredValue = value.replace(/[^a-z|A-Z|ㄱ-ㅎ|가-힣]/g, '');
    setEmpName(filteredValue);
  }

  function handleChangePhone(event) {
    const { value } = event.target;
    const formattedValue = value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setPhone(formattedValue);
  }

  const handleLoginInfoAdd = () => {
    const formData = new FormData();
    const stringToNumPrice = phone.replace(/-/g, '');

    formData.append('deptId', departmentId);
    formData.append('empName', empName);
    formData.append('phone', stringToNumPrice);
    formData.append('alarm', checkedAlarm);

    if (formImage) {
      formData.append('multipartFile', formImage[0]);
    } else {
      formData.append('image', userImg);
    }

    dispatch(
      setUserInfo({
        deptName: departmentName,
        empName: empName,
        image: preview,
      })
    );

    axios
      .put(`/api/user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        alertModal(true, '정보가 성공적으로 수정되었습니다.', 2);
        setEditMode(false);
      });
  };

  const parseMyDeptId = (deptList, deptName) => {
    return deptList.filter(dept => dept.deptName === deptName)[0].deptId;
  };

  const handleDeleteImage = () => {
    setFormImage([]);
    setPreview([]);
  };

  const onChangeimge = e => {
    const img = e.target.files[0];
    setFormImage([img]);
    setPreviewImage(img);
    setUserImg('');
  };

  const handleChange = event => setCheckedAlarm(event.target.checked);

  const setPreviewImage = img => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview([reader.result]);
    };
    reader.readAsDataURL(img);
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.post(`/api/user/delete`);
      await axios.post(`/api/user/logout`);

      alertModal(false, '회원 탈퇴가 완료되었습니다.', 4);
      logout(navigate(ROUTER.PATH.MAIN));
    } catch (error) {}
  };

  const handleEmpNameClear = () => setEmpName('');
  const handlePhoneClear = () => setPhone('');
  const showDeleteAccountModal = () => toggleDeleteAccountModal();
  const showEditPasswordModal = () => toggleEditPasswordModal();
  const hideDeleteAccountModal = () => toggleDeleteAccountModal(false);
  const hideEditPasswordModal = () => toggleEditPasswordModal(false);

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
    axios.put(`/api/user/password`, { password: inputPw }).then(() => {
      alertModal(true, '2차 비밀번호가 성공적으로 수정되었습니다.', 2);
      setEditMode(false);
      toggleEditPasswordModal(false);
      reset();
    });
  };

  return (
    <>
      <AddComponentsContainer>
        <styles.AddEquipmentWrapper mypage>
          <styles.AddEquipmentArticle>
            <styles.EquipmentDetailContainer>
              <styles.EquipmentLeftContainer>
                {/* 이름 */}
                <styles.TypeBox>
                  <MyTypeTitle>이름</MyTypeTitle>
                  {editMode ? (
                    <MypageInput
                      type="text"
                      value={empName}
                      setState={handleEmpNameBlur}
                      placeholder="이름을 입력해주세요"
                      maxLength="15"
                    />
                  ) : (
                    <MyinfoSpan>{empName}</MyinfoSpan>
                  )}
                  {editMode && <ClearInputBtn onClick={handleEmpNameClear} />}
                </styles.TypeBox>
                {/* 전화번호 */}
                <styles.TypeBox>
                  <MyTypeTitle>전화번호</MyTypeTitle>
                  {editMode ? (
                    <MypageInput
                      value={phone}
                      setState={handleChangePhone}
                      placeholder="번호를 입력해 주세요"
                      maxLength="11"
                    />
                  ) : (
                    <MyinfoSpan>{phone}</MyinfoSpan>
                  )}
                  {editMode && <ClearInputBtn onClick={handlePhoneClear} />}
                </styles.TypeBox>
                {/* 부서 */}
                <styles.TypeBox>
                  <MyTypeTitle>부서</MyTypeTitle>
                  <styles.PartnerCompany>
                    {editMode ? (
                      <styles.SelectBox>
                        <SelectCategory
                          category={departmentList}
                          optionName={'deptName'}
                          optionNullName={departmentName}
                          optionKey={'deptName'}
                          optionValueKey={'deptId'}
                          onChangeCategory={handleChangeDepartmentId}
                        />
                      </styles.SelectBox>
                    ) : (
                      <MyinfoSpan>{myDeptName}</MyinfoSpan>
                    )}
                  </styles.PartnerCompany>
                </styles.TypeBox>
                {/* 알림 */}
                <styles.TypeBox>
                  <MyTypeTitle>알림</MyTypeTitle>
                  {editMode ? (
                    <CheckBox
                      role="switch"
                      checked={checkedAlarm}
                      onChange={handleChange}
                      editMode={editMode}
                    />
                  ) : (
                    !editMode && (checkedAlarm ? '활성화' : '비활성화')
                  )}
                </styles.TypeBox>
              </styles.EquipmentLeftContainer>
              <styles.Hr />
              <ImageAdd
                preview={preview}
                onChangeimge={onChangeimge}
                onDeleteImage={handleDeleteImage}
                editMode={editMode}
              />
            </styles.EquipmentDetailContainer>
            <styles.SubminPostContainer>
              {editMode ? (
                <>
                  <Button
                    type="button"
                    cancel
                    onClick={() => setEditMode(false)}
                  >
                    취소
                  </Button>
                  <Button
                    type="button"
                    submit
                    onClick={handleLoginInfoAdd}
                    disabled={
                      !departmentId ||
                      empName?.length < 2 ||
                      phone?.length < 11 ||
                      preview.length < 1
                    }
                  >
                    저장
                  </Button>
                </>
              ) : (
                <>
                  <DeleteButton
                    type="button"
                    cancel
                    onClick={showDeleteAccountModal}
                  >
                    회원 탈퇴
                  </DeleteButton>

                  <Button type="button" cancel onClick={showEditPasswordModal}>
                    2차 비밀번호 변경
                  </Button>
                  <CustomModal
                    width={'26rem'}
                    isOpen={editPasswordModal}
                    onClose={hideEditPasswordModal}
                    text={'완료'}
                    submit={handleSecondPwEdit}
                    disabled={
                      !(departmentId && checkPwRegex && doubleCheckPwRegex) ||
                      empName.length < 2 ||
                      phone.replace(/-/g, '').length < 11
                    }
                  >
                    <ChangePwContainer>
                      <p>2차 비밀번호 변경</p>
                      <ChangePwBox>
                        <ChangePw>
                          <span>새 2차 비밀번호</span>
                          <Input
                            value={inputPw}
                            setState={inputPwHandler}
                            singupInput
                            type="password"
                            placeholder="6자리 비밀번호"
                            minLength={6}
                          />
                        </ChangePw>
                        <LoginAlertSpan isCurrent={checkPwRegex}>
                          {alertPw}
                        </LoginAlertSpan>
                      </ChangePwBox>
                      <ChangePwBox>
                        <ChangePw>
                          <span>새 2차 비밀번호 확인</span>

                          <Input
                            value={inputCheckPw}
                            setState={checkSame}
                            singupInput
                            type="password"
                            placeholder="6자리 비밀번호"
                            minLength={6}
                          />
                        </ChangePw>
                        <LoginAlertSpan isCurrent={doubleCheckPwRegex}>
                          {alertCheckPw}
                        </LoginAlertSpan>
                      </ChangePwBox>
                    </ChangePwContainer>
                  </CustomModal>
                  <Button
                    type="button"
                    submit
                    onClick={() => setEditMode(true)}
                  >
                    수정
                  </Button>
                </>
              )}
            </styles.SubminPostContainer>
          </styles.AddEquipmentArticle>
        </styles.AddEquipmentWrapper>
      </AddComponentsContainer>
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

const MypageInput = styled(Input)`
  width: fit-content;
  height: 2.5rem;
  background: ${props => props.theme.color.grey.brandColor1};
  border-radius: 0.5rem;
`;

const MyTypeTitle = styled(styles.TypeTitle)`
  width: 4.375rem;
  margin-right: 2rem;
  font-weight: 600;
  color: ${props => props.theme.color.blue.brandColor6};
`;

const WarningMessageContainer = styled.div`
  ${props => props.theme.FlexCol};
  span:last-child {
    padding-top: 0.5rem;
    color: ${props => props.theme.color.reject};
  }
`;

const ClearInputBtn = styled(ClearIcon)`
  position: absolute;
  right: 1rem;
  cursor: pointer;
  transition: opacity 0.1s ease-in;
  opacity: 0;
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  position: relative;
  border-radius: 4rem !important;
  height: 2rem !important;
  width: 4rem;
  background: ${props => props.theme.color.grey.brandColor2} !important;
  cursor: pointer;
  transition: background 0.15s ease;
  pointer-events: ${props => (props.editMode ? 'auto' : 'none')};
  &:before {
    content: '';
    position: absolute;
    left: 0.4rem;
    width: 1.5em;
    height: 1.5em;
    top: 50%;
    border-radius: 50%;
    transform: translateY(-50%);
    background-color: white;
    transition: left 0.15s linear;
  }

  &:checked {
    background: ${props => props.theme.color.blue.brandColor6} !important;
  }

  &:checked::before {
    left: 2.6em;
  }
`;

const MyinfoSpan = styled.span`
  width: 11rem;
`;

const DeleteButton = styled(Button)`
  border: 0.0625rem solid #e91111;
  color: #e91111;
`;

const LoginAlertSpan = styled.div`
  bottom: -2rem;
  left: 0.5rem;
  display: flex;
  text-align: start;
  font-size: 0.8rem;
  padding: 0.2rem;
  color: ${props => (props.isCurrent ? '#58793e' : 'tomato')};
`;

const ChangePwContainer = styled.div`
  ${props => props.theme.FlexCol};

  gap: 0.75rem;
  p {
    color: ${props => props.theme.color.blue.brandColor7};
    font-weight: 600;
    font-size: 1.125rem;
    margin: 0 0 2rem;
  }
`;

const ChangePwBox = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: center;
  height: 3.75rem;

  span {
    color: ${props => props.theme.color.blue.brandColor6};
    font-weight: 600;
  }
  input {
    margin-left: auto;
    width: 7.3125rem;
    height: 2.5625rem;
    background: ${props => props.theme.color.grey.brandColor1};
  }
`;

const ChangePw = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
`;
