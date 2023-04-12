import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { styles } from 'components/common/commonStyled';

import Axios from 'api/axios';
import ROUTER from 'constants/routerConst';
import QUERY from 'constants/query';
import Storage from 'utils/localStorage';
import { encrypt } from '../utils/encryption';

import Input from 'elements/Input';
import Button from 'elements/Button';
import SelectCategory from 'components/common/SelectCategory';
import useRegexInput from 'hooks/useRegexInput';

import KakaoUserInfo from 'styles/rendingIcon/kakaoUserInfo.svg';
import { ReactComponent as Logo } from 'styles/logo.svg';
import { getEncryptionStorage } from '../utils/encryptionStorage';
import STRING from 'constants/string';

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
  const [departmentName, setDepartmentName] = useState('팀을 선택해주세요');

  const pwRegex = /^\d{6}$/;
  const [inputPw, inputPwHandler, alertPw, checkPwRegex] = useRegexInput(
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

  useEffect(() => {
    const code = search.split('=')[1];
    const currentUrl = document.location.href.split('//')[1].substring(0, 5);
    const { checkUser, isAdmin } = getEncryptionStorage();

    async function fetchData() {
      if (getEncryptionStorage() && checkUser) {
        const targetPath = ROUTER.PATH[STRING.IS_ADMIN(isAdmin)].DASHBOARD;
        navigate(targetPath);
        return;
      }

      if (code && !checkCode) {
        try {
          const response = await axios.post(
            `/api/user/login/google?code=${code}&urlType=${currentUrl}`
          );
          const userInfo = response.data.data;
          const { checkUser } = userInfo;
          const encryptedUserInfo = encrypt(userInfo); // 암호화
          Storage.setLocalStorageJSON(
            QUERY.STORAGE.LOCAL_NAME,
            encryptedUserInfo
          );
          setSaveUserInfo(userInfo);
          setWriteUser(checkUser);
          setCheckCode(true);

          const deptResponse = await axios.get(`/api/dept`);
          setDepartmentList(deptResponse.data.data);
        } catch (error) {
          console.error(error);
        }
      }

      if (writeUser) {
        const targetPath = ROUTER.PATH[STRING.IS_ADMIN(isAdmin)].DASHBOARD;
        navigate(targetPath);
      }
    }

    fetchData();
  }, [checkCode, navigate, search, writeUser]);

  const handleLoginInfoAdd = () => {
    const { ko: deptId } = JSON.parse(departmentId);
    const stringToNumPrice = phone.replace(/-/g, '');

    const loginadd = {
      departmentId: deptId,
      empName,
      phone: stringToNumPrice,
      password: inputPw,
    };

    Storage.setLocalStorageJSON(
      QUERY.STORAGE.LOCAL_NAME,
      encrypt({
        ...saveUserInfo,
        checkUser: true,
      })
    );

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
                <styles.TypeTitle dept requiredinput="true">
                  부서선택
                </styles.TypeTitle>
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
                <TypeTitles requiredinput="true">사용자 이름</TypeTitles>
                <Input
                  type="text"
                  value={empName}
                  setState={handleEmpNameBlur}
                  placeholder="이름을 입력해주세요"
                />
              </styles.TypeBox>

              <styles.TypeBox>
                <TypeTitles requiredinput="true">핸드폰 번호</TypeTitles>
                <Input
                  value={phone}
                  setState={handleChangePhone}
                  placeholder="번호를 입력해 주세요"
                  maxLength="11"
                />
              </styles.TypeBox>
              <styles.TypeBox>
                <TypeTitles requiredinput="true">비밀번호</TypeTitles>
                <Input
                  value={inputPw}
                  setState={inputPwHandler}
                  singupInput
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  minLength={8}
                />
                <LoginAlertSpan isCurrent={checkPwRegex}>
                  {alertPw}
                </LoginAlertSpan>
              </styles.TypeBox>

              <styles.TypeBox>
                <TypeTitles requiredinput="true">비밀번호 확인</TypeTitles>
                <Input
                  value={inputCheckPw}
                  setState={checkSame}
                  singupInput
                  type="password"
                  placeholder="비밀번호 확인"
                  minLength={8}
                />
                <LoginAlertSpan isCurrent={doubleCheckPwRegex}>
                  {alertCheckPw}
                </LoginAlertSpan>
              </styles.TypeBox>
            </SetUserInputContainer>
            <SetUserSubmitContainer>
              <Button
                submit
                onClick={handleLoginInfoAdd}
                disabled={
                  !(departmentId && checkPwRegex && doubleCheckPwRegex) ||
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

const TypeTitles = styled(styles.TypeTitle)`
  width: 12.75rem;
`;

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

const LoginAlertSpan = styled.div`
  position: absolute;
  bottom: -2rem;
  left: 0.5rem;
  display: flex;
  text-align: start;
  font-size: 0.8rem;
  padding: 0.2rem;
  color: ${props => (props.isCurrent ? '#58793e' : 'tomato')};
`;
