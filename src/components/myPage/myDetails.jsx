import React, { useEffect, useState } from 'react';

import Axios from 'api/axios';
import { setUserInfo } from 'redux/modules/userInfoSlice';

import styled from 'styled-components';
import { styles } from 'components/common/commonStyled';
import Input from 'elements/Input';
import Button from 'elements/Button';
import ImageAdd from 'components/equipmentAdd/single/ImageAdd';
import SelectCategory from 'components/common/SelectCategory';
import { useDispatch } from 'react-redux';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function MyDetails({ getUserInfo }) {
  const {
    empName: myName,
    phone: myPhone,
    deptName: myDeptName,
    image: myImage,
  } = getUserInfo;

  const dispatch = useDispatch();
  const [departmentList, setDepartmentList] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [empName, setEmpName] = useState(myName);
  const [phone, setPhone] = useState(myPhone);
  const [departmentName, setDepartmentName] = useState(myDeptName);
  const [formImage, setFormImage] = useState(null);
  const [userImg, setUserImg] = useState(myImage);
  const [preview, setPreview] = useState([myImage]);

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
    if (!departmentId || !empName || !phone)
      return alert('모든 정보를 입력해주세요');
    const stringToNumPrice = phone.replace(/-/g, '');

    formData.append('deptId', departmentId);
    formData.append('empName', empName);
    formData.append('phone', stringToNumPrice);
    formData.append('alarm', true);

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

    axios.put(`/api/user`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const parseMyDeptId = (deptList, deptName) => {
    return deptList.filter(dept => dept.deptName === deptName)[0].deptId;
  };

  const handleDeleteImage = e => {
    setFormImage([]);
    setPreview([]);
  };

  const onChangeimge = e => {
    const img = e.target.files[0];
    console.log(img);
    setFormImage([img]);
    setPreviewImage(img);
    setUserImg('');
  };

  const setPreviewImage = img => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview([reader.result]);
    };
    reader.readAsDataURL(img);
  };

  const handleDeleteAccount = () => {
    axios.post(`/api/user/delete`);
  };
  return (
    <>
      <SetUserInputContainer>
        <styles.TypeBox>
          <styles.TypeTitle requiredinput="true">부서선택</styles.TypeTitle>
          <styles.SelectCaregoryConteiner>
            <SelectCategory
              category={departmentList}
              optionName={'deptName'}
              optionNullName={departmentName}
              optionKey={'deptName'}
              optionValueKey={'deptId'}
              onChangeCategory={handleChangeDepartmentId}
            />
          </styles.SelectCaregoryConteiner>
        </styles.TypeBox>

        <styles.TypeBox>
          <styles.TypeTitle requiredinput="true">사용자 이름</styles.TypeTitle>
          <Input
            type="text"
            value={empName}
            setState={handleEmpNameBlur}
            placeholder="이름을 입력해주세요"
          />
        </styles.TypeBox>

        <styles.TypeBox>
          <styles.TypeTitle requiredinput="true">핸드폰 번호</styles.TypeTitle>
          <Input
            value={phone}
            setState={handleChangePhone}
            placeholder="번호를 입력해 주세요"
            maxLength="11"
          />
        </styles.TypeBox>
      </SetUserInputContainer>
      <ImageAdd
        preview={preview}
        onChangeimge={onChangeimge}
        onDeleteImage={handleDeleteImage}
      />
      <SetUserSubmitContainer>
        <Button
          submit
          onClick={handleLoginInfoAdd}
          // disabled={empName.length < 2}
        >
          완료
        </Button>

        <Button submit onClick={handleDeleteAccount}>
          회원 탈퇴
        </Button>
      </SetUserSubmitContainer>
    </>
  );
}

const SetUserInputContainer = styled.div`
  ${props => props.theme.FlexCol};
  align-items: flex-start;
  margin-top: auto;
  gap: 2.5rem;
  padding-bottom: 4.5625rem;
`;

const SetUserSubmitContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  > button {
    width: 5.25rem;
    font-weight: bold;
  }
`;
