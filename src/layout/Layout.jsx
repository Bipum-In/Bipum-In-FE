import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div>
      <p>Header</p>
      <Outlet />
    </div>
  );
}
