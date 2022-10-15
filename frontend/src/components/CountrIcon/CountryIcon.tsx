import React from 'react';
import "./CountryIcon.scss";
import ReactCountryFlag from 'react-country-flag';


type IconSize = 'sm' | 'md' | 'lg';
interface CountryIconProps {
    size: IconSize,
    countryName: string,
}

const CountryIcon = ({size = 'lg', countryName = 'PL'} : CountryIconProps) => {
  return (
    <div>
        <ReactCountryFlag
        //@ts-ignore
        countryCode={CountryDict.get(countryName) ? CountryDict.get(countryName) : 'PL'}
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

export let CountryDict = new Map<string , string>();
CountryDict.set('Poland', 'pl')
CountryDict.set('USA', 'us')
CountryDict.set('Ecuador', 'ec')
CountryDict.set('Netherland', 'nl')
CountryDict.set('Qatar', 'qa')
CountryDict.set('Senegal', 'sn')
CountryDict.set('Greece', 'gr')
CountryDict.set('Denmark', 'dk')
CountryDict.set('Greece', 'gr')




export default CountryIcon;