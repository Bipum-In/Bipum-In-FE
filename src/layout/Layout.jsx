import React from 'react';
import { Outlet } from 'react-router-dom';
// import Header from './Header';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  return (
    <>
      {/* <Header /> */}
      <Sidebar />
      <Outlet />
    </>
  );
}
