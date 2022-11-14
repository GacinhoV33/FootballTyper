import React, { useContext, useEffect, useState } from 'react';
import './YourBets.scss';
import { Bet } from './MyBets/MyBets';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import deepcopy from 'deepcopy';
// components
import MyBets from './MyBets/MyBets';
import FiltersMyBets, { BetFilters } from './Filters/FiltersMyBets';
import { User, UserContext } from '../../App';

export interface YourBetsProps {
  allUserBets: Bet[],
  allUsers: User[] | null,
}
const YourBets: React.FC<YourBetsProps> = ({ allUserBets, allUsers }) => {
  const userCtx = useContext(UserContext);
  const [filterMyBets, setFilterMyBets] = useState<BetFilters[]>([])
  const [betsToShow, setBetsToShow] = useState<Bet[]>(allUserBets)
  const userData = allUsers?.filter((user) => user.id === userCtx.userLocalData.id);

  const [totalNumberOfEndBets, setTotalNumberOfEndBets] = useState<number>(allUserBets.length)
  const [correctScores, setCorrectScores] = useState<Bet[]>(allUserBets.filter((bet: Bet) => bet.betResult === 2));
  const [correctResult, setCorrectResult] = useState<Bet[]>(allUserBets.filter((bet: Bet) => bet.betResult === 1));
  const [wrongBets, setWrongBets] = useState<Bet[]>(allUserBets.filter((bet: Bet) => bet.betResult === 0 && bet.betResult !== null));
  useEffect(

    () => {
      allUserBets.sort((bet1, bet2) => new Date(bet2.betDate).getTime() - new Date(bet1.betDate).getTime())
      function sortMyBets() {
        let currentBets = deepcopy(allUserBets);

        if (filterMyBets.indexOf('GroupStage') !== -1 && allUserBets) {
          currentBets = currentBets.filter((bet) => bet.match.group !== 'Knockout')      // #TODO how to verify that match is groupstage
        }
        if (filterMyBets.indexOf('KnockoutStage') !== -1 && allUserBets) {
          currentBets = currentBets.filter((bet) => bet.match.group === 'Knockout')
        }
        if (filterMyBets.indexOf('Correct') !== -1 && allUserBets) {
          currentBets = currentBets.filter((bet) => bet.betResult !== undefined && bet.betResult > 0)
        }
        else if (filterMyBets.indexOf('Wrong') !== -1 && allUserBets) {
          currentBets = currentBets.filter((bet) => bet.betResult !== undefined && bet.betResult === 0)
        }

        const currentDate = new Date();
        if (filterMyBets.indexOf('Past') !== -1 && allUserBets) {
          currentBets = currentBets.filter((bet) => new Date(bet.match.date) < currentDate);
        }
        else if (filterMyBets.indexOf('Active') !== -1 && allUserBets) {
          currentBets = currentBets.filter((bet) => new Date(bet.match.date) > currentDate);
        }
        if (filterMyBets.indexOf('All') !== -1) {
          currentBets = deepcopy(allUserBets);
        }
        setBetsToShow(currentBets);
      }
      sortMyBets()

    }
    , [filterMyBets]);

  useEffect(() => {
    const getUserBets = async () => {
      const userName = userCtx.userLocalData ? userCtx.userLocalData.username : '';
      const allUserBets = await (await fetch(`api/Bets/User/${userName}`)).json();
      setBetsToShow(allUserBets);
    }
    getUserBets();
    
    console.log('total', totalNumberOfEndBets)
  }, [])

  return (

    <div className='my-bets-main'>
      <FiltersMyBets activeFilters={filterMyBets} setActiveFilters={setFilterMyBets} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
        <div className='leftBar-yourbets'>
          <div style={{ display: 'flex' }}>
            <div className='circular-bar-sizing'>
              <h6 style={{ color: '#CCCCCC' }}>All Bets</h6>
              <CircularProgressbar value={11} maxValue={48} text={`${allUserBets.length}/48`} styles={buildStyles({textColor: '#CCCCCC'})}/>
            </div>
            <div className='circular-bar-sizing'>
              <h6 style={{ color: '#CCCCCC', display: 'inlineBlock' }}>Correct Score</h6>
              <CircularProgressbar
                value={correctScores.length}
                maxValue={totalNumberOfEndBets}
                //@ts-ignore
                text={`${totalNumberOfEndBets !== 0 ? (Number(correctScores.length / totalNumberOfEndBets).toFixed(4) * 100).toString().slice(0, 5) : 0.00}%`}
                styles={buildStyles({ pathColor: 'green', textColor: '#CCCCCC' })} />
            </div>
          </div>
          <div style={{ display: 'flex' }}>

            <div className='circular-bar-sizing'>
              <h6 style={{ color: '#CCCCCC' }}>Correct Result</h6>
              <CircularProgressbar
                value={correctResult.length} 
                maxValue={totalNumberOfEndBets} 
                //@ts-ignore
                text={`${totalNumberOfEndBets !== 0 ? (Number(correctResult.length / totalNumberOfEndBets).toFixed(4) * 100).toString().slice(0, 5) : 0.00}%`} 
                styles={buildStyles({ pathColor: 'darkgreen', textColor: '#CCCCCC' })} />
            </div>
            <div className='circular-bar-sizing'>
              <h6 style={{ color: '#CCCCCC' }}>Wrong</h6>
              <CircularProgressbar
                value={wrongBets.length} 
                maxValue={totalNumberOfEndBets}
                //@ts-ignore
                text={`${totalNumberOfEndBets !== 0 ? (Number(wrongBets.length/ totalNumberOfEndBets).toFixed(4) * 100).toString().slice(0, 5) : 0.00}%`}
                styles={buildStyles({ pathColor: 'red', textColor: '#CCCCCC', })} />
            </div>
          </div>
        </div>
        <div className='bets-main-content'>
          <MyBets allUserBets={betsToShow} />
        </div>
        <div className='rightBar-yourbets'>
          <h1>Points: {userData ? userData[0].totalPoints : '2'}</h1>
        </div>

      </div>
    </div>
  )
}

export default YourBets;