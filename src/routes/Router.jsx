import React, { createContext, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Home from '../pages/home/Home';
import { ChakraProvider } from '@chakra-ui/react';
import userLoggedReducer, {
  userLoggedInitial,
} from '../reducers/userLoggedReducer';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import Layout from '../components/layout/Layout';
import postReducer, { postInitial } from '../reducers/postReducer';
import Perfil from '../pages/Perfil/Perfil';

export const AppContext = createContext({});

const Router = () => {
  const [userLogged, userLoggedDispatch] = useReducer(
    userLoggedReducer,
    userLoggedInitial
  );

  const [postState, postDispatch] = useReducer(postReducer, postInitial);

  const globalState = {
    userLogged: {
      userLogged,
      userLoggedDispatch,
    },
    postReducerInfo: {
      postState,
      postDispatch,
    },
  };

  return (
    <AppContext.Provider value={globalState}>
      <ChakraProvider>
        <BrowserRouter basename='/findy-app'>
          <Routes>
            <Route
              element={
                <PrivateRoutes isAuthenticate={userLogged.isAuthenticated} />
              }
            >
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/profile/:id' element={<Perfil />} />
              </Route>
            </Route>
            <Route
              element={
                <PublicRoutes isAuthenticate={userLogged.isAuthenticated} />
              }
            >
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AppContext.Provider>
  );
};

export default Router;
