import React from 'react';
import StatusBar from '../statusBar/StatusBar';
import { Outlet } from 'react-router-dom';

const LayoutPublic = () => {
  return (
    <>
      <StatusBar />
      <Outlet />
    </>
  );
};

export default LayoutPublic;
