import React, { useEffect, useState } from 'react';
import './YourBets.scss';
import { Bet, dummyBetData } from './MyBets/MyBets'
// components
import MyBets from './MyBets/MyBets';
import FiltersMyBets, { BetFilters } from './Filters/FiltersMyBets';

export interface YourBetsProps{
  userName: string,
  allBets: Bet[] | null,
}
const YourBets: React.FC<YourBetsProps> = ({userName, allBets}) => {
  const [filterMyBets, setFilterMyBets] = useState<BetFilters[]>([])
  const [betsToShow, setBetsToShow] = useState<Bet[] | null>(allBets)
  console.log('AllBets', allBets);
  function sortMyBets(){
    let currentBets = allBets;
    if(filterMyBets.indexOf('GroupStage') !== -1 && allBets){
      currentBets = allBets?.filter((bet) => bet.matchId <= 92)      // #TODO how to verify that match is groupstage
    }
    if(filterMyBets.indexOf('Correct') !== -1 && allBets){
      currentBets = allBets?.filter((bet) => bet.successfulBet)
    }
    else if(filterMyBets.indexOf('Wrong') !== -1 && allBets){
      currentBets = allBets?.filter((bet) => !bet.successfulBet)
    }
    if(filterMyBets.indexOf('KnockoutStage') !== -1 && allBets){
      //#TODO knockout stage
    }
    setBetsToShow(currentBets)
  }
  useEffect(
    () => sortMyBets()
  , [filterMyBets]);

  return (
    <div>
      <FiltersMyBets activeFilters={filterMyBets} setActiveFilters={setFilterMyBets}/>
      <MyBets userBetsData={betsToShow} allBets={allBets}/>
    </div>
  )
}

export default YourBets;