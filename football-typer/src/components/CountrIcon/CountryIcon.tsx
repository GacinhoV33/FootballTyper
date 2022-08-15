import React from 'react';
import "./CountryIcon.scss";
import ReactCountryFlag from 'react-country-flag';


type IconSize = 'sm' | 'md' | 'lg';
interface CountryIconProps {
    size: IconSize,
    countryName: string,
}

const CountryIcon = ({size = 'lg', countryName = 'US'} : CountryIconProps) => {
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
CountryDict.set('Poland', 'PL')
CountryDict.set('USA', 'US')
CountryDict.set('Ecuador', 'EC')
CountryDict.set('Netherland', 'NL')
CountryDict.set('Qatar', 'QA')
CountryDict.set('Senegal', 'SN')
CountryDict.set('Greece', 'GR')
CountryDict.set('Denmark', 'DK')
CountryDict.set('Greece', 'GR')




export default CountryIcon;