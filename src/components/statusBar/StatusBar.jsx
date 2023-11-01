import React from 'react';
import indicators from '../../assets/icons/indicadores-icon.svg';

import './statusBar.scss';

const StatusBar = () => {
  return (
    <header className='statusBar__container'>
      <div className='hour'>9:41</div>
      <div className='status'>
        <img src={indicators} alt='indicators' className='indicators' />
      </div>
    </header>
  );
};

export default StatusBar;
