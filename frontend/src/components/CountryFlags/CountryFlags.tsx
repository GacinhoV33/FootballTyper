import React from 'react';
import Flag from './Flag/Flag';
import './CountryFlags.scss';

const CountryFlags = () => {
  return (
    <div className='dev-class-country'>
      <Flag/>
      <Flag/>
      <Flag/>

      ---This is CountryFlags
    </div>
    
  )
}

export default CountryFlags;