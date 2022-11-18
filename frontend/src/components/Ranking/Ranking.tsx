import React, { useEffect } from 'react';
import { useState } from 'react';
import './Ranking.scss';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterRanking from './FilterRanking';
import FilterLeague from './FilterLeague';
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

  const [filter, setFilter] = useState<RankingFilters>('lastDay');
  const [leagueFilter, setLeagueFilter] = useState<string>('main');
  const [usersToDisplay, setUsersToDisplay] = useState<User[]>(allUsers);
  const [lastDayMain, setLastDayMain] = useState<User[]>([]);
  const [groupStageMain, setGroupStageMain] = useState<User[]>([]);
  const [knockoutMain, setKnockoutMain] = useState<User[]>([]);
  const [generalMain, setGeneralMain] = useState<User[]>([]);
  const [lastDayClown, setLastDayClown] = useState<User[]>([]);
  const [groupStageClown, setGroupStageClown] = useState<User[]>([]);
  const [knockoutClown, setKnockoutClown] = useState<User[]>([]);
  const [generalClown, setGeneralClown] = useState<User[]>([]);
  
  useEffect(() => {
    if(leagueFilter === 'main'){
      switch(filter){
        case 'general': 
          setUsersToDisplay(generalMain);
          break;
        case 'lastDay':
          setUsersToDisplay(lastDayMain);
          break
        case 'groupStage':
          setUsersToDisplay(groupStageMain);
          break;
        case 'knockoutStage':
          setUsersToDisplay(knockoutMain);
          break;
      }
    }else{
      switch(filter){
        case 'general': 
          setUsersToDisplay(generalClown);
          break;
        case 'lastDay':
          setUsersToDisplay(lastDayClown);
          break
        case 'groupStage':
          setUsersToDisplay(groupStageClown);
          break;
        case 'knockoutStage':
          setUsersToDisplay(knockoutClown);
          break;
      }
    }
    
  }
    , [filter, leagueFilter])

  useEffect(() => {
    const fetchData = async () => {
      const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;

      const lastDayMain: User[] = await (await fetch(API_URL+ `api/Score/LastDay/main`)).json();
      const groupStageMain: User[] = await (await fetch(API_URL + `api/Score/Groupstage/main`)).json();
      const knockoutMain: User[] = await (await fetch(API_URL + `api/Score/Knockout/main`)).json();
      const generalMain: User[] = await (await fetch(API_URL + `api/Score/All/main`)).json();
      const lastDayClown: User[] = await (await fetch(API_URL+ `api/Score/LastDay/clownLeague`)).json();
      const groupStageClown: User[] = await (await fetch(API_URL + `api/Score/Groupstage/clownLeague`)).json();
      const knockoutClown: User[] = await (await fetch(API_URL + `api/Score/Knockout/clownLeague`)).json();
      const generalClown: User[] = await (await fetch(API_URL + `api/Score/All/clownLeague`)).json();
      lastDayMain.sort((user1, user2) => user1.positionDict.main - user2.positionDict.main);
      groupStageMain.sort((user1, user2) => user1.positionDict.main - user2.positionDict.main);
      knockoutMain.sort((user1, user2) => user1.positionDict.main - user2.positionDict.main);
      generalMain.sort((user1, user2) => user1.positionDict.main - user2.positionDict.main);
      lastDayClown.sort((user1, user2) => user1.positionDict.clownLeague - user2.positionDict.clownLeague);
      groupStageClown.sort((user1, user2) => user1.positionDict.clownLeague - user2.positionDict.clownLeague);
      knockoutClown.sort((user1, user2) => user1.positionDict.clownLeague - user2.positionDict.clownLeague);
      generalClown.sort((user1, user2) => user1.positionDict.clownLeague - user2.positionDict.clownLeague);
      
      setLastDayMain(lastDayMain);
      setGroupStageMain(groupStageMain);
      setKnockoutMain(knockoutMain);
      setGeneralMain(generalMain);
      setLastDayClown(lastDayClown);
      setGroupStageClown(groupStageClown);
      setKnockoutClown(knockoutClown);
      setGeneralClown(generalClown);
      setFilter('general');
    }
    fetchData();
  }, [])
  return (
    <div className='ranking-main-body'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <FilterRanking activeFilter={filter} setActiveFilter={setFilter} />
          <FilterLeague currentFilter={leagueFilter} setCurrentFilter={setLeagueFilter} />
        </div>
      </div>

      <div className='list-ranking'>
        <ListRanking allUsers={usersToDisplay} league={leagueFilter} filter={filter}/>
      </div>
    </div>


  )
}

export default Ranking;