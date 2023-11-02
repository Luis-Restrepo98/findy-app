import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../navigation/Navigation';

const LayoutPrivate = () => {
  return (
    <>
      <Outlet />
      <Navigation />
    </>
  );
};

export default LayoutPrivate;
