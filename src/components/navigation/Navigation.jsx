import React from 'react';
import navigationBackground from '../../assets/img/barra-navegacion.png';
import circulo from '../../assets/img/circulo.png';
import cruzIcon from '../../assets/icons/cruz-icon.svg';
import casaIcon from '../../assets/icons/casa-icon.svg';
import lupaIcon from '../../assets/icons/lupa-icon.svg';
import campanaIcon from '../../assets/icons/campana-icon.svg';
import userIcon from '../../assets/icons/user-icon.svg';

import './navigation.scss';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate('/home');
  const goToProfile = () => console.log('Voy al perfil del usuario');
  const newPost = () => console.log('Crear nueva publicación');

  return (
    <main className='navigation__container'>
      <div className='navigationBackground'>
        <img
          src={navigationBackground}
          alt='navigationBackground'
          className='navigationBackgroundImage'
        />
        <img
          src={casaIcon}
          alt='casaIcon'
          className='casaIcon'
          onClick={goToHome}
        />
        <img src={lupaIcon} alt='lupaIcon' className='lupaIcon' />
        <img src={campanaIcon} alt='campanaIcon' className='campanaIcon' />
        <img
          src={userIcon}
          alt='userIcon'
          className='userIcon'
          onClick={goToProfile}
        />
      </div>

      <div className='newPostButton'>
        <img
          src={circulo}
          alt='circulo'
          className='circulo'
          onClick={newPost}
        />
        <img
          src={cruzIcon}
          alt='cruzIcon'
          className='cruzIcon'
          onClick={newPost}
        />
      </div>
    </main>
  );
};

export default Navigation;
