import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../routes/Router';

const Home = () => {
  const navigate = useNavigate();

  const {
    userLogged: { userLogged },
  } = useContext(AppContext);

  console.log('From Home:', userLogged);

  return (
    <div>
      <button
        onClick={() => {
          navigate('/prueba');
        }}
      >
        Go to Prueba
      </button>
    </div>
  );
};

export default Home;
