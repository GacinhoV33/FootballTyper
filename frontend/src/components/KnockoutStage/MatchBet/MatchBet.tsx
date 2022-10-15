import React from 'react';
import './MatchBet.scss';
import { CircleFlag } from 'react-circle-flags'

export interface MatchBetProps {
  firstCountryName: string, // Country Type?
  secondCountryName: string, 
  firstCountryScore: string, // Score type? 
  secondCountryScore: string, 
  firstCountryCode: string,
  secondCountryCode: string,
}

const MatchBet: React.FC<MatchBetProps> = ({
  firstCountryName,
  secondCountryName,
  firstCountryScore,
  secondCountryScore,
  firstCountryCode,
  secondCountryCode,

}) => {
  return (
    <div className='matchbet' >
      <CircleFlag countryCode={firstCountryCode} height="25" style={{marginRight: '3px'}}/>
      {firstCountryName} {firstCountryScore} : {secondCountryScore} {secondCountryName}
      <CircleFlag countryCode={secondCountryCode} height='25' style={{marginLeft: '3px'}}/>
    </div>
  )
}

export default MatchBet