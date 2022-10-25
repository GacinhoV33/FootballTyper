import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import './Ranking.scss';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterRanking from './FilterRanking';
import FilterLeauge from './FilterLeauge';
import ListRanking from './ListRanking';
import { User } from '../../App';
import { CSSTransition } from 'react-transition-group';

export type LeaugeName = {
  leaugeName: string,
  leaugeId: number,
  leaugeUsers: User[],
}
export type RankingFilters = 'general' | 'lastDay' | 'groupStage' | 'knockoutStage';

export type RankingProps = {
  allUsers: User[]
}

const Ranking = ({ allUsers }: RankingProps) => {

  const [filter, setFilter] = useState<RankingFilters>('general');
  const [leaugeFilter, setLeaugeFilter] = useState<string>('main');
  const [usersToDisplay, setUsersToDisplay] = useState<User[]>(allUsers);

  const leaugeUsers = dummyData.filter((user) => user.leauges.indexOf(leaugeFilter) !== -1);
  const sortedUsers = leaugeUsers.sort((user1, user2) => user2.totalPoints - user1.totalPoints ? user2.totalPoints - user1.totalPoints : user2.totalExactScoreBet - user1.totalExactScoreBet);
  useEffect(() => setUsersToDisplay(sortedUsers),
    [leaugeFilter])
  const currentDate = new Date();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <FilterRanking activeFilter={filter} setActiveFilter={setFilter}/>
          <FilterLeauge currentFilter={leaugeFilter} setCurrentFilter={setLeaugeFilter} />
        </div>
      </div>
      
      <div style={{ display: 'flex', minWidth: '500px', maxWidth: '1000px', width: '100%' }}>
        <ListRanking allUsers={usersToDisplay} leauge='clownLeauge' />
      </div>
    </div>


  )
}

export default Ranking;

export const dummyData: User[] = [
  {
    name: 'user123',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 50,
    totalExactScoreBet: 1,
    totalCorrectWinnerBet: 5,
    totalWrongBet: 6,
    leauges: ['main', 'clownLeauge'],
    id: 21312,
  },
  {
    name: 'user13',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 30,
    totalExactScoreBet: 2,
    totalCorrectWinnerBet: 0,
    totalWrongBet: 6,
    leauges: ['main'],
    id: 21312,
  },
  {
    name: 'user1111',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 31,
    totalExactScoreBet: 2,
    totalCorrectWinnerBet: 1,
    totalWrongBet: 14,
    leauges: ['main'],
    id: 21313,
  },
  {
    name: 'user1',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 11,
    totalExactScoreBet: 2,
    totalCorrectWinnerBet: 5,
    totalWrongBet: 6,
    leauges: ['main', 'clownLeauge'],
    id: 21314,
  },
  {
    name: 'user1',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 24,
    totalExactScoreBet: 2,
    totalCorrectWinnerBet: 4,
    totalWrongBet: 6,
    leauges: ['main',],
    id: 21315,
  },
  {
    name: 'user1',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 50,
    totalExactScoreBet: 3,
    totalCorrectWinnerBet: 5,
    totalWrongBet: 6,
    leauges: ['main', 'clownLeauge'],
    id: 21316,
  },
  {
    name: 'user1',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 54,
    totalExactScoreBet: 1,
    totalCorrectWinnerBet: 3,
    totalWrongBet: 1,
    leauges: ['main', 'clownLeauge'],
    id: 21317,
  },
]