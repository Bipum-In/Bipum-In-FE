import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ClearIcon } from 'styles/commonIcon/cancelInput.svg';

import Input from 'elements/Input';
import Button from 'elements/Button';
import ROUTER from 'constants/routerConst';
import QUERY from 'constants/query';

import Axios from 'api/axios';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'redux/modules/userInfoSlice';

import alertModal from 'utils/alertModal';
import { CustomModal } from 'elements/Modal';
import { useModalState } from 'hooks/useModalState';
import { removeCookie } from 'utils/cookie';
import Storage from 'utils/localStorage';

import ImageAdd from 'components/equipmentAdd/single/ImageAdd';
import SelectCategory from 'components/common/SelectCategory';
import { styles } from 'components/common/commonStyled';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function MyDetails({ getUserInfo }) {
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
  const [departmentList, setDepartmentList] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [empName, setEmpName] = useState(myName);
  const [phone, setPhone] = useState(myPhone);
  const [departmentName, setDepartmentName] = useState(myDeptName);
  const [formImage, setFormImage] = useState(null);
  const [userImg, setUserImg] = useState(myImage);
  const [preview, setPreview] = useState([myImage]);
  const [checkedAlarm, setCheckedAlarm] = useState(myAlarm);

  // const [state, setState] = useState({
  //   departmentList: '',
  //   departmentId: '',
  //   empName: myName,
  //   phone: myPhone,
  //   departmentName: myDeptName,
  //   formImage: null,
  //   userImg: myImage,
  //   preview: [myImage],
  //   checkedAlarm: false,
  // });

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
      .then(() => alertModal(true, '정보가 성공적으로 수정되었습니다.', 2));
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

  const handleDeleteAccount = () => {
    axios.post(`/api/user/delete`).then(() => {
      alertModal(false, '회원 탈퇴가 완료되었습니다.', 4);
      removeCookie(QUERY.COOKIE.COOKIE_NAME);
      Storage.clearLocalStorage();
      navigate(ROUTER.PATH.MAIN);
    });
  };

  const handleEmpNameClear = () => setEmpName('');
  const handlePhoneClear = () => setPhone('');
  const showDeleteAccountModal = () => toggleDeleteAccountModal();
  const hideDeleteAccountModal = () => toggleDeleteAccountModal(false);
  console.log('checkedAlarm', checkedAlarm);
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
                  <MypageInput
                    type="text"
                    value={empName}
                    setState={handleEmpNameBlur}
                    placeholder="이름을 입력해주세요"
                    maxLength="15"
                  />
                  <ClearInputBtn onClick={handleEmpNameClear} />
                </styles.TypeBox>
                {/* 전화번호 */}
                <styles.TypeBox>
                  <MyTypeTitle>전화번호</MyTypeTitle>
                  <MypageInput
                    value={phone}
                    setState={handleChangePhone}
                    placeholder="번호를 입력해 주세요"
                    maxLength="11"
                  />
                  <ClearInputBtn onClick={handlePhoneClear} />
                </styles.TypeBox>
                {/* 부서 */}
                <styles.TypeBox>
                  <MyTypeTitle>부서</MyTypeTitle>
                  <styles.PartnerCompany>
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
                  </styles.PartnerCompany>
                </styles.TypeBox>
                {/* 알림 */}
                <styles.TypeBox>
                  <MyTypeTitle>알림</MyTypeTitle>
                  <CheckBox
                    role="switch"
                    checked={checkedAlarm}
                    onChange={handleChange}
                  />
                </styles.TypeBox>
              </styles.EquipmentLeftContainer>
              <styles.Hr />
              <ImageAdd
                preview={preview}
                onChangeimge={onChangeimge}
                onDeleteImage={handleDeleteImage}
              />
            </styles.EquipmentDetailContainer>
            <styles.SubminPostContainer>
              <Button type="button" cancel onClick={showDeleteAccountModal}>
                회원 탈퇴
              </Button>
              <Button
                type="button"
                submit
                onClick={handleLoginInfoAdd}
                disabled={
                  !departmentId || empName?.length < 2 || phone?.length < 11
                }
              >
                저장
              </Button>
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
