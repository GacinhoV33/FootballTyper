import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import './Ranking.scss';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterRanking from './FilterRanking';
import FilterLeauge from './FilterLeauge';
import ListRanking from './ListRanking';
import { User } from '../../App';

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
  const [leaugeFilter, setLeaugeFilter] = useState<string>('main');
  const [usersToDisplay, setUsersToDisplay] = useState<User[]>(allUsers);

  const leaugeUsers = allUsers.filter((user) => user.leauges?.indexOf(leaugeFilter) !== -1); //TODO when Api correct delete question mark because there's always at least one leauge
  const sortedUsers = leaugeUsers?.sort((user1, user2) => user2.totalPoints - user1.totalPoints ? user2.totalPoints - user1.totalPoints : user2.totalExactScoreBets - user1.totalExactScoreBets);
  useEffect(() =>
    setUsersToDisplay(sortedUsers),
    [leaugeFilter])
  return (
    <div className='ranking-main-body'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <FilterRanking activeFilter={filter} setActiveFilter={setFilter} />
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