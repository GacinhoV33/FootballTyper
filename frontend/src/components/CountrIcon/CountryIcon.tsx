import React from 'react';
import "./CountryIcon.scss";
import ReactCountryFlag from 'react-country-flag';
import CountryDict from '../YourBets/MyBets/CountryDict';

type IconSize = 'sm' | 'md' | 'lg';
interface CountryIconProps {
    size: IconSize,
    countryName: string,
}

const CountryIcon = ({size = 'lg', countryName = 'PL'} : CountryIconProps) => {
  return (
    <div>
        <ReactCountryFlag
        countryCode={CountryDict.get(countryName) ? CountryDict.get(countryName) as string : 'pl'}
        sizes='lg'
        style={size === 'lg' ? {
          width: '3rem',
          height: '3rem',
      } : ( size === 'md' ? {
        width: '2rem',
        height: '2rem',
      } : {
        width: '1rem',
        height: '1rem',
      }
      )
    }
    svg
        />
    </div>
  )
}

export default CountryIcon;