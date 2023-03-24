import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Axios from '../api/axios';
import Input from '../elements/Input';
import SelectCategory from '../components/common/SelectCategory';

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

  useEffect(() => {
    const code = search.split('=')[1];

    if (code && !checkCode) {
      axios.post(`/api/user/login?code=${code}`).then(res => {
        setWriteUser(res.data.data);
        setCheckCode(true);
      });

      axios.get(`/api/dept`).then(res => setDepartmentList(res.data.data));
    }

    writeUser && navigate('/admin-dashboard');
  }, [checkCode, navigate, search, writeUser]);

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=bad08c2762b0ad4460013109d47675f2&redirect_uri=http://localhost:3000/api/user/kakao/callback&response_type=code`;
  };

  const handleLoginInfoAdd = () => {
    const { ko: deptId } = JSON.parse(departmentId);

    if (!deptId || !empName || !phone) return alert('모든 정보를 입력해주세요');

    const loginadd = {
      departmentId: deptId,
      empName,
      phone,
    };

    axios
      .post(`/api/user/loginadd`, loginadd)
      .then(res => setWriteUser(res.data.data));
  };

  const handleChangeDepartmentId = e => setDepartmentId(e.target.value);
  const handleChangeEmpName = e => setEmpName(e.target.value);
  const handleChangePhone = e => setPhone(e.target.value);

  return (
    <LoginWrapper>
      {!checkCode && <button onClick={handleKakaoLogin}>카카오 로그인</button>}
      {!writeUser && checkCode && (
        <SetUserInfo>
          <SelectCategory
            category={departmentList}
            optionName={'deptName'}
            optionNullName={'팀을 선택해주세요'}
            optionKey={'deptName'}
            optionValueKey={'deptId'}
            onChangeCategory={handleChangeDepartmentId}
          />
          <p>사용자 이름</p>
          <Input value={empName} setState={handleChangeEmpName} />
          <p>핸드폰 번호</p>
          <Input value={phone} setState={handleChangePhone} />
          <button onClick={handleLoginInfoAdd}>완료</button>
        </SetUserInfo>
      )}
    </LoginWrapper>
  );
}

const LoginWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  button {
    width: 10rem;
    height: 3rem;
    background-color: #ffea00;
  }
`;

const SetUserInfo = styled.div`
  input {
    border: 1px solid black;
  }
`;
