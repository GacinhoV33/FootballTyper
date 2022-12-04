import React, { useEffect } from 'react';
import { useState } from 'react';
import './Ranking.scss';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterRanking from './FilterRanking';
import FilterLeague from './FilterLeague';
import ListRanking from './ListRanking';
import { User } from '../../App';
import LoadingLayout from '../LoadingLayout/LoadingLayout';
  
export type LeaugeName = {
  leaugeName: string,
  leaugeId: number,
  leaugeUsers: User[],
}
export type RankingFilters = 'general' | 'lastDay' | 'groupStage' | 'knockoutStage';

export type RankingProps = {
}

const Ranking: React.FC<RankingProps> = ({}) => {

  const [filter, setFilter] = useState<RankingFilters>('knockoutStage');
  const [leagueFilter, setLeagueFilter] = useState<string>('main');
  const [usersToDisplay, setUsersToDisplay] = useState<User[]>([]);
  const [lastDayMain, setLastDayMain] = useState<User[]>([]);
  const [groupStageMain, setGroupStageMain] = useState<User[]>([]);
  const [knockoutMain, setKnockoutMain] = useState<User[]>([]);
  const [generalMain, setGeneralMain] = useState<User[]>([]);
  const [lastDayClown, setLastDayClown] = useState<User[]>([]);
  const [groupStageClown, setGroupStageClown] = useState<User[]>([]);
  const [knockoutClown, setKnockoutClown] = useState<User[]>([]);
  const [generalClown, setGeneralClown] = useState<User[]>([]);
  const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;


  useEffect(() => {
    const fetchData = async () => {

      const lastDayMainData: User[] = await (await fetch(API_URL+ `api/Score/LastDay/main`)).json();
      const groupStageMainData: User[] = await (await fetch(API_URL + `api/Score/Groupstage/main`)).json();
      const knockoutMainData: User[] = await (await fetch(API_URL + `api/Score/Knockout/main`)).json();
      const generalMainData: User[] = await (await fetch(API_URL + `api/Score/All/main`)).json();
      const lastDayClownData: User[] = await (await fetch(API_URL+ `api/Score/LastDay/clownLeague`)).json();
      const groupStageClownData: User[] = await (await fetch(API_URL + `api/Score/Groupstage/clownLeague`)).json();
      const knockoutClownData: User[] = await (await fetch(API_URL + `api/Score/Knockout/clownLeague`)).json();
      const generalClownData: User[] = await (await fetch(API_URL + `api/Score/All/clownLeague`)).json();
      lastDayMainData.sort((user1, user2) => user1.positionDict.main - user2.positionDict.main);
      groupStageMainData.sort((user1, user2) => user1.positionDict.main - user2.positionDict.main);
      knockoutMainData.sort((user1, user2) => user1.positionDict.main - user2.positionDict.main);
      generalMainData.sort((user1, user2) => user1.positionDict.main - user2.positionDict.main);
      lastDayClownData.sort((user1, user2) => user1.positionDict.clownLeague - user2.positionDict.clownLeague);
      groupStageClownData.sort((user1, user2) => user1.positionDict.clownLeague - user2.positionDict.clownLeague);
      knockoutClownData.sort((user1, user2) => user1.positionDict.clownLeague - user2.positionDict.clownLeague);
      generalClownData.sort((user1, user2) => user1.positionDict.clownLeague - user2.positionDict.clownLeague);
      setGeneralMain(generalMainData);
      setLastDayMain(lastDayMainData);
      setGroupStageMain(groupStageMainData);
      setKnockoutMain(knockoutMainData);
      setLastDayClown(lastDayClownData);
      setGroupStageClown(groupStageClownData);
      setKnockoutClown(knockoutClownData);
      setGeneralClown(generalClownData);
      setFilter('general');    
    }
    fetchData();
  }, [])


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


  
  return (
    <div className='ranking-main-body'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <FilterRanking activeFilter={filter} setActiveFilter={setFilter} />
          <FilterLeague currentFilter={leagueFilter} setCurrentFilter={setLeagueFilter} />
        </div>
      </div>
     {  usersToDisplay.length === 0 && filter !== 'lastDay' ? 
       <LoadingLayout componentName='Ranking'/> :
       <div className='list-ranking'>
        <ListRanking allUsers={usersToDisplay} league={leagueFilter} filter={filter}/>
      </div> 
      }
    </div>


  )
}

export default Ranking;