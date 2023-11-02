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
import PublicRoutes from './publicRoutes';
import Prueba from '../pages/prueba/Prueba';
import StatusBar from '../components/statusBar/StatusBar';
import Navigation from '../components/navigation/Navigation';
import LayoutPublic from '../components/layout/LayoutPublic';

export const AppContext = createContext({});

const Router = () => {
  const [userLogged, userLoggedDispatch] = useReducer(
    userLoggedReducer,
    userLoggedInitial
  );

  const globalState = {
    userLogged: {
      userLogged,
      userLoggedDispatch,
    },
  };

  return (
    <AppContext.Provider value={globalState}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<StatusBar />} /> */}
            <Route element={<LayoutPublic />}>
              <Route
                element={
                  <PrivateRoutes isAuthenticate={userLogged.isAuthenticated} />
                }
              >
                <Route index element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/prueba' element={<Prueba />} />
              </Route>
              <Route
                element={
                  <PublicRoutes isAuthenticate={userLogged.isAuthenticated} />
                }
              >
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AppContext.Provider>
  );
};

export default Router;
