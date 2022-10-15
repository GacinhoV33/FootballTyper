import React from 'react';
import './MyBets.scss';
import MatchBet from '../../KnockoutStage/MatchBet/MatchBet'
// Data
import { dummyBet } from '../../../helpers/dummyData';

// #TODO Add status to bet which show whether bet is open or closed
// 
const dummyData = {
    firstCountryName: 'Poland', // Country Type?
    secondCountryName: 'Germany', 
    firstCountryScore: '2', // Score type? 
    secondCountryScore: '1', 
    firstCountryCode: 'es',
    secondCountryCode: 'pl',
  }
  
  
  const MyBets = () => {
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

export default MyBets;