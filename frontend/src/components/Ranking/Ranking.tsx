import React, { useEffect } from 'react';
import { useState } from 'react';
import './Ranking.scss';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterRanking from './FilterRanking';
import FilterLeauge from './FilterLeague';
import ListRanking from './ListRanking';
import { User } from '../../App';
import deepcopy from 'deepcopy';

export type LeaugeName = {
  leaugeName: string,
  leaugeId: number,
  leaugeUsers: User[],
}
export type RankingFilters = 'general' | 'lastDay' | 'groupStage' | 'knockoutStage';

export type RankingProps = {
  allUsers: User[],
}

const Ranking: React.FC<RankingProps> = ({ allUsers }) => {

  const [filter, setFilter] = useState<RankingFilters>('general');
  const [leagueFilter, setLeagueFilter] = useState<string>('main');
  const [usersToDisplay, setUsersToDisplay] = useState<User[]>(allUsers);

  const leagueUsers = allUsers.filter((user) => user.leagues?.indexOf(leagueFilter) !== -1); //TODO when Api correct delete question mark because there's always at least one leauge
  
  
  const sortedUsers = leagueUsers?.sort((user1, user2) => user2.totalPoints - user1.totalPoints ? user2.totalPoints - user1.totalPoints : user2.totalExactScoreBets - user1.totalExactScoreBets);
  useEffect(() =>{
    const userToSet = deepcopy(sortedUsers);
    // if(filter === 'groupStage'){
      // userToSet.filter((match) => match.stage)
    // }
    setUsersToDisplay(userToSet)}
    ,[leagueFilter, allUsers, filter])
  return (
    <div className='ranking-main-body'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <FilterRanking activeFilter={filter} setActiveFilter={setFilter} />
          <FilterLeauge currentFilter={leagueFilter} setCurrentFilter={setLeagueFilter} />
        </div>
      </div>

      <div style={{ display: 'flex', minWidth: '500px', maxWidth: '1000px', width: '100%' }}>
        <ListRanking allUsers={usersToDisplay} league={leagueFilter} />
      </div>
    </div>


  )
}

export default Ranking;