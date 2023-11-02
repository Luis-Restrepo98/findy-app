import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../navigation/Navigation';

const Layout = () => {
  return (
    <>
      <Outlet />
      <Navigation />
    </>
  );
};

export default Layout;
