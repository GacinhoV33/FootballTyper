import React, { useEffect, useState } from 'react';
import './YourBets.scss';
import { Bet } from './MyBets/MyBets'
// components
import MyBets from './MyBets/MyBets';
import FiltersMyBets, { BetFilters } from './Filters/FiltersMyBets';

export interface YourBetsProps{
  userName: string,
  allBets: Bet[],
}
const YourBets: React.FC<YourBetsProps> = ({userName, allBets}) => {
  const currentDate = new Date();
  allBets.sort((bet1, bet2) => new Date(bet2.betDate).getTime() - new Date(bet1.betDate).getTime())
  const [filterMyBets, setFilterMyBets] = useState<BetFilters[]>([])
  const [betsToShow, setBetsToShow] = useState<Bet[]>(allBets)

  function sortMyBets(){
    let currentBets = allBets;
    if(filterMyBets.indexOf('GroupStage') !== -1 && allBets){
      currentBets = allBets.filter((bet) => bet.matchId <= 92)      // #TODO how to verify that match is groupstage
    }
    if(filterMyBets.indexOf('Correct') !== -1 && allBets){
      currentBets = allBets.filter((bet) => bet.successfulBet)
    }
    else if(filterMyBets.indexOf('Wrong') !== -1 && allBets){
      currentBets = allBets.filter((bet) => !bet.successfulBet)
    }
    if(filterMyBets.indexOf('KnockoutStage') !== -1 && allBets){
      //#TODO knockout stage
    }
    const currentDate = new Date();
    if(filterMyBets.indexOf('Past') !== -1 && allBets){
      currentBets = allBets.filter((bet) => new Date(bet.match.date) > currentDate);
    }
    else if(filterMyBets.indexOf('Active') !== -1 && allBets){
      currentBets = allBets.filter((bet) => new Date(bet.match.date) < currentDate);
    }

    setBetsToShow(currentBets);
  }
  useEffect(
    () => sortMyBets()
  , [filterMyBets]);
  
  
  return (
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <FiltersMyBets activeFilters={filterMyBets} setActiveFilters={setFilterMyBets}/>
      <MyBets userBetsData={betsToShow} allBets={allBets}/>
    </div>
  )
}

export default YourBets;