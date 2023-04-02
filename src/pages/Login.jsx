import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { styles } from 'components/common/commonStyled';

import Axios from 'api/axios';
import ROUTER from 'constants/routerConst';
import QUERY from 'constants/query';
import Storage from 'utils/localStorage';

import Input from 'elements/Input';
import Button from 'elements/Button';
import SelectCategory from 'components/common/SelectCategory';

import KakaoUserInfo from 'styles/rendingIcon/kakaoUserInfo.svg';
import { ReactComponent as Logo } from 'styles/logo.svg';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);
export default function Login() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [writeUser, setWriteUser] = useState(false);
  const [checkCode, setCheckCode] = useState(false);
  const [departmentList, setDepartmentList] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [empName, setEmpName] = useState('');
  const [phone, setPhone] = useState('');
  const [saveUserInfo, setSaveUserInfo] = useState(false);
  const [departmentName, setDepartmentName] = useState('');

  useEffect(() => {
    const code = search.split('=')[1];

    const localStorageData = Storage.getLocalStorageJSON(
      QUERY.STORAGE.LOCAL_NAME
    );

    if (localStorageData && localStorageData.checkUser) {
      navigate(ROUTER.PATH.ADMIN.DASHBOARD);
    }

    if (code && !checkCode) {
      axios.post(`/api/user/login?code=${code}`).then(res => {
        const userInfo = res.data.data;
        const { checkUser } = userInfo;
        Storage.setLocalStorageJSON(QUERY.STORAGE.LOCAL_NAME, userInfo);
        setSaveUserInfo(userInfo);
        setWriteUser(checkUser);
        setCheckCode(true);
      });
      axios.get(`/api/dept`).then(res => setDepartmentList(res.data.data));
    }
    writeUser && navigate(ROUTER.PATH.ADMIN.DASHBOARD);
  }, [checkCode, navigate, search, writeUser]);

  const handleLoginInfoAdd = () => {
    const { ko: deptId } = JSON.parse(departmentId);
    const stringToNumPrice = phone.replace(/-/g, '');

    if (!deptId || !empName || !phone) return alert('모든 정보를 입력해주세요');

    const loginadd = {
      departmentId: deptId,
      empName,
      phone: stringToNumPrice,
    };

    Storage.setLocalStorageJSON('userData', {
      ...saveUserInfo,
      checkUser: true,
      deptName: departmentName,
      empName,
    });

    axios
      .post(`/api/user/loginadd`, loginadd)
      .then(res => setWriteUser(res.data.data));
  };

  const handleChangeDepartmentId = e => {
    const { value } = e.target;
    const departmentName = e.target.options[e.target.selectedIndex].innerText;
    setDepartmentName(departmentName);
    setDepartmentId(value);
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

  return (
    <>
      {!writeUser && checkCode && (
        <LoginWrapper bg={KakaoUserInfo}>
          <SetUserInfo>
            <Logo />
            <SetUserInputContainer>
              <styles.TypeBox>
                <styles.TypeTitle kakao requiredinput="true">
                  부서선택
                </styles.TypeTitle>
                <styles.SelectCaregoryConteiner>
                  <SelectCategory
                    category={departmentList}
                    optionName={'deptName'}
                    optionNullName={'팀을 선택해주세요'}
                    optionKey={'deptName'}
                    optionValueKey={'deptId'}
                    onChangeCategory={handleChangeDepartmentId}
                  />
                </styles.SelectCaregoryConteiner>
              </styles.TypeBox>

              <styles.TypeBox>
                <styles.TypeTitle requiredinput="true">
                  사용자 이름
                </styles.TypeTitle>
                <Input
                  type="text"
                  value={empName}
                  setState={handleEmpNameBlur}
                  placeholder="이름을 입력해주세요"
                />
              </styles.TypeBox>

              <styles.TypeBox>
                <styles.TypeTitle requiredinput="true">
                  핸드폰 번호
                </styles.TypeTitle>
                <Input
                  value={phone}
                  setState={handleChangePhone}
                  placeholder="번호를 입력해 주세요"
                  maxLength="11"
                />
              </styles.TypeBox>
            </SetUserInputContainer>
            <SetUserSubmitContainer>
              <Button
                submit
                onClick={handleLoginInfoAdd}
                disabled={
                  !departmentId ||
                  empName.length < 2 ||
                  phone.replace(/-/g, '').length < 11
                }
              >
                완료
              </Button>
            </SetUserSubmitContainer>
          </SetUserInfo>
        </LoginWrapper>
      )}
    </>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  ::before {
    content: '';
    background: url(${props => props.bg}) no-repeat center center/cover;
    width: 100%;
    height: 100%;
  }
`;

const SetUserInfo = styled.div`
  position: absolute;
  ${props => props.theme.FlexCol};
  ${props => props.theme.Boxshadow};
  width: 30.375rem;
  height: 36.9375rem;
  background: white;
  padding: 5rem 6.5625rem;
  > svg {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
  }
`;

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
