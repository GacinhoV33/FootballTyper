import React, { useState } from 'react';
import './YourBets.scss';
import { dummyBetData } from './MyBets/MyBets'
// components
import MyBets from './MyBets/MyBets';
import FiltersMyBets, { BetFilters } from './Filters/FiltersMyBets';

export interface YourBetsProps{
  userName: string,
}
const YourBets: React.FC<YourBetsProps> = ({userName}) => {
  const [filterMyBets, setFilterMyBets] = useState<BetFilters>('All')
  return (
    <div>
      <FiltersMyBets activeFilter={filterMyBets} setActiveFilter={setFilterMyBets}/>
      <MyBets userBetsData={dummyBetData}/>
    </div>
  )
}

export default YourBets;