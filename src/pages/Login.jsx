import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from '../api/axios';

const axios = new Axios('https://bipum-in.shop:8080');

export default function Login() {
  const { search } = useLocation();

  useEffect(() => {
    axios
      .get('/api/dept', { code: search })
      .then(response => console.log(response));
  }, []);
  return <div>Login</div>;
}
