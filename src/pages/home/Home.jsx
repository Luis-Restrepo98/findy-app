import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../routes/Router';

import jennieKim from '../../assets/img/jennie-kim.png';

import './home.scss';

const Home = () => {
  const navigate = useNavigate();

  const {
    userLogged: { userLogged },
  } = useContext(AppContext);

  console.log('From Home:', userLogged);

  return (
    <div className='mainContainer'>
      <img src={jennieKim} alt='jennieKim' className='mainImage' />
      <img src={jennieKim} alt='jennieKim' className='mainImage' />
      {/* <button
        onClick={() => {
          navigate('/prueba');
        }}
      >
        Go to Prueba
      </button> */}
    </div>
  );
};

export default Home;
