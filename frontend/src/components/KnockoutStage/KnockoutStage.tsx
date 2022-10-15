import React from 'react'
import MatchBet from './MatchBet/MatchBet';
import './KnockoutStage.scss';

const dummyData = {
  firstCountryName: 'Poland', // Country Type?
  secondCountryName: 'Germany', 
  firstCountryScore: '2', // Score type? 
  secondCountryScore: '1', 
  firstCountryCode: 'es',
  secondCountryCode: 'pl',
}


const KnockoutStage = () => {
  return (
    <div className='dev-class-knockout'>
      <MatchBet {...dummyData}/>
      <MatchBet {...dummyData}/>
      <MatchBet {...dummyData}/>
      <MatchBet {...dummyData}/>
      <MatchBet {...dummyData}/>
      <MatchBet {...dummyData}/>
    </div>


  )
}

export default KnockoutStage