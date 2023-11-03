import React, { useContext } from 'react';
import { AppContext } from '../../routes/Router';

const Prueba = () => {
  const {
    userLogged: { userLogged },
  } = useContext(AppContext);

  console.log('From Prueba', userLogged);

  return <div>Prueba</div>;
};

export default Prueba;
