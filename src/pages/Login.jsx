import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from '../api/axios';

const axios = new Axios('http://bipum-in.shop');

export default function Login() {
  const { search } = useLocation();

  useEffect(() => {
    axios
      .post('/api/user/kakao/callback', { code: search })
      .then(response => console.log(response));
  }, [search]);
  return <div>Login</div>;
}
