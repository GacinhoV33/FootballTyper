import React from 'react';
import './YourBets.scss';

// components
import MyBets from './MyBets/MyBets';
import Filters from './Filters/Filters';

const YourBets = () => {
  return (
    <div className='dev-class-yourbets'>
      <Filters/>
      <MyBets/>
    </div>
  )
}

export default YourBets