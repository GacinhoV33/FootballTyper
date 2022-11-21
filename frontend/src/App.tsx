import './App.scss';
// Components
import NavbarComp from './components/Navbar/NavbarComp';
import Homepage from './components/Homepage/Homepage';
import KnockoutStage from './components/KnockoutStage/KnockoutStage';
import GroupStage from './components/GroupStage/GroupStage';
import YourBets from './components/YourBets/YourBets';
import Ranking from './components/Ranking/Ranking';
import Statistics from './components/Statistics/Statistics';
import Rules from './components/Rules/Rules';
import Login from './components/Login/Login';
import AdminPanel from './components/AdminPanel/AdminPanel';
import LoadingLayout from './components/LoadingLayout/LoadingLayout';
import AuthVerify from './components/AuthVerify/AuthVerify';
import { Bet } from './components/YourBets/MyBets/MyBets';
// Helpers & structures
// From Libraries
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga';
import { isMobile } from 'react-device-detect';

const TRACKING_ID = "G-31K4T82HLF"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

export type UserLocalStorageData = {
  username: string,
  email: string,
  fullname: string,
  id: number,
  imgLink?: string,
  leagues?: string[],
}
// This component contains whole logic, all main components and it's the manager of whole application
export type UserStatus = {
  userLocalData: UserLocalStorageData,
  isUserSigned: boolean,
}

const userObjInit: UserLocalStorageData | null = {
  username: 'no-user',
  email: 'no-email',
  fullname: 'no-fullname',
  id: 0,
  imgLink: 'none',
  leagues: ['none'],
}

export const UserContext = createContext<UserStatus>({ userLocalData: userObjInit, isUserSigned: false});

function App() {
  const [dataGroupMatches, setdataGroupMatches] = useState<any | null>(null);
  const [allTeams, setAllTeams] = useState<Team[] | null>(null);
  const [allMatches, setAllMatches] = useState<Match[] | null>(null)
  const [dataTeams, setDataTeams] = useState<any | null>(null);
  const [allUserBets, setAllUserBets] = useState<Bet[] | null>(null);
  const [allUsers, setAllUsers] = useState<User[] | null>([]);
  const [userStatus, setUserStatus] = useState<UserStatus>({
    userLocalData: localStorage.getItem('user') !== '' ? JSON.parse(localStorage.getItem('user') as string) : userObjInit,
    isUserSigned: localStorage.getItem('user') !== '' && localStorage.getItem('user') !== null ? true : false
  })
  const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;

  useEffect(() => {
    const fetchData = async () => {

      const allMatches = await (await fetch(API_URL + 'api/Matches')).json();
      const data = await (await fetch(API_URL + 'api/Teams')).json();
      const requestAllUsersOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      };

      const allUsers = await (await fetch(API_URL + 'api/TyperUsers', requestAllUsersOptions)).json();
      const userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : '';
      if (userName) {
        const allUserBets = await (await fetch(API_URL + `api/Bets/User/${userName.username}`)).json();
        setAllUserBets(allUserBets);
      }
      setAllMatches(allMatches);
      setAllTeams(data)
      setdataGroupMatches(convertMatchesToGroupFormat(allMatches));
      setDataTeams(convertTeamsToGroupFormat(data));
      setAllUsers(allUsers);
    }
    fetchData();

  }, []);

  // Ga setup
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  const rankingReturn = () => {
    if (allUsers && userStatus.isUserSigned && Array.isArray(allUsers)) {
      return <Ranking allUsers={allUsers} />
    }
    else if (allUsers && !userStatus.isUserSigned) {
      return <Login setUserStatus={setUserStatus} />
    }
    else {
      return <LoadingLayout componentName='Ranking' />
    }
  }

  const groupStageReturn = () => {
    if (!userStatus.isUserSigned) {
      return (
        <Login setUserStatus={setUserStatus} />
      )
    }
    else if (dataTeams) {
      return (
        <GroupStage groupMatches={dataGroupMatches} dataTeams={dataTeams} />
      )
    }
    else {
      return (
        <LoadingLayout componentName='Group Stage' />
      )
    }
  }

  return (
    <UserContext.Provider value={userStatus}>
      <AuthVerify setUserStatus={setUserStatus} />
      <div className='app-body'>
        <NavbarComp />
        {/* placeholder for Navbar */}
        <div style={{ height: '8vh' }}></div>
        <Routes>
          <Route path='/' element={allMatches && allTeams ? <Homepage allTeams={allTeams} allMatches={allMatches} allUserBets={allUserBets}/> : <LoadingLayout componentName='Homepage' />} />
          {!isMobile ?
            <Route path='/knockout' element={userStatus.isUserSigned ? <KnockoutStage allMatches={allMatches} /> : <Login setUserStatus={setUserStatus} />} />
            : null}
          <Route path='/groupstage' element={groupStageReturn()} />
          <Route path='/yourbets' element={allUserBets !== null ? <YourBets allUserBets={allUserBets} allUsers={allUsers} /> : <LoadingLayout componentName='My bets' />} />
          <Route
            path='/ranking'
            element={
              rankingReturn()
            }
          />
          {process.env.REACT_APP_IS_IT_PRODUCTION_VERSION !== 'true' && <Route path='/statistics' element={<Statistics />} />}
          <Route path='/rules' element={<Rules />} />
          {process.env.REACT_APP_IS_IT_PRODUCTION_VERSION !== 'true' && <Route path='/adminpanel' element={<AdminPanel />} />}

          <Route path='/Login' element={<Login setUserStatus={setUserStatus} />} />
        </Routes >
      </div >
    </UserContext.Provider>
  );
}


function convertMatchesToGroupFormat(data: any) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let tab: any = [];
  for (let i = 0; i < 8; i++) {
    const result = data.filter((match: any) => match.group ? match.group[6] === letters[i] : false)
    tab.push(result)
  }
  return tab
}

function convertTeamsToGroupFormat(data: any) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let tab: any = [];
  for (let i = 0; i < 8; i++) {
    const result = data.filter((team: any) => team.group === letters[i])
    tab.push(result)
  }
  return tab
}

export interface Team {
  id: string,
  name: string,
  coach: null | string,
  points: number,
  playedMatchesNbr: number,
  win: number,
  drawn: number,
  lost: number,
  group: string,
}

export interface Match {
  id: number,
  homeTeam: Team,
  awayTeam: Team,
  homeTeamScore: number,
  awayTeamScore: number,
  group: string,
  location: string,
  date: string,
  referee: string,
  town: string,
  matchNumber: number,
  roundNumber: number,
  isMatchValid: boolean,
  stage: number,
}


export interface User {
  username: string,
  imgLink: string,
  totalPoints: number,
  totalExactScoreBets: number,
  totalCorrectWinnerBets: number,
  totalWrongBets: number,
  leagues: string[],
  id: number,
  lastFiveBets: string,
  rankStatusDict?: object,
  positionDict?: any,
  fullName: string,
}

export default App;