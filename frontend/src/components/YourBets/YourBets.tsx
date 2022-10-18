import React, { useState } from 'react';
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
  const [filterMyBets, setFilterMyBets] = useState<BetFilters>('All')
  return (
    <div>
      <FiltersMyBets activeFilter={filterMyBets} setActiveFilter={setFilterMyBets}/>
      <MyBets userBetsData={dummyBetData} allBets={allBets}/>
    </div>
  )
}

export default YourBets;