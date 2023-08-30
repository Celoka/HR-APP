import React from 'react';
import './index.scss';

const DashLayout = () => {
  return (
    <div className="dashLayout">
      <div className="dashLayout__first">
        <h1 className='dashLayout__title'> 
          Summary
        </h1>
        <button className="dashLayout__button">Export Data</button>
      </div>
      

    </div>
  )
};

export default DashLayout;