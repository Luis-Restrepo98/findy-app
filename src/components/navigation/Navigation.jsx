import React from 'react';
import navigationBackground from '../../assets/img/barra-navegacion.png';
import circulo from '../../assets/img/circulo.png';
import cruzIcon from '../../assets/icons/cruz-icon.svg';
import casaIcon from '../../assets/icons/casa-icon.svg';
import lupaIcon from '../../assets/icons/lupa-icon.svg';
import campanaIcon from '../../assets/icons/campana-icon.svg';
import userIcon from '../../assets/icons/user-icon.svg';

import './navigation.scss';

const Navigation = () => {
  return (
    <main className='navigation__container'>
      <div className='newPostButton'>
        <img src={circulo} alt='circulo' className='circulo' />
        <img src={cruzIcon} alt='cruzIcon' className='cruzIcon' />
      </div>
      <div className='navigationBackground'>
        <img src={navigationBackground} alt='navigationBackground' />
        <img src={casaIcon} alt='casaIcon' className='casaIcon' />
        <img src={lupaIcon} alt='lupaIcon' className='lupaIcon' />
        <img src={campanaIcon} alt='campanaIcon' className='campanaIcon' />
        <img src={userIcon} alt='userIcon' className='userIcon' />
      </div>
    </main>
  );
};

export default Navigation;
