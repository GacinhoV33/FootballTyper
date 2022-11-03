import React, { useContext, useEffect, useState } from 'react';
import './YourBets.scss';
import { Bet } from './MyBets/MyBets';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// components
import MyBets from './MyBets/MyBets';
import FiltersMyBets, { BetFilters } from './Filters/FiltersMyBets';
import { UserContext } from '../../App';

export interface YourBetsProps{
  allBets: Bet[],
}
const YourBets: React.FC<YourBetsProps> = ({allBets}) => {
  const currentDate = new Date();
  const userCtx = useContext(UserContext);
  allBets.sort((bet1, bet2) => new Date(bet2.betDate).getTime() - new Date(bet1.betDate).getTime())
  const [filterMyBets, setFilterMyBets] = useState<BetFilters[]>([])
  const [betsToShow, setBetsToShow] = useState<Bet[]>([])

  function sortMyBets(){
    let currentBets = betsToShow;
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
  
  useEffect(() => {
    const getUserBets = async () => {
      const userName = userCtx.userLocalData ? userCtx.userLocalData.username : '';
      const allUserBets = await (await fetch(`api/Bets/User/${userName}`)).json();
      
      setBetsToShow(allUserBets);
      console.log('All users bets:', allUserBets)
    }
    getUserBets();
  }, [])
  
  return (
    
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <FiltersMyBets activeFilters={filterMyBets} setActiveFilters={setFilterMyBets}/>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)'}}>
        <div style={{gridColumn: '1/3', flexDirection:'column', alignItems: 'flex-start', padding: '0 2rem', textAlign: 'center'}}>
           <h2 style={{color: '#11A0F0'}}>All Bets</h2>
           <CircularProgressbar value={11} maxValue={48} text={`${allBets.length}/48`}/>
        </div>
        <div style={{gridColumn: '3/11'}}>
          <MyBets userBetsData={betsToShow} allBets={allBets}/>
        </div>
          <div style={{gridColumn: '11/13', alignItems: 'flex-start', padding: '0 2.5rem', textAlign: 'center'}}>
              <h2 style={{color: '#41F0A0'}}>Correct Score</h2>
              <CircularProgressbar value={6} maxValue={8} text={`${6/8*100}%`} styles={buildStyles({pathColor: 'darkgreen'})}/>
          </div>
      </div>
    </div>
  )
}

export default YourBets;